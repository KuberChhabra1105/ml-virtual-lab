import * as THREE from "three"

export class HeroSection {
  constructor(experience) {
    this.experience = experience
    this.scene = experience.scene.instance
    this.camera = experience.camera.instance
    this.time = experience.time

    this.mouse = new THREE.Vector2(0, 0)

    this.setLights()
    this.setMesh()
    this.setParticles()
    this.setMouse()
  }

  setLights() {
    this.ambient = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(this.ambient)

    this.keyLight = new THREE.DirectionalLight(0xff7444, 1.2)
    this.keyLight.position.set(3, 3, 5)
    this.scene.add(this.keyLight)

    this.rimLight = new THREE.DirectionalLight(0x576a8f, 1.5)
    this.rimLight.position.set(-5, 2, -5)
    this.scene.add(this.rimLight)
  }

  setMesh() {
    this.geometry = new THREE.IcosahedronGeometry(2, 64)

    this.material = new THREE.MeshStandardMaterial({
      color: 0x576a8f,
      roughness: 0.25,
      metalness: 0.5
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  setParticles() {
    const count = 2000

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    )

    this.particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xb7bdf7,
      transparent: true,
      opacity: 0.6
    })

    this.particles = new THREE.Points(geometry, this.particleMaterial)
    this.scene.add(this.particles)
  }

  setMouse() {
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    })
  }

  update() {
    const elapsed = this.time.elapsed * 0.001

    // Subtle organic morph
    const positions = this.geometry.attributes.position
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)

      const distortion =
        Math.sin(elapsed + x * 2) *
        0.05

      positions.setXYZ(i, x + distortion, y + distortion, z + distortion)
    }
    positions.needsUpdate = true
    this.geometry.computeVertexNormals()

    // Slow cinematic rotation
    this.mesh.rotation.y += 0.002
    this.mesh.rotation.x += 0.001

    // Mouse parallax
    this.mesh.rotation.y += this.mouse.x * 0.001
    this.mesh.rotation.x += this.mouse.y * 0.001

    // Particle subtle drift
    this.particles.rotation.y += 0.0005
  }
}
