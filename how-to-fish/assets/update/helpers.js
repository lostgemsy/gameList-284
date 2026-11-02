/* Tidebound 1.1 — shared, dependency-free helpers. */
export const clamp = (x, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
export const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
export const copy = (x) => JSON.parse(JSON.stringify(x));
export function wrap(proto, name, patch) {
  const original = proto[name];
  if (typeof original !== 'function') throw new Error(`Missing integration point: ${name}`);
  proto[name] = function (...args) { return patch.call(this, original.bind(this), ...args); };
}
export function el(tag, className, text, parent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  parent?.append(node);
  return node;
}
export function disposeTree(root) {
  const geometries = new Set(), materials = new Set();
  root?.traverse?.(o => {
    if (o.geometry) geometries.add(o.geometry);
    for (const m of (Array.isArray(o.material) ? o.material : [o.material])) if (m) materials.add(m);
  });
  root?.removeFromParent?.();
  for (const g of geometries) g.dispose();
  for (const m of materials) m.dispose();
}
export function facePoint(game, point) {
  const d = point.clone().sub(game.player.position);
  game.player.yaw = Math.atan2(-d.x, -d.z);
  game.player.pitch = clamp(Math.atan2(d.y, Math.hypot(d.x, d.z)), -1.2, 1.2);
  game.camera.rotation.set(game.player.pitch, game.player.yaw, 0, 'YXZ');
  game.camera.updateMatrixWorld(true);
}
export function waterNear(game, T, distance = 9) {
  const origin = game.player.position, yaw = game.player.yaw;
  for (const d of [distance, distance + 4, distance + 9]) {
    for (const offset of [0, .35, -.35, .8, -.8, 1.5, -1.5, Math.PI]) {
      const p = new T.Vector3(origin.x - Math.sin(yaw + offset) * d, -.22, origin.z - Math.cos(yaw + offset) * d);
      const boat=game.zoneSystem?.boatInstance?.position;
      if (boat&&Math.hypot(p.x-boat.x,p.z-boat.z)<4.5)continue;
      if (!game.isWaterPoint(p, .7)) continue;
      // The target must be reachable along the shot, not merely in water.
      const start=origin.clone();
      let clear=true;
      for(let u=.04;u<1;u+=.025){
        const q=start.clone().lerp(p,u),surface=game.surfaceAt(q.x,q.z);
        if((surface!=null&&q.y<surface-game.playerEyeHeight+.06)||(q.y>0&&game.isSolidAt(q.x,q.z,.08))){clear=false;break;}
      }
      if(clear)return p;
    }
  }
  return game.fishSystem.schools[0]?.center.clone().setY(-.2) ?? new T.Vector3(10, -.2, -12);
}
export function putOnGround(game, x, z) {
  const y = game.surfaceAt(x, z);
  if (y == null) return false;
  game.player.position.set(x, y, z);
  game.player.velocity.set(0, 0, 0);
  game.player.grounded = true;
  game.camera.position.copy(game.player.position);
  game.camera.updateMatrixWorld(true);
  return true;
}
