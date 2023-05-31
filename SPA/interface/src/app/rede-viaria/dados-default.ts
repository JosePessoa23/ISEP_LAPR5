import { Vector3 } from 'three';

export class NodeArmazem {
    designacao: string;
    x: number;
    y: number;
    z: number;

    constructor(designacao: string, x: number, y: number, z: number){
        this.designacao = designacao;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getZ(): number {
        return this.z;
    }

    getVector3(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    longitudeToX(longitude: number): number {
        return ((50 - (-50)) / (8.7613-8.2451)) * (longitude - 8.2451) + (-50)
    }

    latitudeToY(latitude: number): number {
        return ((50 - (-50)) / (42.1115-40.8387)) * (latitude - 40.8387) + (-50)
    }

    altitudeToY(altitude: number): number {
        return (50  / 800) * altitude;
    }
}

export class ArcoArmazem {

    node1: NodeArmazem;
    node2: NodeArmazem;

    constructor(node1: NodeArmazem, node2: NodeArmazem){
        this.node1 = node1;
        this.node2 = node2;
    }

    getNode1(): NodeArmazem {
        return this.node1;
    }

    getNode2(): NodeArmazem {
        return this.node2;
    }
}


export class DadosDefault {
    nodes: Array<NodeArmazem>;
    arcos: Array<ArcoArmazem>;

    constructor() {
        this.nodes = new Array<NodeArmazem>;

        this.addNode("Arouca", -50, -42.6618, 15.625);                  //0
        this.addNode("Espinho", 26.6951, -36.7615, 34.375);             //1
        this.addNode("Gondomar", 50, 50, 12.5);                         //2
        this.addNode("Maia", 22.8206, -19.4217, 43.75);                 //3
        this.addNode("Matosinhos", 37.4080, -22.8394, 21.8750);         //4
        this.addNode("Oliveira de Azeméis", -5.0756, -50, 46.875);      //5
        this.addNode("Paredes", -33.4754, -21.2052, 0);                 //6
        this.addNode("Porto", 24.3898, -24.9214, 37.5);                 //7
        this.addNode("Póvoa de Varzim", 49.9225, -7.4403, 25);          //8
        this.addNode("Santa Maria da Feira", 8.7369, -43.0783, 6.25);   //9
        this.addNode("Santo Tirso", -5.6955, -10.3708, 40.625);         //10
        this.addNode("São João da Madeira", -2.4215, -45.1446, 18.75);  //11
        this.addNode("Trofa", 11.0035, -10.6851, 28.125);               //12
        this.addNode("Vale de Cambra", -20.8446, -49.6622, 3.1250);     //13
        this.addNode("Valongo", -0.9492, -22.5016, 50);                 //14
        this.addNode("Vila do Conde", 47.4041, -9.6952, 9.375);         //15
        this.addNode("Vila Nova de Gaia", 21.0384, -27.5927, 31.25);    //16

        this.arcos = new Array<ArcoArmazem>;

        this.addArco(this.nodes[0], this.nodes[6]);
        this.addArco(this.nodes[0], this.nodes[13]);
        this.addArco(this.nodes[6], this.nodes[13]);
        this.addArco(this.nodes[6], this.nodes[11]);
        this.addArco(this.nodes[6], this.nodes[14]);
        this.addArco(this.nodes[6], this.nodes[10]);
        this.addArco(this.nodes[13], this.nodes[5]);
        this.addArco(this.nodes[5], this.nodes[11]);
        this.addArco(this.nodes[5], this.nodes[9]);
        this.addArco(this.nodes[11], this.nodes[14]);
        this.addArco(this.nodes[11], this.nodes[9]);
        this.addArco(this.nodes[14], this.nodes[10]);
        this.addArco(this.nodes[14], this.nodes[12]);
        this.addArco(this.nodes[14], this.nodes[16]);
        this.addArco(this.nodes[10], this.nodes[12]);
        this.addArco(this.nodes[9], this.nodes[16]);
        this.addArco(this.nodes[9], this.nodes[1]);
        this.addArco(this.nodes[16], this.nodes[3]);
        this.addArco(this.nodes[16], this.nodes[7]);
        this.addArco(this.nodes[16], this.nodes[1]);
        this.addArco(this.nodes[12], this.nodes[2]);
        this.addArco(this.nodes[12], this.nodes[3]);
        this.addArco(this.nodes[3], this.nodes[15]);
        this.addArco(this.nodes[3], this.nodes[4]);
        this.addArco(this.nodes[3], this.nodes[7]);
        this.addArco(this.nodes[7], this.nodes[1]);
        this.addArco(this.nodes[7], this.nodes[4]);
        this.addArco(this.nodes[1], this.nodes[4]);
        this.addArco(this.nodes[4], this.nodes[15]);
        this.addArco(this.nodes[15], this.nodes[2]);
        this.addArco(this.nodes[15], this.nodes[8]);




    }

    public getNodes(): Array<NodeArmazem> {
        return this.nodes;
    }

    public getArcos(): Array<ArcoArmazem> {
        return this.arcos;
    }

    addNode(designacao: string, x: number, y: number, z: number): boolean{
        const armazemNode = new NodeArmazem(designacao, x, y ,z);

        if (this.nodes.includes(armazemNode))
            return false;
        
        this.nodes.push(armazemNode);
        return true;
    }

    addArco(node1: NodeArmazem, node2: NodeArmazem): boolean{
        const armazemArco = new ArcoArmazem(node1, node2);
        const armazemArcoRev = new ArcoArmazem(node2, node1);

        if (this.arcos.includes(armazemArco) || this.arcos.includes(armazemArcoRev))
            return false;
        
        this.arcos.push(armazemArco);
        return true;
    }
}