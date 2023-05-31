import { Component, AfterViewInit } from '@angular/core';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { LinearEncoding, sRGBEncoding, Vector3 } from 'three';
import { ArcoArmazem, NodeArmazem } from './dados';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CirculoNo } from './circulo-no';
import { ElementoLigacao } from './elemento-ligacao';
import { Rampa } from './rampa';
import GUI from 'lil-gui';
import { Router } from '@angular/router';
import { ArmazemService } from '../services/armazem.service';
import { DadosDefault } from './dados-default';

//Post-Processing Imports
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ArmazemLabel } from './label';
import { ArmazemPlataforma } from './plataforma';
import { Fases, Movimento } from './movimento';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-rede-viaria',
    templateUrl: './rede-viaria.component.html',
    styleUrls: ['./rede-viaria.component.css']
  })
export class RedeViariaComponent implements AfterViewInit {
  name = 'Angular';

  truck: THREE.Group = new THREE.Group;

  constructor(private router: Router,private armazemService: ArmazemService) { }

  jwtService: JwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    var token = localStorage.getItem('UserToken');
    var role = localStorage.getItem('Role');
    var isTokenExpired = this.jwtService.isTokenExpired(token);
    console.log(isTokenExpired);
    if(isTokenExpired){
      alert('A sua sessão expirou.');
      localStorage.setItem('UserToken','');
      localStorage.setItem('Role','');
      window.location.href='home';
    }else{
    if(role!='GF'){
      alert('You dont have acess to this page');
      window.location.href='logout';
    }
    }
    
  }

  async ngAfterViewInit() { 

    let component: RedeViariaComponent = this;

    //Dados:
    const V_LARGURA = 0.15;      // Largura das vias
    const INFINITESIMO = 0.003;
    const K_CIRCULO = 2.1;      // Constante de multiplicacao do circulo
    const K_LIGACAO = 1.5;      // Constante de multiplicacao do comprimento do elemento de ligacao, 1.1
    const K_ESCALA = 0.008;
    const K_DISTANCIA = 0.27;
    const K_ARMAZEM_HEIGHT = 25;
    const K_PLATAFORMA_WIDTH = 0.25;
    const K_PLATAFORMA_LENGTH = 0.40;
    const K_CHAR_WIDTH = 40;
    const K_CAMIAO_ESCALA = 0.008;
    const K_BERMA = 0.3;
    const K_ALTURA_CAMIAO = 0.044;
    const RAIO_F = 0.15

    const circuloRaio = K_CIRCULO * V_LARGURA / 2.0;
    const berma = V_LARGURA * K_BERMA;

    const ligacaoComprimento = K_LIGACAO * circuloRaio;
    const distanciaArmazem = K_CIRCULO * K_DISTANCIA;
    const cameraDistance = 0.2;

    let truck_exists = false

    //Dados
    const data = new DadosDefault();
    //const data = new Dados(this.armazemService);
    //await delay(1000);
    //data.addArcos();
    const dataNodes = data.getNodes();
    const dataArcos = data.getArcos();

    //Truck Variables  
    let camiao_caminho = [dataNodes[0], dataNodes[6], dataNodes[0], dataNodes[6], dataNodes[11], dataNodes[9], dataNodes[0]]
    let dir = 0;
    let a = new THREE.Vector3;
    let b = new THREE.Vector3;
    let cameraDir = new THREE.Vector3;
    let truckCameraActive = false;
    
    //Criar a scene
    const scene = new THREE.Scene();
    scene.up = new Vector3(0, 0, 1);

    //Camera Settings
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.up = scene.up;

    //Truck Camera Settings
    const truck_camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
    truck_camera.up = scene.up;
    truck_camera.position.set( cameraDistance / 2.5, cameraDistance / 2.5, K_ALTURA_CAMIAO * 2 );
    truck_camera.lookAt( scene.position );
    const goal = new THREE.Object3D;
    const follow = new THREE.Object3D;
    goal.position.z = -cameraDistance;
    goal.add( truck_camera );

    //Board
    let board = document.body.children[0].children[0];

    //Renderer
    const renderer = createRenderer();

    const gui = new GUI();

    //Post-Processing
    const composer = new EffectComposer( renderer );

    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    const glitchPass = new GlitchPass();
    composer.addPass( glitchPass );

    //Orbit Controls
    const controls = new OrbitControls( camera, renderer.domElement );
    camera.position.set( 100, 20, 100 );
    controls.update();
    
    const router = this.router;

    window.addEventListener( 'resize', onWindowResize, false );

    let ligacaoMap = new Map<NodeArmazem, Array<THREE.Mesh>>();

    //Scene Setup
    let debugObject = {
      phase: "A",
      remaining_frames: 0,
    };
    let entregaObject = {
      rota: "4,7,3,12,14,16,3,4",
      begin: function() { 
        begin()
      }
    };
    addGUI();
    addSkybox();
    addLight();

    //Rede Setup
    drawNodes();  //Gerar, adicionar e posicionar os nós da rede viaria
    drawVias();   //Gerar, adicionar e posicionar as vias da rede viaria
    let node_passada : NodeArmazem = dataNodes[0]
    let truck_start = truckStart(camiao_caminho[0], camiao_caminho[1])
    drawArmazens();

    let movimento = new Movimento(camiao_caminho, node_passada, this.truck, circuloRaio, berma, ligacaoComprimento, V_LARGURA, RAIO_F)
    
    render();

    /** Cria um loop que leva o renderer a desenhar a scene sempre que o ecra é refreshed */
    function render() {
      requestAnimationFrame( render );

      controls.update();
      onWindowResize();

      if (truck_exists) {
        if (!movimento.is_active) {
          truck_exists = false
          component.truck.remove()
          truckCameraActive = false
        }
        
        movimento.camiao = component.truck
        movimento.mover()
  
        dir += movimento.v_angular

        component.truck.rotation.z = dir + (Math.PI / 2)

        component.truck.position.set(
          component.truck.position.x + movimento.v_horizontal * Math.cos(dir),
          component.truck.position.y + movimento.v_horizontal * Math.sin(dir),
          component.truck.position.z + movimento.v_vertical
        )
  
        debugObject.phase = movimento.fase.toString();
        debugObject.remaining_frames = movimento.n_fotogramas;
  
        a.lerp(component.truck.position, 0.7);
        b.copy(goal.position);
  
        cameraDir.copy( a ).sub( b ).normalize();
        const dis = a.distanceTo( b ) - cameraDistance;
        goal.position.addScaledVector( cameraDir, dis );
        //temp.setFromMatrixPosition(goal.matrixWorld);
        
        //camera.position.lerp(temp, 0.2);
        truck_camera.lookAt( component.truck.position );
      
      }


      if (truckCameraActive)
      {  renderer.render( scene, truck_camera );  }
      else
      {  renderer.render( scene, camera );  }
    };

    function addTruck(start_pos : THREE.Vector3) {
      const gltfLoader = new GLTFLoader();

      gltfLoader.load('assets/models/Truck.gltf', (gltf) => {
        component.truck = gltf.scene;
        component.truck.scale.set(K_CAMIAO_ESCALA,K_CAMIAO_ESCALA,K_CAMIAO_ESCALA);
        setTruck(start_pos);

        scene.add(component.truck);
      });
    }

    function setTruck(start_pos : THREE.Vector3) {
      component.truck.position.set(
        start_pos.x, 
        start_pos.y, 
        start_pos.z
      );
    }

    function truckStart(node : NodeArmazem, next_node : NodeArmazem) : THREE.Vector3 {
      dataArcos.forEach(function (arco) {
        if (arco.getNode1().designacao == node.designacao) {
          node_passada = arco.getNode2()
        }
        else if (arco.getNode2().designacao == node.designacao) {
          node_passada = arco.getNode1()
        }
      })

      let hip = circuloRaio - berma + RAIO_F
      let cat = V_LARGURA / 2.0 - berma + RAIO_F
      let anguloRotacao = Math.acos(cat/hip)

      let vec_entrada = (new THREE.Vector3(node.x - node_passada.x, node.y - node_passada.y, 0)).normalize()    //Vector sobre o plano XY
      var orientacao_entrada = Math.atan2( vec_entrada.x, vec_entrada.y )   //Calcular Orientaçao

      let vec_saida = (new THREE.Vector3(next_node.x - node.x, next_node.y - node.y, 0)).normalize()  //Vector sobre o plano XY
      var orientacao_saida = Math.atan2( vec_saida.x, vec_saida.y )     //Calcular Orientaçao

      dir = -orientacao_entrada + ((Math.PI / 2) - anguloRotacao)

      //αjk - αij + θij + θjk
      if (dir < 0) {
        dir += 2.0 * Math.PI
      }
      if (dir > 2.0 * Math.PI) {
        dir -= 2.0 * Math.PI
      }

      console.log("Position Start Angle: " + (dir * 180.0 / Math.PI) +
      "\nAngulo Rotacao = " + (anguloRotacao * 180.0 / Math.PI) + 
      "\nComplemento = " + (((Math.PI / 2) - anguloRotacao) * 180.0 / Math.PI) + 
      "\nOrientacao Entrada = " + (orientacao_entrada * 180.0 / Math.PI) + 
      "\nOrientacao Saida = " + (orientacao_saida * 180.0 / Math.PI) +
      "\nPassada = " + node_passada.designacao + 
      "\nInicio = " + node.designacao + 
      "\nProxima = " + next_node.designacao)

      return new Vector3(
        node.getX() + (circuloRaio - berma) * Math.sin(dir), 
        node.getY() - (circuloRaio - berma) * Math.cos(dir), 
        node.getZ() + (K_ALTURA_CAMIAO / 2)
      )
    }

    function truck_init() {

      node_passada = dataNodes[0]
      truck_start = truckStart(camiao_caminho[0], camiao_caminho[1])

      //Camiao Setup
      addTruck(truck_start);

      movimento = new Movimento(camiao_caminho, node_passada, component.truck, circuloRaio, berma, ligacaoComprimento, V_LARGURA, RAIO_F)
    
      truck_exists = true

      truckCameraActive = true
    }

    function begin() {

      let valid = true

      let rota = entregaObject.rota.toString()

      let nos = rota.split(",")

      if (nos.length < 2)
        valid = false

      let no_nums = new Array<number>()

      nos.forEach((no) => {
        if (typeof no != "string") {
          valid = false
        }
        else if (!isNaN(parseFloat(no.trim()))) {
          no_nums.push(parseFloat(no.trim()))
        }
        else {
          valid = false
        }
      })

      let novo_caminho = new Array<NodeArmazem>()

      if (valid) {
        no_nums.forEach((num) => {
          if (num < dataNodes.length) {
            novo_caminho.push(dataNodes[num])
            console.log(dataNodes[num].designacao)
          }
          else
            valid = false
        })
      }
      else
        console.log("ERROR")

      if (valid){
        camiao_caminho = novo_caminho
        movimento.caminho = camiao_caminho
        truck_init()
      }
      else
        console.log("ERROR")
    }







    /** Adiciona luz à cena */
    function addLight(){
      const light = new THREE.AmbientLight( 0xffffff , 0.5); // soft white light
      light.castShadow = true;
      scene.add( light );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.left = -20;
      directionalLight.shadow.camera.right = 20;
      directionalLight.shadow.camera.top = 20; 
      directionalLight.shadow.camera.bottom = -20;
      directionalLight.position.set(-30, 2, 60);
      //directionalLight.target.position.set(50, 50, 50);
      scene.add( directionalLight );

      /*
      const cameraHelper =
        new THREE.CameraHelper(directionalLight.shadow.camera);
      scene.add(cameraHelper);
      */
    }

    /** Adiciona GUI com as opcoes desejadas */
    function addGUI() {

      gui.title("Opções");

      const cameraFolder = gui.addFolder("Camera");

      cameraFolder.add(controls, 'zoomSpeed', 0, 1).name('Zoom Speed');
      cameraFolder.add(controls, 'panSpeed', 0, 1).name('Pan Speed');
      cameraFolder.add(controls, 'rotateSpeed', 0, 1).name('Rotate Speed');

      let nodeNames = new Array<string>;

      nodeNames.push("Default");
      nodeNames.push("Camiao");

      for (let i = 0; i < dataNodes.length; i++){
        nodeNames.push(dataNodes.at(i)!.designacao);
      }

      const guiObject = {
        targetNode: "Default",
        backFunction: function() { 
          gui.destroy();
          board.removeChild( renderer.domElement );
          router.navigate(['/', 'logout']); //Go to home when exiting
        }
      };

      cameraFolder.add( guiObject, 'targetNode', nodeNames )
        .name("Look At")
        .onChange(() => {
          if (guiObject.targetNode == "Default") {
            controls.target.set(0, 0, 0);
            camera.position.set( 100, 20, 100 );
            truckCameraActive = false;
          }
          else if (guiObject.targetNode == "Camiao" && component.truck != null) {
            truckCameraActive = true;
          }
          else {
            let index = nodeNames.indexOf(guiObject.targetNode);
            let node = dataNodes.at(index - 2);
            camera.position.set( node!.x + 1, node!.y, node!.z + 0.5);
            controls.target.set( node!.x, node!.y, node!.z );
            truckCameraActive = false;
          }
        }
      );

      cameraFolder.close();

      const entregaFolder = gui.addFolder("Entregas");

      entregaFolder.add( entregaObject, 'rota' ).name("Rota")
      entregaFolder.add( entregaObject, 'begin' ).name("Iniciar")

      const debugFolder = gui.addFolder("Debug");

      debugFolder.add( debugObject, 'phase' )
        .name("Fase")
        .listen()
        .disable();

      debugFolder.add( debugObject, 'remaining_frames' )
        .name("Fotogramas Restantes")
        .listen()
        .disable();

      debugFolder.close();
    
      gui.add( guiObject, 'backFunction' ).name("<b>✖ Sair da Rede Viária</b>");
    }

    /** Gerar, adicionar e posicionar os nós da rede viaria */
    function drawNodes() {
      dataNodes.forEach(function (node) 
      {
        //Criar objeto CirculoNo
        var circulo = new CirculoNo(circuloRaio, V_LARGURA);   

        //Obter, adicionar à scene e posicionar as Nodes
        var circuloMesh = circulo.mesh;
        scene.add( circuloMesh );
        circuloMesh.position.set(node.getX(), node.getY(), node.getZ() + INFINITESIMO);
      });
    }

    /** Gerar, adicionar e posicionar as vias (entradas e rampas) da rede viaria */
    function drawVias(){
      dataArcos.forEach(function (arco) 
      {
        //Obter nós do arco a desenhar
        const node1 = arco.node1, node2 = arco.node2;
  
        //Vector sobre o plano XY de um plano até o outro
        const vecXY = (new THREE.Vector3(node1.getX() - node2.getX() , node1.getY() - node2.getY(), 0)).normalize();

        //Orientaçao do caminho
        var orientacao = -Math.atan2( vecXY.x, vecXY.y );

        drawLigacao(node1, node2, orientacao);
        drawRampa(node1, node2, orientacao);
      });
    }

    /** Gerar, adicionar e posicionar/rodar os elementos de ligacao de uma via da rede viaria
     * 
     * @param node1 Primeira node da via em consideracao
     * @param node2 Segunda node da via em consideracao
     * @param orientacao Angulo de rotacao do vetor sobre o plano XY
     */
    function drawLigacao(node1: NodeArmazem, node2: NodeArmazem, orientacao: number)
    {
      //Criar e adicionar dois elementos de ligacao
      var elemento1 = new ElementoLigacao(V_LARGURA, ligacaoComprimento);
      var elemento2 = new ElementoLigacao(V_LARGURA, ligacaoComprimento);

      //Criar e adicionar dois planos
      var elementoMesh1 = elemento1.mesh;
      var elementoMesh2 = elemento2.mesh;
      scene.add( elementoMesh1 );
      scene.add( elementoMesh2 );

      //Set da posicao e rotacao do primeiro plano
      elementoMesh1.position.set(
        node1.getX() + (Math.sin(orientacao) * (ligacaoComprimento / 2)), 
        node1.getY() - (Math.cos(orientacao) * (ligacaoComprimento / 2)), 
        node1.getZ()
      );
      elementoMesh1.rotation.set(0, 0, orientacao);

      //Set da posicao e rotacao do segundo plano
      elementoMesh2.position.set(
        node2.getX() - (Math.sin(orientacao) * (ligacaoComprimento / 2)), 
        node2.getY() + (Math.cos(orientacao) * (ligacaoComprimento / 2)), 
        node2.getZ()
      );
      elementoMesh2.rotation.set(0, 0, orientacao);

      if(!ligacaoMap.has(node1)){
        let array = new Array<THREE.Mesh>();
        array.push(elementoMesh1);
        ligacaoMap.set(node1, array);
      }
      else {
        let array = ligacaoMap.get(node1);
        array!.push(elementoMesh1);
        ligacaoMap.set(node1, array!);
      }

      if(!ligacaoMap.has(node2)){
        let array = new Array<THREE.Mesh>();
        array.push(elementoMesh2);
        ligacaoMap.set(node2, array);
      }
      else {
        let array = ligacaoMap.get(node2);
        array!.push(elementoMesh2);
        ligacaoMap.set(node2, array!);
      }
    }

    /** Gerar, adicionar e posicionar/rodar a rampa de uma via da rede viaria
     * 
     * @param node1 Primeira node da via em consideracao
     * @param node2 Segunda node da via em consideracao
     * @param orientacao Angulo de rotacao do vetor sobre o plano XY
     */
    function drawRampa(node1: NodeArmazem, node2: NodeArmazem, orientacao: number)
    {
      var rampa = new Rampa(
        node1.getVector3(), 
        node2.getVector3(), 
        ligacaoComprimento, 
        V_LARGURA, 
        orientacao
      );

      //Criacao e adicao da mesh da rampa à scene
      const rampaMesh = rampa.mesh;
      scene.add( rampaMesh );
    }

    /** Ler o modelo, adicionar e posicionar/rodar dos armazens à via da rede viaria */
    function drawArmazens(){

      dataNodes.forEach(function (node) {

        let arrayAngulos = new Array<number>();

        //Popular array de angulos dos elementos de ligacao
        for (let entry of ligacaoMap.entries()) {
          if(entry[0] == node){
            for (let mesh of ligacaoMap.get(node)!) {
      
              let vec = (new THREE.Vector3(node.x - mesh.position.x, node.y - mesh.position.y, 0)).normalize(); //Vector sobre o plano XY

              var orientacao = -Math.atan2( vec.x, vec.y );   //Calcular Orientaçao

              //Se angulo for menor que 0, adicionar 360 graus
              if (orientacao < 0){
                orientacao += Math.PI*2;
              }

              arrayAngulos.push(orientacao);  //Adicionar orientacao
            }
          }     
        }

        arrayAngulos.sort((n1,n2) => n1 - n2);  //Ordena o array do angulo menor para o maiorDifrenca

        let orientacaoArmazem = 0;

        let arrayDiferencas = new Array<number>();  

        if (arrayAngulos.length == 0) {
          orientacaoArmazem = Math.PI;
        }
        //Se apenas houver um elemento de ligacao
        else if (arrayAngulos.length == 1) {
          orientacaoArmazem = arrayAngulos[0] + Math.PI;
        }
        //Se houver mais que um elemento de ligacao
        else {
          let a1 = 0;
          let a2 = 1;
          do {
            let diferenca = arrayAngulos[a2] - arrayAngulos[a1];  //Diferenca emtre o segundo angulo e o primeiro
          
            //Se angulo for menor que 0, adicionar 360 graus
            if (diferenca < 0) {
              diferenca += Math.PI*2;
            }

            arrayDiferencas.push(diferenca)

            a1++;
            //Para garantir que se avalia o ultimo com o primeiro
            if (a2 == arrayAngulos.length - 1)
              a2 = 0;
            else 
              a2++;

          } while (a2 != 1)

          let maiorDifrenca = 0;
          let anguloAte = 0;

          //Obter maior diferenca e o primeiro angulo considerado nessa diferenca
          for (let i = 0; i < arrayDiferencas.length; i++){
            if (arrayDiferencas[i] > maiorDifrenca) {
              maiorDifrenca = arrayDiferencas[i];
              anguloAte = arrayAngulos[i];
            }
          }

          orientacaoArmazem = anguloAte + (maiorDifrenca/2);  //angulo do armazem
        }

        let width = node.designacao.length * (K_CHAR_WIDTH - (9 / node.designacao.length * node.designacao.length));

        let labelSprite = new ArmazemLabel(width, 60, node.designacao).labelSprite;

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('assets/models/Warehouse.gltf', (gltf) => {
          const root = gltf.scene;

          root.traverse(function(node) {
            if(node instanceof THREE.Mesh)
              node.castShadow = true;
          })

          scene.add(root);
          root.scale.set(K_ESCALA,K_ESCALA,K_ESCALA); //Mudar a escala do armazem
          //Posicionar o armazem
          root.position.set(
            node.getX() + (Math.sin(orientacaoArmazem) * (distanciaArmazem / 2)), 
            node.getY() - (Math.cos(orientacaoArmazem) * (distanciaArmazem / 2)), 
            node.getZ()
          );
          root.rotation.set(0, 0, orientacaoArmazem); //Rodar armazem para a node

          let plataforma = new ArmazemPlataforma(K_PLATAFORMA_WIDTH, K_PLATAFORMA_LENGTH).mesh;
          scene.add(plataforma);
          plataforma.position.set(
            node.getX() + (Math.sin(orientacaoArmazem) * (K_PLATAFORMA_LENGTH / 2)), 
            node.getY() - (Math.cos(orientacaoArmazem) * (K_PLATAFORMA_LENGTH / 2)), 
            node.getZ()
          );
          plataforma.rotation.set(0, 0, orientacaoArmazem); //Rodar plataforma para a node 

          scene.add(labelSprite);
          labelSprite.position.set(
            node.getX() + (Math.sin(orientacaoArmazem) * (distanciaArmazem / 2)), 
            node.getY() - (Math.cos(orientacaoArmazem) * (distanciaArmazem / 2)), 
            node.getZ() + K_ESCALA * K_ARMAZEM_HEIGHT
          );
          root.rotation.set(0, 0, orientacaoArmazem); //Rodar armazem para a node 
        });
      });
    }

    function onWindowResize() {
      console.log('reszing');
      const newAspect = board.clientWidth / board.clientHeight;
     
      camera.aspect = newAspect;
      truck_camera.aspect = newAspect;
      
      camera.updateProjectionMatrix();
      truck_camera.updateProjectionMatrix();
      
      renderer.setSize(board.clientWidth, board.clientHeight);
    }
    
    function createRenderer() : THREE.WebGLRenderer {
      let new_renderer = new THREE.WebGLRenderer();

      new_renderer.setSize( board.clientWidth, board.clientHeight );
      //renderer.toneMapping = THREE.ReinhardToneMapping;
      new_renderer.outputEncoding = THREE.sRGBEncoding;
      new_renderer.setPixelRatio(window.devicePixelRatio);
      new_renderer.shadowMap.enabled = true;
      //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
      //Criar canvas sobre toda a area util do browser
      new_renderer.domElement.style.background = "black";
      new_renderer.domElement.style.width = "100%";
      new_renderer.domElement.style.height = "100%";
      new_renderer.domElement.style.overflow = "hidden";
      new_renderer.domElement.style.position = "absolute";
      new_renderer.domElement.style.top = "0";
      new_renderer.domElement.style.left = "0";
      new_renderer.domElement.style.zIndex = "10";
  
      board.appendChild( new_renderer.domElement );

      return new_renderer
    }

    function addSkybox() {
      const loader = new THREE.CubeTextureLoader();
      const texture = loader.load([
        'assets/skybox/neg-x.bmp',
        'assets/skybox/pos-x.bmp',
        'assets/skybox/neg-z.bmp',
        'assets/skybox/pos-z.bmp',
        'assets/skybox/pos-y.bmp',
        'assets/skybox/neg-y.bmp',
      ]);
      texture.encoding = THREE.sRGBEncoding;
      scene.background = texture;
    }
  }
}