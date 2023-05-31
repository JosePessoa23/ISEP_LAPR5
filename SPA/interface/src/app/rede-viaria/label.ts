import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export class ArmazemLabel {

    labelSprite: THREE.Sprite;

    constructor(baseWidth: number, size: number, text: string){
        this.labelSprite = this.makeLabel(baseWidth, size, text);
    }

    makeLabelCanvas(baseWidth: number, size: number, text: string): HTMLCanvasElement {
        const borderSize = 2;
        const ctx = document.createElement('canvas').getContext('2d');

        /*
        const loader = new FontLoader();
        const font = loader.load(
	        // resource URL
	        'fonts/helvetiker_bold.typeface.json',
        );
        */

        const font =  `${size}px bold Arial, Helvetica, sans-serif`;

        ctx!.font = font;
        // measure how long the name will be
        const textWidth = ctx!.measureText(text).width;
    
        const doubleBorderSize = borderSize * 2;
        const width = baseWidth + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx!.canvas.width = width;
        ctx!.canvas.height = height;
    
        // need to set font again after resizing canvas
        ctx!.font = font;
        ctx!.textBaseline = 'middle';
        ctx!.textAlign = 'center';
    
        ctx!.fillStyle = 'rgba(18, 18, 18, 0.3)';
        ctx!.fillRect(0, 0, width, height);
    
        // scale to fit but don't stretch
        const scaleFactor = Math.min(1, baseWidth / textWidth);
        ctx!.translate(width / 2, height / 2);
        ctx!.scale(scaleFactor, 1);
        ctx!.fillStyle = 'white';
        ctx!.fillText(text, 0, 0);
    
        return ctx!.canvas;
    }

    makeLabel(baseWidth: number, size: number, text: string): THREE.Sprite {
        const canvas = this.makeLabelCanvas(baseWidth, size, text);
        const texture = new THREE.CanvasTexture(canvas);
        // because our canvas is likely not a power of 2
        // in both dimensions set the filtering appropriately.
        texture.minFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        const labelMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
        });
        // if units are meters then 0.01 here makes size
        // of the label into centimeters.
        const labelBaseScale = 0.001;
        const label = new THREE.Sprite(labelMaterial);

        label.scale.x = canvas.width  * labelBaseScale;
        label.scale.y = canvas.height * labelBaseScale;

        return label;
    }
}