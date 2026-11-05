import {
  ref, get, set, update, push, onValue, onChildAdded, onDisconnect,
  runTransaction, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';
import { connectFirebase } from './firebase.js';

const randomName = () => `RANGER-${Math.floor(1000 + Math.random() * 9000)}`;
const makeRoomCode = () => Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, 'X');
const playerDefaults = (user, slot, name) => ({
  id: user.uid, name, slot, x: slot === 1 ? -14 : 14, y: 0.35, z: 0,
  rotation: slot === 1 ? 0 : Math.PI, health: 100, alive: true, ready: true, score: 0,
  lastSeen: Date.now()
});

export class ArenaNetwork {
  constructor(callbacks = {}) {
    this.callbacks = callbacks;
    this.database = null;
    this.user = null;
    this.roomId = null;
    this.roomCode = null;
    this.slot = 0;
    this.name = localStorage.getItem('arenaPlayerName') || randomName();
    localStorage.setItem('arenaPlayerName', this.name);
    this.playerRef = null;
    this.roomRef = null;
    this.unsubscribers = [];
    this.stateTimer = null;
    this.eventsRef = null;
    this.matchGeneration = 0;
    this.countdownTimer = null;
    this.countdownAt = null;
    this.finishingCountdown = false;
  }

  async connect() {
    const connection = await connectFirebase();
    this.database = connection.database;
    this.user = connection.user;
    this.playerRef = ref(this.database, `players/${this.user.uid}`);
    await set(this.playerRef, { id: this.user.uid, name: this.name, online: true, lastSeen: serverTimestamp() });
    onDisconnect(this.playerRef).remove();
    this.callbacks.onIdentity?.({ id: this.user.uid, name: this.name });
    return this.user;
  }

  async findOrCreateRoom() {
    if (!this.user) await this.connect();
    const roomsRef = ref(this.database, 'rooms');
    const roomsSnapshot = await get(roomsRef);
    let joined = false;
    if (roomsSnapshot.exists()) {
      const rooms = roomsSnapshot.val() || {};
      for (const [id, room] of Object.entries(rooms)) {
        if (room?.status !== 'waiting' || room.matchmaking === false || Object.keys(room.players || {}).length !== 1) continue;
        const roomReference = ref(this.database, `rooms/${id}`);
        const result = await runTransaction(roomReference, current => {
          if (!current || current.status !== 'waiting' || current.matchmaking === false || Object.keys(current.players || {}).length !== 1 || current.players[this.user.uid]) return;
          current.players[this.user.uid] = playerDefaults(this.user, 2, this.name);
          return current;
        });
        if (result.committed && result.snapshot.val()?.players?.[this.user.uid]) {
          this.roomId = id;
          this.roomCode = result.snapshot.val()?.code || '';
          this.slot = 2;
          joined = true;
          break;
        }
      }
    }

    if (!joined) {
      const roomReference = push(roomsRef);
      this.roomId = roomReference.key;
      this.roomCode = makeRoomCode();
      this.slot = 1;
      const room = {
        status: 'waiting', map: 'crosswind-yard', createdAt: serverTimestamp(),
        code: this.roomCode, matchmaking: true,
        players: { [this.user.uid]: playerDefaults(this.user, 1, this.name) }
      };
      await set(roomReference, room);
    }

    await this.attachRoom(this.roomId, this.slot, this.roomCode);
    return { roomId: this.roomId, slot: this.slot, code: this.roomCode };
  }

  async attachRoom(roomId, slot, code) {
    this.roomId = roomId;
    this.roomCode = code || '';
    this.slot = slot;
    this.roomRef = ref(this.database, `rooms/${roomId}`);
    await onDisconnect(ref(this.database, `rooms/${roomId}/players/${this.user.uid}`)).remove();
    this.listenRoom();
    this.callbacks.onRoom?.({ roomId, slot, code: this.roomCode });
  }

  async createRoom() {
    if (!this.user) await this.connect();
    await this.leave();
    const roomReference = push(ref(this.database, 'rooms'));
    const code = makeRoomCode();
    const room = {
      status: 'waiting', map: 'crosswind-yard', createdAt: serverTimestamp(),
      code, matchmaking: false,
      players: { [this.user.uid]: playerDefaults(this.user, 1, this.name) }
    };
    await set(roomReference, room);
    await this.attachRoom(roomReference.key, 1, code);
    return { roomId: roomReference.key, slot: 1, code };
  }

  async joinRoom(code) {
    if (!this.user) await this.connect();
    const normalized = String(code || '').trim().toUpperCase();
    if (normalized.length !== 6) throw new Error('Enter the 6-character room code.');
    await this.leave();
    const roomsSnapshot = await get(ref(this.database, 'rooms'));
    const rooms = roomsSnapshot.val() || {};
    const entry = Object.entries(rooms).find(([, room]) => String(room?.code || '').toUpperCase() === normalized);
    if (!entry) throw new Error('Room code not found. Check the code and try again.');
    const [roomId] = entry;
    const roomReference = ref(this.database, `rooms/${roomId}`);
    const result = await runTransaction(roomReference, current => {
      if (!current || current.status !== 'waiting' || Object.keys(current.players || {}).length !== 1 || current.players[this.user.uid]) return;
      current.players[this.user.uid] = playerDefaults(this.user, 2, this.name);
      return current;
    });
    if (!result.committed) throw new Error('That room is full or the match has already started.');
    await this.attachRoom(roomId, 2, normalized);
    return { roomId, slot: 2, code: normalized };
  }

  listenRoom() {
    if (!this.roomRef) return;
    const stop = onValue(this.roomRef, snapshot => {
      const room = snapshot.val();
      if (!room) { this.callbacks.onNotice?.('Room closed.'); return; }
      const players = Object.values(room.players || {});
      const own = room.players?.[this.user.uid];
      const opponent = players.find(player => player.id !== this.user.uid);
      if (own) this.slot = own.slot || this.slot;
      this.callbacks.onRoomState?.({ room, own, opponent, players });
      if (room.status === 'waiting') this.callbacks.onStatus?.(players.length < 2 ? 'WAITING FOR OPPONENT' : 'READY — MATCH STARTING');
      if (room.status === 'countdown') this.callbacks.onStatus?.('MATCH STARTING');
      if (room.status === 'playing') this.callbacks.onStatus?.('FIGHT');
      if (room.status === 'finished') this.callbacks.onFinished?.(room.winner, room);
      this.tryStart(room).catch(error => this.callbacks.onError?.(error));
    }, error => this.callbacks.onError?.(error));
    this.unsubscribers.push(stop);

    this.eventsRef = ref(this.database, `rooms/${this.roomId}/events`);
    const stopEvents = onChildAdded(this.eventsRef, snapshot => {
      const event = snapshot.val();
      if (event && event.createdAt > Date.now() - 15000) this.callbacks.onEvent?.(event);
    });
    this.unsubscribers.push(stopEvents);
  }

  async tryStart(room) {
    if (room.status === 'countdown') {
      const startedAt = Number(room.countdownAt) || Date.now();
      if (this.countdownAt !== startedAt) {
        clearInterval(this.countdownTimer);
        this.countdownAt = startedAt;
        this.finishingCountdown = false;
        this.countdownTimer = setInterval(async () => {
          const remaining = Math.max(0, Math.ceil((startedAt + 10000 - Date.now()) / 1000));
          this.callbacks.onCountdown?.(remaining);
          if (remaining === 0 && !this.finishingCountdown) {
            this.finishingCountdown = true;
            clearInterval(this.countdownTimer);
            await runTransaction(this.roomRef, current => {
              if (!current || current.status !== 'countdown' || Number(current.countdownAt) !== startedAt) return;
              current.status = 'playing';
              current.startedAt = Date.now();
              return current;
            });
          }
        }, 200);
      }
      this.callbacks.onCountdown?.(Math.max(0, Math.ceil((startedAt + 10000 - Date.now()) / 1000)));
      return;
    }
    if (room.status !== 'waiting' || Object.keys(room.players || {}).length !== 2 || !room.players[this.user.uid]?.ready) return;
    await runTransaction(this.roomRef, current => {
      if (!current || current.status !== 'waiting' || Object.keys(current.players || {}).length !== 2) return;
      if (!Object.values(current.players).every(player => player.ready)) return;
      current.status = 'countdown';
      current.countdownAt = Date.now();
      current.countdownDuration = 10;
      return current;
    });
  }

  startStateSync(readState) {
    clearInterval(this.stateTimer);
    this.stateTimer = setInterval(() => {
      if (!this.roomId || !this.user) return;
      const state = readState();
      update(ref(this.database, `rooms/${this.roomId}/players/${this.user.uid}`), {
        x: state.x, y: state.y, z: state.z, rotation: state.rotation,
        lastSeen: Date.now()
      }).catch(error => this.callbacks.onError?.(error));
    }, 100);
  }

  async publishShot(origin, direction) {
    if (!this.roomId || !this.user || !this.database) return;
    const events = ref(this.database, `rooms/${this.roomId}/events`);
    await set(push(events), {
      type: 'shot', shooter: this.user.uid,
      origin: { x: origin.x, y: origin.y, z: origin.z },
      direction: { x: direction.x, y: direction.y, z: direction.z },
      createdAt: Date.now()
    });
  }

  async reportHit(targetId, damage, headshot) {
    if (!this.roomRef || !this.user || !targetId) return;
    const result = await runTransaction(this.roomRef, room => {
      if (!room || room.status !== 'playing') return;
      const shooter = room.players?.[this.user.uid];
      const target = room.players?.[targetId];
      if (!shooter || !target || !target.alive) return;
      target.health = Math.max(0, Number(target.health || 0) - damage);
      const killed = target.health <= 0;
      if (killed) {
        target.alive = false;
        shooter.score = Number(shooter.score || 0) + 1;
        room.lastKill = { killer: this.user.uid, victim: targetId, at: Date.now() };
        if (shooter.score >= 5) {
          room.status = 'finished';
          room.winner = this.user.uid;
          room.finishedAt = Date.now();
        }
      }
      return room;
    });
    if (result.committed) {
      const events = ref(this.database, `rooms/${this.roomId}/events`);
      await set(push(events), {
        type: 'shot-hit', shooter: this.user.uid, target: targetId,
        damage, headshot: Boolean(headshot), createdAt: Date.now()
      });
    }
  }

  async respawn() {
    if (!this.roomId || !this.user) return;
    const x = this.slot === 1 ? -14 : 14;
    await update(ref(this.database, `rooms/${this.roomId}/players/${this.user.uid}`), {
      x, y: 0.35, z: 0, rotation: this.slot === 1 ? 0 : Math.PI, health: 100, alive: true
    });
  }

  async restartMatch() {
    if (!this.roomRef || !this.user) return;
    await runTransaction(this.roomRef, room => {
      if (!room) return;
      room.status = 'waiting';
      room.winner = null;
      room.players ||= {};
      for (const player of Object.values(room.players)) {
        player.score = 0; player.health = 100; player.alive = true; player.ready = true;
        player.x = player.slot === 1 ? -14 : 14;
        player.y = 0.35; player.z = 0; player.rotation = player.slot === 1 ? 0 : Math.PI;
      }
      return room;
    });
  }

  async leave() {
    clearInterval(this.stateTimer);
    clearInterval(this.countdownTimer);
    this.countdownTimer = null;
    this.countdownAt = null;
    this.finishingCountdown = false;
    this.matchGeneration++;
    for (const stop of this.unsubscribers) stop();
    this.unsubscribers = [];
    if (this.roomId && this.user && this.database) {
      await set(ref(this.database, `rooms/${this.roomId}/players/${this.user.uid}`), null).catch(() => {});
    }
    this.roomId = null;
    this.roomCode = null;
    this.roomRef = null;
    this.slot = 0;
  }
}
