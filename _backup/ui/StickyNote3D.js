import * as THREE from 'three';

export function createStickyNote(text, baseColor = 0xfff3b0) {

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;

    const ctx = canvas.getContext('2d');

    // Convert hex to rgb
    const r = (baseColor >> 16) & 255;
    const g = (baseColor >> 8) & 255;
    const b = baseColor & 255;

    // Base fill
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle paper grain
    for (let i = 0; i < 150000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const opacity = Math.random() * 0.04;

        ctx.fillStyle = `rgba(0,0,0,${opacity})`;
        ctx.fillRect(x, y, 1, 1);
    }

    // Edge darkening (very subtle)
    const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.4,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
    );

    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.05)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = "#2f2f2f";
    ctx.font = "bold 52px Arial";
    ctx.textAlign = "left";

    wrapText(ctx, text, 120, 200, 800, 70);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;

    const geometry = new THREE.PlaneGeometry(3.2, 3.2);

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.85,
        metalness: 0.02
    });

    const note = new THREE.Mesh(geometry, material);

    return note;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const lines = text.split('\n');

    lines.forEach(line => {
        const words = line.split(' ');
        let currentLine = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = currentLine + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(currentLine, x, y);
                currentLine = words[n] + ' ';
                y += lineHeight;
            } else {
                currentLine = testLine;
            }
        }

        ctx.fillText(currentLine, x, y);
        y += lineHeight;
    });
}
