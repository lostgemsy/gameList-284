import * as THREE from 'three';

const MATERIALS = {
  floor: new THREE.MeshStandardMaterial({ color: 0x202833, roughness: 0.85 }),
  wall: new THREE.MeshStandardMaterial({ color: 0x343e4a, roughness: 0.82 }),
  cover: new THREE.MeshStandardMaterial({ color: 0x56616e, roughness: 0.72 }),
  trim: new THREE.MeshStandardMaterial({ color: 0x171e28, roughness: 0.55 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x1689e9, emissive: 0x062c54, roughness: 0.5 }),
  red: new THREE.MeshStandardMaterial({ color: 0xe7424b, emissive: 0x521115, roughness: 0.5 })
};

export function buildArena(scene) {
  const colliders = [];
  const shootables = [];
  const addBox = (x, y, z, width, height, depth, material, solid = true) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y + height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    if (solid) {
      colliders.push({ min: new THREE.Vector3(x - width / 2, y, z - depth / 2), max: new THREE.Vector3(x + width / 2, y + height, z + depth / 2) });
      shootables.push(mesh);
    }
    return mesh;
  };

  const floor = new THREE.Mesh(new THREE.BoxGeometry(42, 0.5, 38), MATERIALS.floor);
  floor.position.set(0, -0.25, 0);
  floor.receiveShadow = true;
  scene.add(floor);
  addBox(0, 0, -19, 42, 6, 1, MATERIALS.wall);
  addBox(0, 0, 19, 42, 6, 1, MATERIALS.wall);
  addBox(-21, 0, 0, 1, 6, 38, MATERIALS.wall);
  addBox(21, 0, 0, 1, 6, 38, MATERIALS.wall);

  // Symmetric raised spawn decks and side-route platforms.
  addBox(-14, 0, 0, 8, 0.35, 13, MATERIALS.trim);
  addBox(14, 0, 0, 8, 0.35, 13, MATERIALS.trim);
  addBox(-14, 0.35, 0, 2.6, 0.14, 2.6, MATERIALS.blue, false);
  addBox(14, 0.35, 0, 2.6, 0.14, 2.6, MATERIALS.red, false);
  addBox(-8, 0, -12, 4, 0.6, 4, MATERIALS.trim);
  addBox(8, 0, -12, 4, 0.6, 4, MATERIALS.trim);
  addBox(-8, 0, 12, 4, 0.6, 4, MATERIALS.trim);
  addBox(8, 0, 12, 4, 0.6, 4, MATERIALS.trim);

  // Waist-high duel cover, with matching side cover and tall corner barriers.
  addBox(0, 0, 0, 5, 1.35, 2.2, MATERIALS.cover);
  addBox(-5.5, 0, -5, 3.4, 1.2, 2, MATERIALS.cover);
  addBox(5.5, 0, 5, 3.4, 1.2, 2, MATERIALS.cover);
  addBox(-5.5, 0, 5, 2, 1.35, 3.4, MATERIALS.cover);
  addBox(5.5, 0, -5, 2, 1.35, 3.4, MATERIALS.cover);
  addBox(-11, 0, -8, 1.4, 2.5, 4.4, MATERIALS.cover);
  addBox(11, 0, 8, 1.4, 2.5, 4.4, MATERIALS.cover);
  addBox(-11, 0, 8, 1.4, 2.5, 4.4, MATERIALS.cover);
  addBox(11, 0, -8, 1.4, 2.5, 4.4, MATERIALS.cover);

  const grid = new THREE.GridHelper(40, 40, 0x4a5969, 0x303b48);
  grid.position.y = 0.012;
  scene.add(grid);
  const hemi = new THREE.HemisphereLight(0xc9e3ff, 0x252b34, 2.05);
  scene.add(hemi);
  const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.7);
  keyLight.position.set(-5, 19, 9);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);
  const blueLight = new THREE.PointLight(0x1689ff, 32, 15);
  blueLight.position.set(-14, 2.1, 0);
  scene.add(blueLight);
  const redLight = new THREE.PointLight(0xff3644, 32, 15);
  redLight.position.set(14, 2.1, 0);
  scene.add(redLight);

  return { colliders, shootables, spawns: [[-14, 0.35, 0], [14, 0.35, 0]] };
}
