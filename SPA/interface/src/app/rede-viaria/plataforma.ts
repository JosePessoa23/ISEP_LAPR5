import {Vector2, sRGBEncoding, MeshPhongMaterial, Mesh, DoubleSide, TextureLoader, RepeatWrapping, PlaneGeometry } from 'three';

export class ArmazemPlataforma {

    geometry: PlaneGeometry;
    material: MeshPhongMaterial;
    mesh: Mesh;

    constructor(largura: number, comprimento: number) 
    {    
        //Constantes
        const COLOR = 0x777777;
        const REPEAT = 4;
        const ANISOTROPY = 4;
        const NORMAL_SCALE = 4;
        const DISPLACEMENT_SCALE = 0.0015;
        const SEGMENTS = 100;

        var colorTexture = new TextureLoader().load( "assets/cobblestone/diffuse.png" );
        colorTexture.wrapS = RepeatWrapping;
        colorTexture.wrapT = RepeatWrapping;
        colorTexture.repeat.set( REPEAT, REPEAT * (comprimento / largura) );
        colorTexture.anisotropy = ANISOTROPY;
        colorTexture.encoding = sRGBEncoding;

        var normalTexture = new TextureLoader().load( "assets/cobblestone/normal.png" );
        normalTexture.wrapS = RepeatWrapping;
        normalTexture.wrapT = RepeatWrapping;
        normalTexture.repeat.set( REPEAT, REPEAT * (comprimento / largura) );
        normalTexture.anisotropy = ANISOTROPY;

        var heightTexture = new TextureLoader().load( "assets/cobblestone/height.png" );
        heightTexture.wrapS = RepeatWrapping;
        heightTexture.wrapT = RepeatWrapping;
        heightTexture.repeat.set( REPEAT, REPEAT * (comprimento / largura) );
        heightTexture.anisotropy = ANISOTROPY;

        var specularTexture = new TextureLoader().load( "assets/cobblestone/specular.png" );
        specularTexture.wrapS = RepeatWrapping;
        specularTexture.wrapT = RepeatWrapping;
        specularTexture.repeat.set( REPEAT, REPEAT * (comprimento / largura) );
        specularTexture.anisotropy = ANISOTROPY;

        //Geometry, Material e Mesh
        let geometry = new PlaneGeometry( largura, comprimento, SEGMENTS, SEGMENTS * (comprimento / largura) );
        let material = new MeshPhongMaterial( { 
            map: colorTexture, 
            color: COLOR,
            normalMap: normalTexture,
            normalScale: new Vector2(NORMAL_SCALE, NORMAL_SCALE), 
            displacementMap: heightTexture,
            displacementScale: DISPLACEMENT_SCALE,
            specularMap: specularTexture,
            side: DoubleSide
        } );

        this.geometry = geometry;
        this.material = material;
        this.mesh = new Mesh( geometry, material );
        this.mesh.receiveShadow = true;
    }
}