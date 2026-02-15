import * as THREE from 'three';

export function createLossSurface() {
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const pos = geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getY(i);
        const height = 0.1 * (x * x + z * z);
        pos.setZ(i, height);
    }

    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
        color: 0x0077ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;

    return mesh;
}
