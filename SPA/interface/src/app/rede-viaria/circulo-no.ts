import {CircleGeometry, MeshPhongMaterial, Mesh, DoubleSide, TextureLoader, RepeatWrapping, Vector2 } from 'three';

export class CirculoNo {

    geometry: CircleGeometry;
    material: MeshPhongMaterial;
    mesh: Mesh;

    constructor(raio: number, viaLargura: number) 
    { 
        //Constantes
        const SEGMENTS = 32;
        const COLOR = 0x333333;

        var texture = new TextureLoader().load( "assets/basic_roundabout_texture.jpg" );
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set( 1, 1 );
        texture.anisotropy = 16;

        var normalTexture = new TextureLoader().load( "assets/roundabout_normal.jpg" );
        normalTexture.wrapS = RepeatWrapping;
        normalTexture.wrapT = RepeatWrapping;
        normalTexture.repeat.set( 1, 1 );
        normalTexture.anisotropy = 16;

        //Geometry, Material e Mesh
        this.geometry = new CircleGeometry( raio, SEGMENTS );
        this.geometry.computeVertexNormals();
        this.material = new MeshPhongMaterial( { 
            map: texture, 
            side: DoubleSide, 
            color: COLOR,
            normalMap: normalTexture,
            normalScale: new Vector2(0.3, 0.3), 
            //shininess: 0.5
        } );
        this.mesh = new Mesh( this.geometry, this.material );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
    }
}