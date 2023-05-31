import { PlaneGeometry, MeshPhongMaterial, Mesh, DoubleSide, RepeatWrapping, TextureLoader, Vector2 } from 'three';

export class ElementoLigacao {
    
    geometry: PlaneGeometry;
    material: MeshPhongMaterial ;
    mesh: Mesh;

    constructor(largura: number, comprimento: number) 
    { 
        //Constantes
        const COLOR = 0x333333;

        var texture = new TextureLoader().load( "assets/road_texture.jpg" );
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set( 1, 1 );
        texture.anisotropy = 16;

        var normalTexture = new TextureLoader().load( "assets/road_normal.jpg" );
        normalTexture.wrapS = RepeatWrapping;
        normalTexture.wrapT = RepeatWrapping;
        normalTexture.repeat.set( 1, 1 );
        normalTexture.anisotropy = 16;

        //Geometry, Material e Mesh
        this.geometry = new PlaneGeometry( largura, comprimento );
        this.geometry.computeVertexNormals();
        this.material = new MeshPhongMaterial({ 
            map: texture, 
            side: DoubleSide, 
            color: COLOR, 
            normalMap: normalTexture,
            normalScale: new Vector2(0.3, 0.3), 
            //shininess: 0.5
        });
        this.mesh = new Mesh( this.geometry, this.material );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
    }
}