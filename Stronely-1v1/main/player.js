import * as THREE from 'three';

const PLAYER_HEIGHT = 1.65;
const PLAYER_RADIUS = 0.38;

export class Player {
  constructor(camera, domElement, options = {}) {
    this.camera = camera;
    this.domElement = domElement;
    this.position = new THREE.Vector3(...(options.spawn ?? [-13, 0, 0]));
    this.spawn = this.position.clone();
    this.health = 100;
    this.alive = true;
    this.yaw = 0;
    this.pitch = 0;
    this.velocityY = 0;
    this.onGround = true;
    this.colliders = [];
    this.sensitivity = Number(localStorage.getItem('arenaSensitivity')) || 0.002;
    this.camera.rotation.order = 'YXZ';
    this.syncCamera();
  }

  setColliders(colliders) { this.colliders = colliders; }
  setSpawn(x, y, z) { this.spawn.set(x, y, z); this.position.copy(this.spawn); this.syncCamera(); }

  handleMouseMove(event) {
    if (document.pointerLockElement !== this.domElement || !this.alive) return;
    this.yaw -= event.movementX * this.sensitivity;
    this.pitch -= event.movementY * this.sensitivity;
    this.pitch = THREE.MathUtils.clamp(this.pitch, -Math.PI / 2 + 0.02, Math.PI / 2 - 0.02);
    this.syncCamera();
  }

  update(delta, keys) {
    if (!this.alive || document.pointerLockElement !== this.domElement) return;
    const dt = Math.min(delta, 0.05);
    const speed = keys.ShiftLeft || keys.ShiftRight ? 10.5 : 7.2;
    // Unpressed keys are undefined in the sparse key map; coerce them to 0, not NaN.
    let forward = Number(Boolean(keys.KeyW)) - Number(Boolean(keys.KeyS));
    let side = Number(Boolean(keys.KeyD)) - Number(Boolean(keys.KeyA));
    const length = Math.hypot(forward, side);
    if (length > 0) { forward /= length; side /= length; }

    const dx = (-Math.sin(this.yaw) * forward + Math.cos(this.yaw) * side) * speed * dt;
    const dz = (-Math.cos(this.yaw) * forward - Math.sin(this.yaw) * side) * speed * dt;
    this.moveAxis(dx, 0);
    this.moveAxis(0, dz);

    if (keys.Space && this.onGround) {
      this.velocityY = 7.2;
      this.onGround = false;
      keys.Space = false;
    }
    this.velocityY -= 20 * dt;
    const previousY = this.position.y;
    this.position.y += this.velocityY * dt;
    if (this.velocityY <= 0) {
      for (const box of this.colliders) {
        const overlapsX = this.position.x + PLAYER_RADIUS > box.min.x && this.position.x - PLAYER_RADIUS < box.max.x;
        const overlapsZ = this.position.z + PLAYER_RADIUS > box.min.z && this.position.z - PLAYER_RADIUS < box.max.z;
        if (overlapsX && overlapsZ && previousY >= box.max.y && this.position.y <= box.max.y) {
          this.position.y = box.max.y;
          this.velocityY = 0;
          this.onGround = true;
          break;
        }
      }
    }
    if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocityY = 0;
      this.onGround = true;
    }
    this.syncCamera();
  }

  moveAxis(dx, dz) {
    const nextX = this.position.x + dx;
    const nextZ = this.position.z + dz;
    const feet = this.position.y;
    const head = feet + PLAYER_HEIGHT;
    for (const box of this.colliders) {
      if (head <= box.min.y || feet >= box.max.y) continue;
      const overlapsX = nextX + PLAYER_RADIUS > box.min.x && nextX - PLAYER_RADIUS < box.max.x;
      const overlapsZ = nextZ + PLAYER_RADIUS > box.min.z && nextZ - PLAYER_RADIUS < box.max.z;
      if (overlapsX && overlapsZ) {
        if (dx) return;
        if (dz) return;
      }
    }
    this.position.x = nextX;
    this.position.z = nextZ;
  }

  syncCamera() {
    this.camera.position.set(this.position.x, this.position.y + PLAYER_HEIGHT, this.position.z);
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
  }

  setHealth(health, alive = health > 0) {
    this.health = Math.max(0, Math.min(100, Number(health) || 0));
    this.alive = Boolean(alive) && this.health > 0;
  }

  respawn(spawn = this.spawn) {
    this.position.copy(spawn);
    this.velocityY = 0;
    this.health = 100;
    this.alive = true;
    this.onGround = true;
    this.syncCamera();
  }
}
