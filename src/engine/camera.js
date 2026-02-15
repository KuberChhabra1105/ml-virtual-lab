import * as THREE from "three"

export class Camera {
    constructor(experience) {
        this.experience = experience
        this.sizes = experience.sizes
        this.scene = experience.scene
        this.canvas = experience.canvas

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )

        this.instance.position.set(0, 0, 6)
        this.scene.add(this.instance)
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {}
}
