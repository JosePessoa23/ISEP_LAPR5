import { Vector3, sRGBEncoding, BufferGeometry, MeshPhongMaterial, Mesh, DoubleSide, TextureLoader, RepeatWrapping, BufferAttribute, Vector2 } from 'three';

export class Rampa {
    
    points: Array<Vector3>;
    rampaStart: Vector3;
    rampaEnd: Vector3;
    geometry: BufferGeometry;
    material: MeshPhongMaterial;
    mesh: Mesh;

    constructor(nodeStartPos: Vector3, nodeEndPos: Vector3, ligacaoComprimento: number, viaLargura: number, orientacao: number) 
    { 
        //Constantes
        const K_REPEAT = 2;
        const COLOR = 0x333333;

        //Geometry, Material e Mesh
        this.points = new Array<Vector3>;

        //Obter o vetor para o centro do extremo exterior da entrada da primeira node
        this.rampaStart = new Vector3(
            nodeStartPos.x + (Math.sin(orientacao) * ligacaoComprimento), 
            nodeStartPos.y - (Math.cos(orientacao) * ligacaoComprimento), 
            nodeStartPos.z
        );

        //Obter o vetor para o centro do extremo exterior da entrada da segunda node
        this.rampaEnd = new Vector3(
            nodeEndPos.x - (Math.sin(orientacao) * ligacaoComprimento), 
            nodeEndPos.y + (Math.cos(orientacao) * ligacaoComprimento), 
            nodeEndPos.z
        );

        var dist = this.rampaStart.distanceTo(this.rampaEnd);

        //Adiciona os pontos dos dois poligonos necessarios
        this.points = this.calcPoints(viaLargura, orientacao);

        this.geometry = new BufferGeometry().setFromPoints( this.points );

        var texture = new TextureLoader().load( "assets/road_texture.jpg" );
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set( 1, dist / viaLargura );
        texture.anisotropy = 16;
        //texture.encoding = sRGBEncoding;

        var normalTexture = new TextureLoader().load( "assets/road_normal.jpg" );
        normalTexture.wrapS = RepeatWrapping;
        normalTexture.wrapT = RepeatWrapping;
        normalTexture.repeat.set( 1, dist / viaLargura );
        normalTexture.anisotropy = 16;

        const uvs = new Float32Array([
            //First triangle, of first face
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            //Second triangle, of first face
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
        ]);
        
        this.geometry.setAttribute('uv', new BufferAttribute(uvs, 2));
        this.geometry.computeVertexNormals();
        this.material = new MeshPhongMaterial( { 
            side: DoubleSide, 
            color: COLOR,
            map: texture,
            normalMap: normalTexture,
            normalScale: new Vector2(0.3, 0.3),
            //shininess: 0.5
        } );
        this.mesh = new Mesh( this.geometry, this.material );
    }

    /** Calcula e retorna os pontos dos dois poligonos da rampa
     * 
     * @param viaLargura 
     * @param orientacao 
     * @returns os pontos dos dois poligonos da rampa
     */
    calcPoints(viaLargura: number, orientacao: number): Array<Vector3>{
        
        //Array de pontos para criacao da rampa
        var points = [];

        //Encontrar e adicionar os pontos do primeiro poligono do plano rampa
        points.push(new Vector3(
            this.rampaStart.x + (Math.cos(orientacao) * (viaLargura / 2)),
            this.rampaStart.y + (Math.sin(orientacao) * (viaLargura / 2)),
            this.rampaStart.z
        ));
        points.push(new Vector3(
            this.rampaStart.x - (Math.cos(orientacao) * (viaLargura / 2)),
            this.rampaStart.y - (Math.sin(orientacao) * (viaLargura / 2)),
            this.rampaStart.z
        ));
        points.push(new Vector3(
            this.rampaEnd.x + (Math.cos(orientacao) * (viaLargura / 2)),
            this.rampaEnd.y + (Math.sin(orientacao) * (viaLargura / 2)),
            this.rampaEnd.z
        ));

        //Encontrar e adicionar os pontos do segundo poligono do plano rampa
        points.push(new Vector3(
            this.rampaEnd.x + (Math.cos(orientacao) * (viaLargura / 2)),
            this.rampaEnd.y + (Math.sin(orientacao) * (viaLargura / 2)),
            this.rampaEnd.z
        ));
        points.push(new Vector3(
            this.rampaEnd.x - (Math.cos(orientacao) * (viaLargura / 2)),
            this.rampaEnd.y - (Math.sin(orientacao) * (viaLargura / 2)),
            this.rampaEnd.z
        ));
        points.push(new Vector3(
            this.rampaStart.x - (Math.cos(orientacao) * (viaLargura / 2)),
            this.rampaStart.y - (Math.sin(orientacao) * (viaLargura / 2)),
            this.rampaStart.z
        ));

        return points;
    }
}