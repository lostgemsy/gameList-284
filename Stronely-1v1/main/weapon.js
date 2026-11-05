import * as THREE from 'three';

export class AssaultRifle {
  constructor({ camera, onShot, onAmmo, onReload, onDryFire }) {
    this.camera = camera;
    this.onShot = onShot;
    this.onAmmo = onAmmo;
    this.onReload = onReload;
    this.onDryFire = onDryFire;
    this.magazineSize = 30;
    this.magazine = 30;
    this.reserve = 90;
    this.fireInterval = 1000 / 10;
    this.reloadDuration = 1450;
    this.lastShot = 0;
    this.reloading = false;
    this.reloadTimer = null;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 100;
  }

  fire(targets, blockers) {
    const now = performance.now();
    if (this.reloading || now - this.lastShot < this.fireInterval) return false;
    if (this.magazine <= 0) { this.onDryFire?.(); return false; }
    this.lastShot = now;
    this.magazine--;
    this.onAmmo?.(this.magazine, this.reserve);
    this.raycaster.setFromCamera({ x: 0, y: 0 }, this.camera);

    const targetHits = targets.length ? this.raycaster.intersectObjects(targets, true) : [];
    const blockerHits = blockers.length ? this.raycaster.intersectObjects(blockers, false) : [];
    let hit = null;
    if (targetHits.length && (!blockerHits.length || targetHits[0].distance < blockerHits[0].distance)) {
      const object = targetHits[0].object;
      let target = object;
      while (target && !target.userData.playerId) target = target.parent;
      if (target) {
        const headshot = object.userData.hitZone === 'head';
        const normal = targetHits[0].face?.normal?.clone() || new THREE.Vector3(0, 1, 0);
        if (targetHits[0].face) {
          const normalMatrix = new THREE.Matrix3().getNormalMatrix(targetHits[0].object.matrixWorld);
          normal.applyMatrix3(normalMatrix).normalize();
        }
        hit = {
          playerId: target.userData.playerId,
          damage: headshot ? 52 : 26,
          headshot,
          point: targetHits[0].point.clone(),
          normal
        };
      }
    }
    this.onShot?.(hit, this.raycaster.ray);
    return true;
  }

  reload() {
    if (this.reloading || this.magazine === this.magazineSize || this.reserve <= 0) return false;
    this.reloading = true;
    this.onReload?.(true);
    this.reloadTimer = setTimeout(() => {
      const needed = this.magazineSize - this.magazine;
      const loaded = Math.min(needed, this.reserve);
      this.magazine += loaded;
      this.reserve -= loaded;
      this.reloading = false;
      this.onAmmo?.(this.magazine, this.reserve);
      this.onReload?.(false);
    }, this.reloadDuration);
    return true;
  }

  reset() {
    clearTimeout(this.reloadTimer);
    this.reloading = false;
    this.magazine = this.magazineSize;
    this.reserve = 90;
    this.lastShot = 0;
    this.onReload?.(false);
    this.onAmmo?.(this.magazine, this.reserve);
  }
}
