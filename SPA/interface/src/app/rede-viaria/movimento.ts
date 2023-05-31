import { NodeArmazem } from "./dados"
import * as THREE from 'three';

export enum Fases {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    INICIO = "INICIO",
    FIM = "FIM"
}

export class Movimento {

    n_fotogramas_inicio : number
    n_fotogramas_fim : number

    n_fotogramas : number
    v_angular : number
    v_horizontal : number
    v_vertical : number

    node_passada : NodeArmazem

    from_index : number
    to_index : number
    from_no : NodeArmazem
    to_no : NodeArmazem

    caminho : NodeArmazem[]
    raio_no : number
    berma : number
    ligacao_comprimento : number
    via_largura : number

    raio_f : number
    velocidade_A : number
    velocidade_B : number
    velocidade_C : number
    velocidade_D : number
    velocidade_E : number
    velocidade_F : number
    velocidade_factor : number

    camiao : THREE.Group

    is_active : boolean

    fase : Fases

    constructor(caminho : NodeArmazem[], node_passada : NodeArmazem, camiao : THREE.Group, raio_no : number, berma : number, ligacao_comprimento : number, via_largura : number, raio_f : number) {
        
        this.n_fotogramas_inicio = 500;
        this.n_fotogramas_fim = 500;
        
        this.n_fotogramas = this.n_fotogramas_inicio;
        this.v_angular = 0;
        this.v_horizontal = 0;
        this.v_vertical = 0;

        this.node_passada = node_passada

        this.from_index = -1
        this.to_index = 0
        this.from_no = caminho[this.from_index + 1]
        this.to_no = caminho[this.to_index + 1]

        this.caminho = caminho
        this.raio_no = raio_no
        this.berma = berma
        this.ligacao_comprimento = ligacao_comprimento
        this.via_largura = via_largura

        this.raio_f = raio_f
        this.velocidade_factor = 1
        this.velocidade_A = 0.001 * this.velocidade_factor
        this.velocidade_B = 0.001 * this.velocidade_factor
        this.velocidade_C = 0.01 * this.velocidade_factor
        this.velocidade_D = 0.1 * this.velocidade_factor
        this.velocidade_E = 0.01 * this.velocidade_factor
        this.velocidade_F = 0.001 * this.velocidade_factor

        this.camiao = camiao

        this.is_active = true

        this.fase = Fases.INICIO
    }

    mover() {
        this.n_fotogramas--
        if (this.n_fotogramas <= 0) {
            if (this.fase == Fases.FIM)
                this.is_active = false
            else
                this.proximo_movimento()
        }
    }

    preparar_movimento_A() {

        let hip = this.raio_no - this.berma + this.raio_f
        let cat = (this.via_largura / 2.0) - this.berma + this.raio_f
        let anguloRotacao = Math.acos(cat/hip)

        let vec_entrada = (new THREE.Vector3(this.from_no.x - this.node_passada.x, this.from_no.y - this.node_passada.y, 0)).normalize()    //Vector sobre o plano XY
        var orientacao_entrada = Math.atan2( vec_entrada.x, vec_entrada.y )   //Calcular Orientaçao

        let vec_saida = (new THREE.Vector3(this.to_no.x - this.from_no.x, this.to_no.y - this.from_no.y, 0)).normalize()  //Vector sobre o plano XY
        var orientacao_saida = Math.atan2( vec_saida.x, vec_saida.y )     //Calcular Orientaçao

        let angulo_arco = orientacao_entrada - orientacao_saida + (2.0 * anguloRotacao)

        //αjk - αij + θij + θjk
        if (angulo_arco < 0) {
            angulo_arco += 2.0 * Math.PI
        }
        if (angulo_arco > 2.0 * Math.PI) {
            angulo_arco -= 2.0 * Math.PI
        }

        let comprimento_arco = ((this.raio_no - this.berma) * angulo_arco)

        console.log("ANGULO = " + (angulo_arco * 180.0 / Math.PI) + ", RADS = " + angulo_arco + " ARCO = " + comprimento_arco + "\nFROM: " + this.from_no.designacao + " TO: " + this.to_no.designacao + " PASSADO: " + this.node_passada.designacao)

        this.n_fotogramas = Math.ceil(comprimento_arco / this.velocidade_A)
        this.v_angular = angulo_arco / this.n_fotogramas
        this.v_horizontal = 2.0 * (this.raio_no - this.berma) * Math.sin(angulo_arco/ this.n_fotogramas / 2.0)
        this.v_vertical = 0

        console.log("A, " + this.n_fotogramas + " " + this.raio_no + " " + this.berma)
    }

    preparar_movimento_B() {
        let hip = this.raio_no - this.berma + this.raio_f
        let cat_trans = (this.via_largura / 2.0) - this.berma + this.raio_f
        let angulo = Math.acos(cat_trans/hip)
        let comprimento_arco = this.raio_f * angulo

        this.n_fotogramas = Math.ceil(comprimento_arco / this.velocidade_B)
        this.v_angular = -angulo / this.n_fotogramas
        this.v_horizontal = 2.0 * this.raio_f * Math.sin(angulo / this.n_fotogramas / 2.0)
        this.v_vertical = 0

        console.log("B")
    }

    preparar_movimento_C() {
        let hip = this.raio_no - this.berma + this.raio_f
        let cat_trans = (this.via_largura / 2.0) - this.berma + this.raio_f
        let cat_long = Math.sqrt(Math.pow(hip, 2) - Math.pow(cat_trans, 2))
        let comprimento_percurso = this.ligacao_comprimento - cat_long
        
        this.n_fotogramas = Math.ceil(comprimento_percurso / this.velocidade_C)
        this.v_angular = 0
        this.v_horizontal = comprimento_percurso / this.n_fotogramas
        this.v_vertical = 0

        console.log("C")
    }

    preparar_movimento_D() {
        //Vector sobre o plano XY de um plano até o outro
        const vecXY = (new THREE.Vector3(this.from_no.getX() - this.to_no.getX(), this.from_no.getY() - this.to_no.getY(), 0)).normalize();

        //Orientaçao do caminho
        var orientacao = -Math.atan2( vecXY.x, vecXY.y );

        let rampaStart = new THREE.Vector3(
            this.from_no.x + (Math.sin(orientacao) * this.ligacao_comprimento), 
            this.from_no.y - (Math.cos(orientacao) * this.ligacao_comprimento), 
            this.from_no.z
        );

        //Obter o vetor para o centro do extremo exterior da entrada da segunda node
        let rampaEnd = new THREE.Vector3(
            this.to_no.x - (Math.sin(orientacao) * this.ligacao_comprimento), 
            this.to_no.y + (Math.cos(orientacao) * this.ligacao_comprimento), 
            this.to_no.z
        );

        let comprimento = rampaStart.distanceTo(rampaEnd)

        let rampaStartXY = new THREE.Vector3(
            this.from_no.x + (Math.sin(orientacao) * this.ligacao_comprimento), 
            this.from_no.y - (Math.cos(orientacao) * this.ligacao_comprimento), 
            0
        );

        let rampaEndXY = new THREE.Vector3(
            this.to_no.x - (Math.sin(orientacao) * this.ligacao_comprimento), 
            this.to_no.y + (Math.cos(orientacao) * this.ligacao_comprimento), 
            0
        );

        let comprimentoXY = rampaStartXY.distanceTo(rampaEndXY)

        this.n_fotogramas = Math.ceil(comprimento / this.velocidade_D)
        this.v_angular = 0  //movimento retilineo
        this.v_horizontal = comprimentoXY / this.n_fotogramas
        this.v_vertical = (rampaEnd.z - rampaStart.z) / this.n_fotogramas

        console.log("D")
    }

    preparar_movimento_E() {
        let hip = this.raio_no - this.berma + this.raio_f
        let cat_trans = this.via_largura / 2.0 - this.berma + this.raio_f
        let cat_long = Math.sqrt(Math.pow(hip, 2) - Math.pow(cat_trans, 2))
        let comprimento_percurso = this.ligacao_comprimento - cat_long
        
        this.n_fotogramas = Math.ceil(comprimento_percurso / this.velocidade_E)
        this.v_angular = 0
        this.v_horizontal = comprimento_percurso / this.n_fotogramas
        this.v_vertical = 0

        console.log("E")
    }

    preparar_movimento_F() {
        let hip = this.raio_no - this.berma + this.raio_f
        let cat_trans = this.via_largura / 2.0 - this.berma + this.raio_f
        let angulo = Math.acos(cat_trans/hip)
        let comprimento_arco = this.raio_f * angulo

        this.n_fotogramas = Math.ceil(comprimento_arco / this.velocidade_F)
        this.v_angular = -angulo / this.n_fotogramas
        this.v_horizontal = 2.0 * this.raio_f * Math.sin(angulo / this.n_fotogramas / 2.0)
        this.v_vertical = 0

        console.log("F")
    }

    preparar_movimento_fim(){
        this.n_fotogramas = this.n_fotogramas_fim
        this.v_angular = 0
        this.v_horizontal = 0
        this.v_vertical = 0
    }

    calcular_movimento() {
        switch(this.fase){
            case Fases.A: {
                if (this.to_index < this.caminho.length - 1) {
                    this.from_index++
                    this.to_index++
                    this.from_no = this.caminho[this.from_index]
                    this.to_no = this.caminho[this.to_index]
                    if(this.from_index != 0)
                        this.node_passada = this.caminho[this.from_index - 1]

                    this.preparar_movimento_A()
                }
                else {
                    this.preparar_movimento_fim()
                }
                break;
            }
            case Fases.B: {
                this.preparar_movimento_B()
                break;
            }
            case Fases.C: {
                this.preparar_movimento_C()
                break;
            }
            case Fases.D: {
                this.preparar_movimento_D()
                break;
            }
            case Fases.E: {
                this.preparar_movimento_E()
                break;
            }
            case Fases.F: {
                this.preparar_movimento_F()
                break;
            }
            case Fases.FIM: {
                this.preparar_movimento_fim()
                break;
            }
        }
    }

    proxima_fase() {
        switch(this.fase){
            case Fases.A: {
                this.fase = Fases.B
                break;
            }
            case Fases.B: {
                this.fase = Fases.C
                break;
            }
            case Fases.C: {
                this.fase = Fases.D
                break;
            }
            case Fases.D: {
                this.fase = Fases.E
                break;
            }
            case Fases.E: {
                this.fase = Fases.F
                break;
            }
            case Fases.F: {
                if (this.to_index < this.caminho.length - 1)
                    this.fase = Fases.A
                else 
                    this.fase = Fases.FIM
                break;
            }
            case Fases.INICIO: {
                this.fase = Fases.A
            }
        }
    }
    
    proximo_movimento() {
        this.proxima_fase()
        this.calcular_movimento()
    }
}