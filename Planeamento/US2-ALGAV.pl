% Facto inicial que recebe como argumento duas variaveis, a primeira
% retorna o Tempo que demora a rota mais rapida e o segundo essa rota.
rota_tempo_min(Custo,LAF):-(run();true),tempo_min(LAF,Custo).

% Cria o facto tempo_min com um valor de 100000 no segundo
% argumento e chama o tempo_percurso que
% vai calcular o percurso mais rapido.
run():- retractall(tempo_min(_,_)), assertz(tempo_min(_,100000)),tempo_percurso().

% Este predicado usa o metodo massa_entrega para calcular a
% massa das entregas que vao ser colocadas no camiao, depois vai
% buscar a energia total da bateria,a seguir pega em uma
% trajetoria e chama o predicado tempo_total para calcular o tempo que o
% percurso demora, quando termina vai chamar o predicado atualiza que
% vai atualizar o Custo e o caminho do facto tempo_min caso o custo seja
% menor que o anterior, por fim, tem um fail para através do
% backtracking ser usado outro percurso até nao haver mais percursos.
tempo_percurso():-massa_entrega(MassaT),carateristicasCam(_,_,_,Energia,_,_),trajetorias(_,Armazens),tempo_total(Armazens,Custo,MassaT,Energia),atualiza(Armazens,Custo),fail.

% Calcula a massa total de todas as entregas a ser feitas.
massa_entrega(MassaT):-findall(Massa,entrega(_,_,Massa,_,_,_),ListaMassas),soma_massa(ListaMassas,MassaT).
soma_massa([],0).
soma_massa([Massa|ListaMassas],MassaT):-soma_massa(ListaMassas,MassaT1),MassaT is MassaT1+Massa.

% Um loop percorrendo a lista de armazens que vao ser
% visitados pelo camiao, a cada iteracao calcula-se o tempo que
% demora a fazer a viagem, depois adiciona-se ao tempo os devidos
% tempos de carregamento de energia do camiao ou descarga de entregas,
% a seguir remove-se a massa da entrega feita no armazem e o
% o loop repete-se para todo o caminho a ser percorrido, no fim do loop
% soma-se o tempo que demorou a percorrer a rota completa.
tempo_total([_],0,_,_).
tempo_total([C1,C2|LC],Custo,MassaT,Energia):-dadosCam_t_e_ta(_,C1,C2,Tempo,_,_)
                                              ,calculatempo(MassaT,Tempo,NovoTempo),
                                              energia_suficiente(MassaT,NovoTempo,NovoTempo2,Energia,CargaRetorno,C1,C2)
                                              ,remover_massa_entrega(C2,MassaT,MassaT1),
                                              tempo_total([C2|LC],Custo1,MassaT1,CargaRetorno),!,Custo is Custo1+NovoTempo2.

% Faz uma regra de 3 simples que calcula o tempo que o camiao demora a
% ir de um armazï¿½m a outro com o peso atual.
calculatempo(MassaT,Tempo,NovoTempo):-carateristicasCam(_,Tara,Capacidade,_,_,_),MassaCamiaoCheio is Tara+Capacidade,
    MassaCamiao is Tara+MassaT,TempoNormal is MassaCamiao*Tempo,NovoTempo is TempoNormal/MassaCamiaoCheio.


% Apos a busca e calculo de alguns dados, calcula-se a
% energia que vai ser gasta no caminho, se o camiao tiver energia
% suficiente para fazer a viagem, adiciona o tempo de fazer a descarga
% da entrega no armazem em que se encontra e retorna a energia com que
% o camiao chega ao proximo armazem, no caso de nao ter energia
% o suficiente, verifica se a percentagem de bateria esta a baix menor
% de 80, se sim carrega ate 80 e verifica se esta maior o tempo de
% descarga ou de carregamento da bateria para adicionar ao tempo final,
% no caso de mesmo assim nao conseguir fazer o caminho, adiciona ao
% tempo total o tempo de carregamento extra e retorna a 20% a energia
% com que o camiao chega ao proximo armazem.
energia_suficiente(MassaT,NovoTempo,NovoTempo2,Energia,CargaRetorno,C1,C2):-carateristicasCam(_,Tara,Capacidade,CargaTotal,_,TempoRecarregar),
    dadosCam_t_e_ta(_,C1,C2,_,CargaGasta,CargaAdicional),
    Carga20percent is CargaTotal*(0.2),Carga80percent is CargaTotal*(0.8),
    calculaenergia(Tara,Capacidade,MassaT,CargaGasta,NovaCarga),
    CargaAtual is Energia-NovaCarga,
    (C1==5,TempoDesc=0;entrega(_,_,_,C1,_,TempoDesc)),
    (energia_chega(CargaAtual,Carga20percent,NovoTempo,NovoTempo2,TempoDesc,CargaRetorno)
    ;(carregar_energia_80(Energia,Carga80percent,Carga20percent,TempoRecarregar,TempoDesc,NovoTempo,NovoTempo3),
     tempo_extra(Carga80percent,Carga20percent,NovoTempo2,NovoTempo3,CargaAdicional,NovaCarga,CargaRetorno)
     ;tempo_extra2(Energia,Carga20percent,NovoTempo,NovoTempo2,CargaAdicional,NovaCarga,CargaRetorno))).

% Faz uma regra de 3 simples que calcula a energia que o camiao gasta a
% ir de um armazem a outro com o peso atual.
calculaenergia(Tara,Capacidade,MassaT,CargaGasta,NovaCarga):- MassaCamiaoCheio is Tara+Capacidade,
    MassaCamiao is Tara+MassaT,
    CargaNormal is MassaCamiao*CargaGasta,NovaCarga is CargaNormal/MassaCamiaoCheio.

% Caso a energia seja suficiente para fazer o caminho, adiciona ao
% tempo a descarga da entrega e retorna a energia com que o camiao chega
% ao armazem.
energia_chega(CargaAtual,Carga20percent,NovoTempo,NovoTempo2,TempoDesc,CargaRetorno):-CargaAtual>Carga20percent,NovoTempo2 is NovoTempo+TempoDesc,CargaRetorno is CargaAtual.

% Caso a energia atual seja menor que 80, o camiao vai ser carregado
% ate 80% de energia, e vai ser retornado o tempo de carregamento ou o
% tempo de descarga, dependendo de qual o maior.
carregar_energia_80(Energia,Carga80percent,Carga20percent,TempoRecarregar,TempoDesc,NovoTempo,NovoTempo3):-Energia<Carga80percent,
    Cargapossivel is Carga80percent-Carga20percent,
    CargaFalta is Carga80percent-Energia,
    Aux is CargaFalta*TempoRecarregar,TempoCarregamento is Aux/Cargapossivel,
    (TempoCarregamento<TempoDesc,NovoTempo3 is NovoTempo+TempoDesc;NovoTempo3 is NovoTempo+TempoCarregamento).

% Caso a energia nao seja suficiente para fazer o caminho apos estar
% carregada ate 80%, vai ser necessario adicionar ao tempo da viagem
% um tempo de carregamento extra, de modo a que o camiao chegue ao
% proximo armazem com 20% de energia.
tempo_extra(Carga80percent,Carga20percent,NovoTempo2,NovoTempo3,CargaAdicional,NovaCarga,CargaRetorno):-CargaChega is Carga80percent-NovaCarga,
    (CargaChega<Carga20percent,NovoTempo2 is NovoTempo3+CargaAdicional,
     CargaRetorno is Carga20percent;NovoTempo2 is NovoTempo3,CargaRetorno is CargaChega).

tempo_extra2(Energia,Carga20percent,NovoTempo,NovoTempo2,CargaAdicional,NovaCarga,CargaRetorno):-CargaChega is Energia-NovaCarga,
    (CargaChega<Carga20percent,NovoTempo2 is NovoTempo+CargaAdicional,
     CargaRetorno is Carga20percent;NovoTempo2 is NovoTempo,CargaRetorno is CargaChega).


% Remove a massa da entrega que deixou no armazem.
remover_massa_entrega(C2,MassaT,MassaT1):-(C2==5,MassaT1 is 0;entrega(_,_,Massa,C2,_,_),MassaT1 is MassaT-Massa).

% Atualiza o facto tempo_min para conter o tempo que demora a rota
% mais rapida e essa rota.
atualiza(LA,Tempo):-tempo_min(_,TempoMin),((Tempo<TempoMin,!,retract(tempo_min(_,_)),assertz(tempo_min(LA,Tempo)));true).





