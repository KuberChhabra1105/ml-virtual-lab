import * as THREE from "three"
import { Sizes } from "./sizes"
import { Time } from "./time"
import { Camera } from "./camera"
import { Renderer } from "./renderer"
import { SceneSetup } from "./scene"

export default class Experience {
    constructor(canvas) {
        window.experience = this

        this.canvas = canvas

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.sceneSetup = new SceneSetup(this)

        this.sizes.on("resize", () => this.resize())
        this.time.on("tick", () => this.update())
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }
}
