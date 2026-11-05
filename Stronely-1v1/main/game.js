import * as THREE from 'three';
import { Player } from './player.js';
import { buildArena } from './map.js';
import { AssaultRifle } from './weapon.js';
import { ArenaNetwork } from './network.js';
import { ui, bindMenu } from './ui.js';

const root = document.getElementById('game-root');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0e14);
scene.fog = new THREE.Fog(0x0a0e14, 35, 78);
const camera = new THREE.PerspectiveCamera(78, innerWidth / innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.domElement.tabIndex = 0;
root.appendChild(renderer.domElement);

const arena = buildArena(scene);
const keys = Object.create(null);
const localPlayer = new Player(camera, renderer.domElement, { spawn: arena.spawns[0] });
localPlayer.setColliders(arena.colliders);
let network = null;
let weapon = null;
let remoteModel = null;
let remoteGoal = new THREE.Vector3();
let remoteYawGoal = 0;
let localMode = 'menu';
let roundEnded = false;
let lastRemote = null;
const clock = new THREE.Clock();
const tracerMaterial = new THREE.LineBasicMaterial({ color: 0xd9f5ff, transparent: true, opacity: 0.86 });
const impactEffects = [];

function createRemote(id, name, color) {
  if (remoteModel) scene.remove(remoteModel);
  const group = new THREE.Group();
  group.userData.playerId = id;
  group.userData.name = name;
  const bodyMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.63, emissive: 0x000000 });
  group.userData.hitMaterial = bodyMaterial;
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.62, 4, 8), bodyMaterial);
  torso.position.y = 0.95;
  torso.userData.hitZone = 'body';
  torso.castShadow = true;
  group.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), new THREE.MeshStandardMaterial({ color: 0xe7c6a8, roughness: 0.76 }));
  head.position.y = 1.68;
  head.userData.hitZone = 'head';
  head.castShadow = true;
  group.add(head);
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 0.1), new THREE.MeshStandardMaterial({ color: 0x101820, metalness: 0.35, roughness: 0.35 }));
  visor.position.set(0, 1.7, -0.205);
  group.add(visor);
  const marker = new THREE.Sprite(new THREE.SpriteMaterial({ color, depthTest: false }));
  marker.scale.set(0.18, 0.18, 1);
  marker.position.set(0, 2.08, 0);
  group.add(marker);
  scene.add(group);
  remoteModel = group;
  remoteModel.visible = true;
  remoteModel.userData.playerId = id;
  return group;
}

function setRemote(player) {
  if (!player) {
    if (remoteModel) remoteModel.visible = false;
    lastRemote = null;
    return;
  }
  if (!remoteModel || remoteModel.userData.playerId !== player.id) {
    const color = player.slot === 1 ? 0x1689e9 : 0xe7424b;
    createRemote(player.id, player.name || 'RIVAL', color);
  }
  remoteModel.visible = player.alive !== false;
  remoteGoal.set(Number(player.x) || 0, Number(player.y) || 0, Number(player.z) || 0);
  remoteYawGoal = Number(player.rotation) || 0;
  lastRemote = player;
}
let practiceTargetHealth = 100;
function showTracer(origin, direction, distance = 30) {
  const end = origin.clone().addScaledVector(direction, distance);
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([origin, end]), tracerMaterial);
  scene.add(line);
  setTimeout(() => { scene.remove(line); line.geometry.dispose(); }, 65);
}

function showImpact(point, normal, headshot = false) {
  const ringMaterial = new THREE.MeshBasicMaterial({ color: headshot ? 0xffedb0 : 0xffb35c, transparent: true, opacity: 1, side: THREE.DoubleSide, depthWrite: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.035, 0.11, 18), ringMaterial);
  ring.position.copy(point).addScaledVector(normal, 0.012);
  ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  scene.add(ring);
  const sparks = [];
  const sparkGeometry = new THREE.SphereGeometry(0.035, 5, 5);
  for (let i = 0; i < 8; i++) {
    const material = new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xffffff : (headshot ? 0xffe49a : 0xff9d45) });
    const spark = new THREE.Mesh(sparkGeometry, material);
    spark.position.copy(point);
    scene.add(spark);
    const velocity = normal.clone().multiplyScalar(1.1 + Math.random() * 2.5).add(new THREE.Vector3((Math.random() - .5) * 3, (Math.random() - .5) * 3, (Math.random() - .5) * 3));
    sparks.push({ mesh: spark, velocity });
  }
  impactEffects.push({ ring, ringMaterial, sparks, sparkGeometry, age: 0 });
}

function updateImpactEffects(delta) {
  for (let i = impactEffects.length - 1; i >= 0; i--) {
    const effect = impactEffects[i];
    effect.age += delta;
    const progress = Math.min(1, effect.age / 0.3);
    effect.ring.scale.setScalar(0.45 + progress * 2.6);
    effect.ringMaterial.opacity = 1 - progress;
    for (const spark of effect.sparks) {
      spark.velocity.y -= 5 * delta;
      spark.mesh.position.addScaledVector(spark.velocity, delta);
      spark.mesh.scale.setScalar(Math.max(0.05, 1 - progress));
    }
    if (progress >= 1) {
      scene.remove(effect.ring);
      effect.ring.geometry.dispose();
      effect.ringMaterial.dispose();
      for (const spark of effect.sparks) {
        scene.remove(spark.mesh);
        spark.mesh.material.dispose();
      }
      effect.sparkGeometry.dispose();
      impactEffects.splice(i, 1);
    }
  }
}

function shoot(hit, ray) {
  ui.muzzleFlash();
  if (localMode === 'online') network?.publishShot(ray.origin, ray.direction).catch(() => {});
  if (hit) {
    ui.hit(hit.headshot);
    if (hit.point) showImpact(hit.point, hit.normal || new THREE.Vector3(0, 1, 0), hit.headshot);
    if (remoteModel?.userData.playerId === hit.playerId && remoteModel.userData.hitMaterial) {
      const material = remoteModel.userData.hitMaterial;
      material.emissive.setHex(hit.headshot ? 0xffe09a : 0xff6b36);
      material.emissiveIntensity = hit.headshot ? 1.8 : 1.15;
      setTimeout(() => { material.emissive.setHex(0x000000); material.emissiveIntensity = 0; }, 130);
    }
    if (localMode === 'practice' && hit.playerId === 'practice-bot') {
      practiceTargetHealth -= hit.damage;
      if (practiceTargetHealth <= 0) {
        ui.toast('TARGET ELIMINATED');
        practiceTargetHealth = 100;
        if (remoteModel) remoteModel.visible = false;
        setTimeout(() => { if (localMode === 'practice' && remoteModel) remoteModel.visible = true; }, 1100);
      }
    } else if (localMode === 'online') {
      network?.reportHit(hit.playerId, hit.damage, hit.headshot).catch(error => ui.toastError(error.message));
    }
  }
  showTracer(ray.origin, ray.direction, hit?.point ? ray.origin.distanceTo(hit.point) : 34);
  // Short oscillator pop is a no-asset shooting sound placeholder.
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      const audio = new AudioContextClass();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'square'; oscillator.frequency.setValueAtTime(115, audio.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(42, audio.currentTime + 0.055);
      gain.gain.setValueAtTime(0.035, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.06);
      oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + 0.06);
      oscillator.onended = () => audio.close();
    }
  } catch { /* Audio can be unavailable in some browser contexts. */ }
}
weapon = new AssaultRifle({ camera, onShot: shoot, onAmmo: ui.setAmmo, onReload: ui.showReloading, onDryFire: () => ui.toast('MAGAZINE EMPTY — PRESS R TO RELOAD') });

function currentPlayerState() {
  return { x: localPlayer.position.x, y: localPlayer.position.y, z: localPlayer.position.z, rotation: localPlayer.yaw, health: localPlayer.health, alive: localPlayer.alive };
}

function onRoomState({ room, own, opponent, players }) {
  if (own) {
    if (room.status === 'waiting' && roundEnded && own.alive !== false) {
      roundEnded = false;
      respawnPending = false;
      ui.hideResult();
      localPlayer.respawn(arena.spawns[(network?.slot || 1) - 1]);
      weapon.reset();
    }
    localPlayer.setHealth(own.health, own.alive);
    ui.setHealth(localPlayer.health);
    const blue = players.find(player => player.slot === 1);
    const red = players.find(player => player.slot === 2);
    ui.setScores(blue?.score, red?.score, blue?.name || 'BLUE', red?.name || 'RED');
    if (own.alive === false && localMode === 'online' && room.status === 'playing' && !roundEnded) scheduleRespawn();
  }
  if (opponent) setRemote(opponent);
  else setRemote(null);
}
let respawnPending = false;
function scheduleRespawn() {
  if (respawnPending) return;
  respawnPending = true;
  const spawn = arena.spawns[(network?.slot || 1) - 1];
  setTimeout(async () => {
    if (localMode !== 'online' || roundEnded) { respawnPending = false; return; }
    localPlayer.respawn(spawn);
    ui.setHealth(100);
    respawnPending = false;
    try { await network?.respawn(); } catch (error) { ui.toastError(error.message); }
  }, 1800);
}

network = new ArenaNetwork({
  onIdentity: ({ name }) => ui.setPlayerName(name),
  onRoom: ({ slot, code }) => {
    localPlayer.setSpawn(...arena.spawns[slot - 1]);
    localPlayer.yaw = slot === 1 ? -Math.PI / 2 : Math.PI / 2;
    localPlayer.syncCamera();
    ui.setRoomCode(code);
    ui.setLobbyStatus(`Room ready. Share code ${code} with your friend.`);
    network.startStateSync(currentPlayerState);
  },
  onRoomState,
  onStatus: status => {
    ui.setMatchStatus(status);
    if (status === 'WAITING FOR OPPONENT') ui.setLobbyStatus('Looking for an opponent — share your room code or invite a friend.');
    if (status === 'READY — MATCH STARTING') ui.setLobbyStatus('Opponent found. Match starting in 10 seconds...');
    if (status === 'FIGHT') { ui.hideMatchmaking(); ui.showHUD(); }
  },
  onNotice: message => ui.toast(message),
  onEvent: event => {
    if (event.type === 'shot-hit' && event.target === network.user?.uid) {
      ui.toast(event.headshot ? 'HEADSHOT' : 'HIT');
      ui.damageFlash();
    }
    if (event.type === 'shot' && event.shooter !== network.user?.uid) {
      showTracer(new THREE.Vector3(event.origin.x, event.origin.y, event.origin.z), new THREE.Vector3(event.direction.x, event.direction.y, event.direction.z), 30);
    }
  },
  onFinished: winner => {
    if (roundEnded) return;
    roundEnded = true;
    const won = winner === network.user?.uid;
    ui.setMatchStatus(won ? 'VICTORY' : 'DEFEAT');
    ui.showResult(won, won ? 'First to five. The arena is yours.' : 'Your opponent reached five eliminations.');
    document.exitPointerLock?.();
  },
  onError: error => ui.toastError(error.message || 'Network connection issue.'),
  onCountdown: count => {
    ui.setMatchStatus(count > 0 ? `MATCH STARTING — ${count}` : 'FIGHT');
    ui.setLobbyStatus(count > 0 ? `MATCH STARTING IN ${count}...` : 'FIGHT!');
    ui.setLobbyCountdown(count);
  }
});

async function enterOnline() {
  ui.setBusy(true);
  ui.hideMenu();
  ui.showMatchmaking();
  ui.showHUD();
  localMode = 'online';
  roundEnded = false;
  respawnPending = false;
  try {
    await network.findOrCreateRoom();
    ui.setPlayerName(network.name);
    ui.setOnline(true, 'CONNECTED');
    ui.setBusy(false);
    ui.setLobbyStatus('Looking for an opponent — your room code is ready to share.');
    weapon.reset();
  } catch (error) {
    ui.setBusy(false);
    ui.showMatchmaking();
    ui.setLobbyStatus(error.message || 'Could not connect to matchmaking.');
    ui.setOnline(false, 'CONNECTION FAILED');
    const note = document.getElementById('firebase-note');
    note.textContent = error.message || 'Could not connect to matchmaking.';
    note.hidden = false;
    localMode = 'menu';
  }
}

async function createInviteRoom() {
  ui.setLobbyStatus('Creating a private room...');
  try {
    await network.createRoom();
    ui.setOnline(true, 'ROOM READY');
  } catch (error) { ui.setLobbyStatus(error.message || 'Could not create room.'); }
}

async function joinInviteRoom(code) {
  ui.setLobbyStatus('Joining room...');
  try {
    await network.joinRoom(code);
    ui.setOnline(true, 'ROOM JOINED');
    document.getElementById('join-room-code').value = '';
  } catch (error) { ui.setLobbyStatus(error.message || 'Could not join room.'); }
}

async function copyRoomCode() {
  const code = network.roomCode;
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    ui.setLobbyStatus(`Room code ${code} copied. Send it to your friend.`);
  } catch {
    ui.setLobbyStatus(`Your room code is ${code}. Select and copy it to share.`);
  }
}

function startPractice() {
  network.leave().catch(() => {});
  ui.hideMatchmaking();
  localMode = 'practice';
  roundEnded = false;
  localPlayer.setSpawn(...arena.spawns[0]);
  localPlayer.yaw = -Math.PI / 2;
  localPlayer.health = 100;
  localPlayer.alive = true;
  localPlayer.syncCamera();
  createRemote('practice-bot', 'TRAINING BOT', 0xe7424b);
  remoteModel.position.set(-6, 0, 0);
  remoteGoal.set(-6, 0, 0);
  practiceTargetHealth = 100;
  weapon.reset();
  ui.setOnline(false, 'PRACTICE');
  ui.hideMenu();
  ui.showHUD();
  ui.setMatchStatus('PRACTICE — NO OPPONENT');
  ui.setScores(0, 0, 'BLUE', 'RED');
}

async function rematch() {
  ui.hideResult();
  roundEnded = false;
  respawnPending = false;
  if (localMode === 'online') {
    try {
      await network.restartMatch();
      localPlayer.respawn(arena.spawns[(network.slot || 1) - 1]);
      weapon.reset();
    } catch (error) { ui.toastError(error.message); }
  } else startPractice();
}
async function returnToMenu() {
  document.exitPointerLock?.();
  await network.leave().catch(() => {});
  localMode = 'menu';
  roundEnded = false;
  ui.hideResult();
  ui.showMenu();
  ui.setBusy(false);
  ui.setOnline(false, 'OFFLINE');
  setRemote(null);
}

bindMenu({
  onPlay: enterOnline,
  onPractice: startPractice,
  onRematch: rematch,
  onMenu: returnToMenu,
  onSensitivity: value => { localPlayer.sensitivity = value; },
  onCreateRoom: createInviteRoom,
  onJoinRoom: joinInviteRoom,
  onCopyRoomCode: copyRoomCode
});
ui.setPlayerName(network.name);
ui.setOnline(false, 'OFFLINE');

renderer.domElement.addEventListener('click', () => {
  if (localMode !== 'menu' && !roundEnded && document.pointerLockElement !== renderer.domElement) renderer.domElement.requestPointerLock();
});
document.addEventListener('pointerlockchange', () => ui.setPointerHint(localMode !== 'menu' && document.pointerLockElement !== renderer.domElement));
document.addEventListener('mousemove', event => localPlayer.handleMouseMove(event));
document.addEventListener('keydown', event => {
  keys[event.code] = true;
  if (event.code === 'Space' && localMode !== 'menu') event.preventDefault();
  if (event.code === 'KeyR' && localMode !== 'menu') weapon.reload();
});
document.addEventListener('keyup', event => { keys[event.code] = false; });
document.addEventListener('mousedown', event => {
  if (event.button !== 0 || document.pointerLockElement !== renderer.domElement || roundEnded || localMode === 'menu') return;
  const targets = remoteModel?.visible ? [remoteModel] : [];
  weapon.fire(targets, arena.shootables);
});
window.addEventListener('blur', () => { for (const key of Object.keys(keys)) keys[key] = false; });
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  updateImpactEffects(delta);
  if (localMode !== 'menu') localPlayer.update(delta, keys);
  if (remoteModel?.visible) {
    remoteModel.position.lerp(remoteGoal, 1 - Math.exp(-12 * Math.min(delta, 0.1)));
    const angle = THREE.MathUtils.euclideanModulo(remoteYawGoal - remoteModel.rotation.y + Math.PI, Math.PI * 2) - Math.PI;
    remoteModel.rotation.y += angle * (1 - Math.exp(-12 * Math.min(delta, 0.1)));
  }
  renderer.render(scene, camera);
}
animate();
