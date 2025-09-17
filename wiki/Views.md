# Views

## Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen-1995]](References.md#Kruchten-1995) propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

- Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
- Vista de processos: relativa ao fluxo de processos ou interações no sistema;
- Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
- Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
- Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown-2020]](References.md#Brown-2020)[[C4-2020]](References.md#C4-2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma:
- Nível 1: Descrição (enquadramento) do sistema como um todo;
- Nível 2: Descrição de contentores do sistema;
- Nível 3: Descrição de componentes dos contentores;
- Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [[UML-2020]](References.md#UML-2020) [[UMLDiagrams-2020]](References.md#UMLDiagrams-2020).

## Nível 1
### Vista Lógica

![N1-VL](diagramas/nivel1/VL-N1.svg)

### Vista de Processos
#### SSD UC1
![N1-VP-UC1](diagramas/nivel1/MGA/UC01__Criar_novo_Armaz%C3%A9m.svg)

#### SSD UC2
![N1-VP-UC2](diagramas/nivel1/MGA/UC02__Listar_Armaz%C3%A9ns.svg)

#### SSD UC3
![N1-VP-UC3](diagramas/nivel1/MGA/UC03__Editar_Armaz%C3%A9m.svg)

#### SSD UC4
![N1-VP-UC4](diagramas/nivel1/MGA/UC04__Criar_nova_Entrega.svg)

#### SSD UC5
![N1-VP-UC5](diagramas/nivel1/MGA/UC05__Listar_Entregas.svg)

#### SSD UC6
![N1-VP-UC6](diagramas/nivel1/MGA/UC06__Editar_Entrega.svg)

#### SSD UC7
![N1-VP-UC7](diagramas/nivel1/ML/UC07__Criar_novo_Cami%C3%A3o.svg)

#### SSD UC8
![N1-VP-UC8](diagramas/nivel1/ML/UC08__Listar_Cami%C3%B5es.svg)

#### SSD UC9
![N1-VP-UC9](diagramas/nivel1/ML/UC09__Editar_um_Cami%C3%A3o.svg)

#### SSD UC10
![N1-VP-UC10](diagramas/nivel1/ML/UC10__Criar_nova_Rota.svg)

#### SSD UC11
![N1-VP-UC11](diagramas/nivel1/ML/UC11__Listar_Rotas.svg)

#### SSD UC12
![N1-VP-UC12](diagramas/nivel1/ML/UC12__Editar_uma_Rota.svg)


## Nível 2
### Vista Lógica
![N2-VL](diagramas/nivel2/VL-N2.svg)

### Vista de Processos

#### SSD UC1
![N2-VP-UC1](diagramas/nivel2/MGA/UC01__Criar_novo_Armaz%C3%A9m.svg)

#### SSD UC2
![N2-VP-UC2](diagramas/nivel2/MGA/UC02__Listar_Armaz%C3%A9ns.svg)

#### SSD UC3
![N2-VP-UC3](diagramas/nivel2/MGA/UC03__Editar_Armaz%C3%A9m.svg)

#### SSD UC4
![N2-VP-UC4](diagramas/nivel2/MGA/UC04__Criar_nova_Entrega.svg)

#### SSD UC5
![N2-VP-UC5](diagramas/nivel2/MGA/UC05__Listar_Entregas.svg)

#### SSD UC6
![N2-VP-UC6](diagramas/nivel2/MGA/UC06__Editar_Entrega.svg)

#### SSD UC7
![N2-VP-UC7](diagramas/nivel2/ML/UC07__Criar_novo_Cami%C3%A3o.svg)

#### SSD UC8
![N2-VP-UC8](diagramas/nivel2/ML/UC08__Listar_Cami%C3%B5es.svg)

#### SSD UC9
![N2-VP-UC9](diagramas/nivel2/ML/UC09__Editar_um_Cami%C3%A3o.svg)

#### SSD UC10
![N2-VP-UC10](diagramas/nivel2/ML/UC10__Criar_nova_Rota.svg)

#### SSD UC11
![N2-VP-UC11](diagramas/nivel2/ML/UC11__Listar_Rotas.svg)

#### SSD UC12
![N2-VP-UC12](diagramas/nivel2/ML/UC12__Editar_uma_Rota.svg)

### Vista de Implementação
![N2-VL](diagramas/nivel2/VI-N2.svg)

### Vista Física
![N2-VL](diagramas/nivel2/VF-N2.svg)

## Nível 3
### Vista Lógica (ML)
![N3-VL-ML](diagramas/nivel3/VL-N3-ML.svg)

### Vista Lógica (MGA)
![N3-VL-MGA](diagramas/nivel3/VL-N3-MGA.svg)

### Vista de Implementação(ML/MGA)
![N3-VI-ML-MGA](diagramas/nivel3/VI-N3.svg)

### Vista Lógica (SPA)
![N3-VL-SPA](diagramas/nivel3/VL-N3-SPA.svg)

### Vista de Implementação(SPA)
![N3-VI-ML-MGA](diagramas/nivel3/VI-N3-SPA.svg)

### Vista de Processos

#### SD UC1
![N3-VP-UC1](diagramas/nivel3/MGA/UC01__Criar_novo_Armaz%C3%A9m.svg)

#### SD UC2
![N3-VP-UC2](diagramas/nivel3/MGA/UC02__Listar_Armaz%C3%A9ns.svg)

#### SD UC3
![N3-VP-UC3](diagramas/nivel3/MGA/UC03__Editar_Armaz%C3%A9m.svg)

#### SD UC4
![N3-VP-UC4](diagramas/nivel3/MGA/UC04__Criar_nova_Entrega.svg)

#### SD UC5
![N3-VP-UC5](diagramas/nivel3/MGA/UC05__Listar_Entregas.svg)

#### SD UC6
![N3-VP-UC6](diagramas/nivel3/MGA/UC06__Editar_Entrega.svg)

#### SD UC7
![N3-VP-UC7](diagramas/nivel3/ML/UC07__Criar_novo_Camiao.svg)

#### SD UC8
![N3-VP-UC8](diagramas/nivel3/ML/UC08__Listar_Cami%C3%B5es.svg)

#### SD UC9
![N3-VP-UC9](diagramas/nivel3/ML/UC09__Editar_um_Cami%C3%A3o.svg)

#### SD UC10
![N3-VP-UC10](diagramas/nivel3/ML/UC10__Criar_nova_Rota.svg)

#### SD UC11
![N3-VP-UC11](diagramas/nivel3/ML/UC11__Listar_Rotas.svg)

#### SD UC12
![N3-VP-UC12](diagramas/nivel3/ML/UC12__Editar_uma_Rota.svg)

#### SD US13
![N3-VP-US13](diagramas/nivel3/SPA/US13__Como_gestor_de_armazens_pretendo_criar_um_Armazem.svg)

#### SD US14
![N3-VP-US14](diagramas/nivel3/SPA/US14__Como_gestor_de_armazens_pretendo_listar_Armazens.svg)

#### SD US15
![N3-VP-US15](diagramas/nivel3/SPA/US15__Como_gestor_de_armazens_pretendo_editar_um_Armazem.svg)

#### SD US16
![N3-VP-US16](diagramas/nivel3/SPA/US16__Como_gestor_de_armaz%C3%A9m_pretendo_criar_uma_entrega.svg)

#### SD US17
![N3-VP-US17](diagramas/nivel3/SPA/US17__Como_gestor_de_armaz%C3%A9ns_pretendo_listar_Entregas.svg)

#### SD US18
![N3-VP-US18](diagramas/nivel3/SPA/US18__Como_gestor_de_armaz%C3%A9ns_pretendo_Editar_Entrega.svg)

#### SD US19
![N3-VP-US19](diagramas/nivel3/SPA/US19__Como_gestor_de_frota_pretendo_Criar_um_Cami%C3%A3o.svg)

#### SD US20
![N3-VP-US20](diagramas/nivel3/SPA/US20__Como_gestor_de_log%C3%ADstica_pretendo_listar_Cami%C3%B5es.svg)

#### SD US21
![N3-VP-US21](diagramas/nivel3/SPA/US21__Como_gestor_de_frota_pretendo_Editar_Cami%C3%A3o.svg)

#### SD US22
![N3-VP-US22](diagramas/nivel3/SPA/US22__Como_gestor_de_logística_pretendo_criar_um_percurso_entre_dois_armazéns.svg)

#### SD US23
![N3-VP-US23](diagramas/nivel3/SPA/US23__Como_gestor_de_logística_pretendo_listar_percursos_entre_armazéns.svg)

#### SD US24
![N3-VP-US24](diagramas/nivel3/SPA/US24__Como_gestor_de_frota_pretendo_editar_um_percurso_entre_dois_armazéns.svg)

#### SD US25(SPA)
![N3-VP-US25-SPA](diagramas/nivel3/SPA/US25__Obter_o_planeamento_da_rota_para_1_cami%C3%A3o_e_1_dado_dia__SPA_.svg)

#### SD US25(Logistica)
![N3-VP-US25-ML](diagramas/nivel3/SPA/US25__Obter_o_planeamento_da_rota_para_1_cami%C3%A3o_e_1_dado_dia__Logistica_.svg)
