import * as THREE from "three"

export class SceneSetup {
    constructor(experience) {
        this.scene = experience.scene

        const light = new THREE.DirectionalLight(0xffffff, 2)
        light.position.set(2, 2, 3)
        this.scene.add(light)

        const ambient = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(ambient)
    }
}
