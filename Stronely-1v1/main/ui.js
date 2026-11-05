const $ = id => document.getElementById(id);
let toastTimer;
let hitTimer;
let damageTimer;

export const ui = {
  showHUD() { $('hud').style.display = 'block'; },
  showMenu() { $('menu').classList.remove('leaving'); $('hud').style.display = 'none'; $('overlay').classList.add('hidden'); $('matchmaking-screen').classList.add('hidden'); },
  hideMenu() { $('menu').classList.add('leaving'); },
  showMatchmaking() { $('matchmaking-screen').classList.remove('hidden'); $('lobby-status').textContent = 'Connecting securely to the arena...'; $('room-code').textContent = '------'; $('lobby-countdown').classList.remove('active'); },
  hideMatchmaking() { $('matchmaking-screen').classList.add('hidden'); },
  setLobbyStatus(text) { $('lobby-status').textContent = text; },
  setLobbyCountdown(count) {
    const display = $('lobby-countdown');
    display.textContent = count > 0 ? count : 'FIGHT';
    display.classList.add('active');
  },
  setRoomCode(code) { $('room-code').textContent = (code || '------').toUpperCase(); },
  setOnline(online, label) {
    const status = $('online-status');
    status.textContent = label || (online ? 'ONLINE' : 'OFFLINE');
    status.classList.toggle('online', Boolean(online));
    $('firebase-note').hidden = Boolean(online);
  },
  setPlayerName(name) { $('player-name').textContent = name.toUpperCase(); },
  setMatchStatus(text) { $('match-status').textContent = text.toUpperCase(); },
  setScores(blue, red, blueName, redName) {
    $('score-one').textContent = blue ?? 0;
    $('score-two').textContent = red ?? 0;
    if (blueName) $('player-one-name').textContent = blueName.toUpperCase();
    if (redName) $('player-two-name').textContent = redName.toUpperCase();
  },
  setHealth(health) {
    $('health-value').textContent = `HP ${Math.round(health)}`;
    $('health-bar').style.width = `${Math.max(0, Math.min(100, health))}%`;
    $('health-bar').style.background = health < 30 ? '#ff5d64' : '#c8ff54';
  },
  setAmmo(magazine, reserve) { $('ammo-value').innerHTML = `${magazine} <i>/</i> ${reserve}`; },
  showReloading(show) { $('reload-indicator').classList.toggle('show', show); },
  muzzleFlash() {
    const flash = $('muzzle-flash');
    flash.classList.remove('show');
    void flash.offsetWidth;
    flash.classList.add('show');
  },
  setPointerHint(show) { $('pointer-hint').style.display = show ? 'block' : 'none'; },
  hit(headshot = false) {
    const marker = $('hit-marker');
    marker.classList.toggle('headshot', Boolean(headshot));
    marker.classList.add('show');
    clearTimeout(hitTimer);
    hitTimer = setTimeout(() => marker.classList.remove('show'), 180);
  },
  damageFlash() {
    const hud = $('hud');
    hud.classList.remove('damaged');
    void hud.offsetWidth;
    hud.classList.add('damaged');
    clearTimeout(damageTimer);
    damageTimer = setTimeout(() => hud.classList.remove('damaged'), 260);
  },
  toast(text) {
    const node = $('toast');
    node.textContent = text;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2200);
  },
  showResult(winner, message) {
    $('overlay-kicker').textContent = 'MATCH COMPLETE';
    $('overlay-title').textContent = winner ? 'VICTORY' : 'DEFEAT';
    $('overlay-title').style.color = winner ? '#c8ff54' : '#f5f7fb';
    $('overlay-message').textContent = message || '';
    $('overlay').classList.remove('hidden');
  },
  hideResult() { $('overlay').classList.add('hidden'); },
  setBusy(busy) {
    const button = $('play-button');
    button.disabled = busy;
    button.innerHTML = busy ? 'CONNECTING <span>…</span>' : 'PLAY ONLINE <span>↗</span>';
  },
  toastError(message) { this.toast(message); }
};

export function bindMenu({ onPlay, onPractice, onRematch, onMenu, onSensitivity, onCreateRoom, onJoinRoom, onCopyRoomCode }) {
  $('play-button').addEventListener('click', onPlay);
  $('practice-button').addEventListener('click', onPractice);
  $('again-button').addEventListener('click', onRematch);
  $('menu-button').addEventListener('click', onMenu);
  $('lobby-back-button').addEventListener('click', onMenu);
  $('create-room-button').addEventListener('click', onCreateRoom);
  $('join-room-button').addEventListener('click', () => onJoinRoom($('join-room-code').value));
  $('join-room-code').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); onJoinRoom($('join-room-code').value); } });
  $('copy-room-code').addEventListener('click', onCopyRoomCode);
  $('settings-button').addEventListener('click', () => $('settings-dialog').showModal());
  $('controls-button').addEventListener('click', () => $('controls-dialog').showModal());
  const sensitivity = $('sensitivity');
  const updateSensitivity = () => {
    const value = Number(sensitivity.value);
    $('sensitivity-value').textContent = value.toFixed(4);
    localStorage.setItem('arenaSensitivity', value);
    onSensitivity(value);
  };
  sensitivity.value = localStorage.getItem('arenaSensitivity') || '0.002';
  updateSensitivity();
}
