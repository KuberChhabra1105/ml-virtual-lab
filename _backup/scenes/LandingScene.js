import * as THREE from 'three';
import { SceneController } from './SceneController.js';
import { LabScene } from './LabScene.js';
import { createStickyNote } from '../ui/StickyNote3D.js';

let group;

export const LandingScene = {

    init(scene) {

        group = new THREE.Group();

        const geometry = new THREE.BoxGeometry(8, 0.3, 6);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.9
        });

        const desk = new THREE.Mesh(geometry, material);
        desk.position.y = -1.5;
        group.add(desk);

        const note1 = createStickyNote(
            "Welcome to ML Virtual Lab\n\nLearn visually.\nUnderstand deeply.",
            0xfff3b0
        );

        note1.position.set(-2.5, 0.5, 0);
        note1.rotation.y = 0.2;

        const note2 = createStickyNote(
            "Explore Gradient Descent\nNeural Networks\nLoss Surfaces",
            0xa8d5ba
        );

        note2.position.set(2.5, 0.6, -1);
        note2.rotation.y = -0.3;

        group.add(note1);
        group.add(note2);

        scene.add(group);

        this.notes = [note1, note2];

        window.addEventListener("click", () => {
            SceneController.load(LabScene);
        });
    },

    update() {
        const time = Date.now() * 0.001;

        if (this.notes) {
            this.notes.forEach((note, i) => {
                note.position.y = 0.5 + Math.sin(time + i) * 0.05;
                note.rotation.z = Math.sin(time * 0.5 + i) * 0.05;
            });
        }
    },


    cleanup(scene) {
        scene.remove(group);
    }
};
