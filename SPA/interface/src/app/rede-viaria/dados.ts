import { Vector3 } from 'three';
import { Armazem } from '../dto/armazem';
import { ArmazemService } from '../services/armazem.service';

export class NodeArmazem {
    designacao: string;
    x: number;
    y: number;
    z: number;

    constructor(designacao: string, x: number, y: number, z: number){
        console.log("x -> "+ x );
        this.designacao = designacao;
        this.x = this.longitudeToX(x);
        this.y = this.latitudeToY(y);
        this.z = this.altitudeToY(z);
        console.log("x -> " + this.x);
        console.log("y -> " + this.y);
        console.log("z -> " + this.z);
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

    getNode1(): NodeArmazem{
        return this.node1;
    }

    getNode2(): NodeArmazem{
        return this.node2;
    }
}


export class Dados {
    nodes: Array<NodeArmazem>;
    arcos: Array<ArcoArmazem>;

    constructor(private armazemService: ArmazemService) {
        this.nodes = new Array<NodeArmazem>;
        this.arcos = new Array<ArcoArmazem>;
        
        armazemService.getArmazens().subscribe(armazens => this.getArmazens(armazens));



    }

    private async getArmazens(armazemList: Armazem[]){
        armazemList.forEach(armazem => this.addArmazem(armazem));
    }

    private addArmazem(armazem: Armazem){
        this.addNode(armazem.designacao,armazem.longitude, armazem.latitude,armazem.altitude);
    }

    public addArcos(){
        this.addArco(this.nodes.find(i => i.designacao == "Arouca"), this.nodes.find(i => i.designacao == "Oliveira de Azeméis"));
        this.addArco(this.nodes.find(i => i.designacao == "Arouca"), this.nodes.find(i => i.designacao == "Trofa"));
        this.addArco(this.nodes.find(i => i.designacao == "Oliveira de Azeméis"), this.nodes.find(i => i.designacao == "Trofa"));
        this.addArco(this.nodes.find(i => i.designacao == "Oliveira de Azeméis"), this.nodes.find(i => i.designacao == "Santo Tirso"));
        this.addArco(this.nodes.find(i => i.designacao == "Oliveira de Azeméis"), this.nodes.find(i => i.designacao == "Vale de Cambra"));
        this.addArco(this.nodes.find(i => i.designacao == "Oliveira de Azeméis"), this.nodes.find(i => i.designacao == "Santa Maria da Feira"));
        this.addArco(this.nodes.find(i => i.designacao == "Trofa"), this.nodes.find(i => i.designacao == "Matosinhos"));
        this.addArco(this.nodes.find(i => i.designacao == "Matosinhos"), this.nodes.find(i => i.designacao == "Santo Tirso"));
        this.addArco(this.nodes.find(i => i.designacao == "Matosinhos"), this.nodes.find(i => i.designacao == "Póvoa de Varzim"));
        this.addArco(this.nodes.find(i => i.designacao == "Santo Tirso"), this.nodes.find(i => i.designacao == "Vale de Cambra"));
        this.addArco(this.nodes.find(i => i.designacao == "Santo Tirso"), this.nodes.find(i => i.designacao == "Póvoa de Varzim"));
        this.addArco(this.nodes.find(i => i.designacao == "Vale de Cambra"), this.nodes.find(i => i.designacao == "Santa Maria da Feira"));
        this.addArco(this.nodes.find(i => i.designacao == "Vale de Cambra"), this.nodes.find(i => i.designacao == "São João da Madeira"));
        this.addArco(this.nodes.find(i => i.designacao == "Vale de Cambra"), this.nodes.find(i => i.designacao == "Vila do Conde"));
        this.addArco(this.nodes.find(i => i.designacao == "Santa Maria da Feira"), this.nodes.find(i => i.designacao == "São João da Madeira"));
        this.addArco(this.nodes.find(i => i.designacao == "Póvoa de Varzim"), this.nodes.find(i => i.designacao == "Vila do Conde"));
        this.addArco(this.nodes.find(i => i.designacao == "Póvoa de Varzim"), this.nodes.find(i => i.designacao == "Arouca"));
        this.addArco(this.nodes.find(i => i.designacao == "Vila do Conde"), this.nodes.find(i => i.designacao == "Gondomar"));
        this.addArco(this.nodes.find(i => i.designacao == "Vila do Conde"), this.nodes.find(i => i.designacao == "Paredes"));
        this.addArco(this.nodes.find(i => i.designacao == "Vila do Conde"), this.nodes.find(i => i.designacao == "Arouca"));
        this.addArco(this.nodes.find(i => i.designacao == "São João da Madeira"), this.nodes.find(i => i.designacao == "Espinho"));
        this.addArco(this.nodes.find(i => i.designacao == "São João da Madeira"), this.nodes.find(i => i.designacao == "Gondomar"));
        this.addArco(this.nodes.find(i => i.designacao == "Gondomar"), this.nodes.find(i => i.designacao == "Valongo"));
        this.addArco(this.nodes.find(i => i.designacao == "Gondomar"), this.nodes.find(i => i.designacao == "Maia"));
        this.addArco(this.nodes.find(i => i.designacao == "Gondomar"), this.nodes.find(i => i.designacao == "Paredes"));
        this.addArco(this.nodes.find(i => i.designacao == "Paredes"), this.nodes.find(i => i.designacao == "Arouca"));
        this.addArco(this.nodes.find(i => i.designacao == "Paredes"), this.nodes.find(i => i.designacao == "Maia"));
        this.addArco(this.nodes.find(i => i.designacao == "Arouca"), this.nodes.find(i => i.designacao == "Maia"));
        this.addArco(this.nodes.find(i => i.designacao == "Maia"), this.nodes.find(i => i.designacao == "Valongo"));
        this.addArco(this.nodes.find(i => i.designacao == "Valongo"), this.nodes.find(i => i.designacao == "Espinho"));
        this.addArco(this.nodes.find(i => i.designacao == "Valongo"), this.nodes.find(i => i.designacao == "Porto"));
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

    addArco(node1: NodeArmazem | undefined, node2: NodeArmazem | undefined): boolean{
        if(node1 != undefined && node2 != undefined){
        const armazemArco = new ArcoArmazem(node1, node2);
        const armazemArcoRev = new ArcoArmazem(node2, node1);

        if (this.arcos.includes(armazemArco) || this.arcos.includes(armazemArcoRev))
            return false;
        
        this.arcos.push(armazemArco);
        return true;
        }else{
            return false;
        }

        
    }
}