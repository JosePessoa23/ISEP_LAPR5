% Este predicado começa por obter a massa total das entregas a ser
% feitas, seguido de obter uma lista com os ids das entregas e
% outra com os dos camioes, ambas ordenadas por massa. De seguida, é
% chamado o predicado camioes_necessarios que, através da massa total
% das entregas, retorna uma lista com os ids dos camioes necessários
% para realizar a distribuição de entregas. Depois é criado um facto que
% vai ser usado para guardar o id de um camião, tal como a massa total e
% os ids das entregas associadas.A seguir, é chamado o predicado
% distribuir que enche o facto criado anteriormente, associando as
% entregas aos respetivos camioes.Por fim, é chamado o predicado
% gerahttp que vai usar o algoritmo genético.
camioes_multiplos(ListaCamioesNecessarios,ListaEntregas, ListaCamioesF, ListaCaminhosF, ListaCustosF,NG,DP,PC,PM,CP,Entregas):-massa_entrega(MassaT),find_entregas(ListaEntregas)
,find_camioes(ListaCamioes),
    camioes_necessarios(ListaCamioes,MassaT,ListaCamioesNecessarios,0),retractall(entrega_camiao(_,_,_)),criar_facto(ListaCamioesNecessarios),
    conta_elementos(ListaCamioesNecessarios,N),
    distribuir(ListaEntregas,ListaCamioesNecessarios,ListaCamioesNecessarios,N,0,ListaCamioes,ListaEntregas),
    gerahttp(ListaCamioesF,ListaCaminhosF,ListaCustosF,NG,DP,PC,PM,CP,Entregas).
    %gera1(ListaCamioesF,ListaCaminhosF,ListaCustosF).

% Cria um facto que contém para cada camião, a lista de entregas a fazer
% e a massa correspondente dessas mesmo
criar_facto([]).
criar_facto([CamiaoId|ListaCamioesNecessarios]):-assertz(entrega_camiao([],CamiaoId,0)),criar_facto(ListaCamioesNecessarios).

%Adiciona a uma nova lista os N primeiros elementos de uma lista
get_N_elementos(_,0,_):-!.
get_N_elementos([A|B],N,[A|D]):-N1 is N-1, get_N_elementos(B,N1,D).

% Este predicado Itera a lista de entregas e de camioes, a cada iteracao
% é associado uma entrega a um camiao, após ser entregue uma entrega a
% cada camiao, é dado inicio a iteração da lista de camioes de novo,
% este sequencia é feita até a lista de entregas ficar vazia.
% No caso das entregas nao serem possíveis distribuir pelos camiões
% existentes, é adicionado o próximo camiao com mais massa a
% lista de camioes e da-se inicio de novo a distribuição de entregas
distribuir([],_,_,_,_,_,_).
distribuir(_ListaEntregas,ListaCamioes,_Backup,N,N,ListaCamioes,ListaEntregasOriginal):-
    N1 is N+1,
    get_N_elementos(ListaCamioes,N1,NovosCamioes),
    retractall(entrega_camiao(_,_,_)),
    distribuir(ListaEntregasOriginal,NovosCamioes,NovosCamioes,ListaCamioes,ListaEntregasOriginal).
distribuir(ListaEntregas,[],Backup,NCamioesNecessarios,N,ListaCamioes,ListaEntregasOrignal):-
    distribuir(ListaEntregas,Backup,Backup,NCamioesNecessarios,N,ListaCamioes,ListaEntregasOrignal).
distribuir([EntregaId|ListaEntregas],[CamiaoId|ListaCamioesNecessarios],Backup,NCamioesNecessarios,N,ListaCamioes,ListaEntregasOriginal):-
    entrega(EntregaId,_,Massa,_,_,_),
    carateristicasCam(CamiaoId,_,Capacidade,_,_,_),
    entrega_camiao(ListaId,CamiaoId,MassaAtual),
    MassaT is Massa+MassaAtual,(MassaT=<Capacidade,append(ListaId,[EntregaId],Result),
    retractall(entrega_camiao(_,CamiaoId,_)),
    assertz(entrega_camiao(Result,CamiaoId,MassaT)),
    distribuir(ListaEntregas,ListaCamioesNecessarios,Backup,NCamioesNecessarios,0,ListaCamioes,ListaEntregasOriginal);
    N1 is N+1,
    distribuir([EntregaId|ListaEntregas],ListaCamioesNecessarios,Backup,NCamioesNecessarios,N1,ListaCamioes,ListaEntregasOriginal)).


%Retorna a massa total das entregas que vao ser feitas
massa_entrega(MassaT):-findall(Massa,entrega(_,_,Massa,_,_,_),ListaMassas),soma_massa(ListaMassas,MassaT).
soma_massa([],0).
soma_massa([Massa|ListaMassas],MassaT):-soma_massa(ListaMassas,MassaT1),MassaT is MassaT1+Massa.

% Retorna uma lista com os ids dos camiões ordenados por massa, do mais
% pesado para o mais leve
find_camioes(ListaCamioesOrdenada):-findall(Id,carateristicasCam(Id,_,_,_,_,_),ListaCamioes),
    bubblesort_camioes(ListaCamioes,ListaCamioesOrdenada).

% Itera uma Lista de camiões de modo a retonar outra lista ordenada pela
% massa, do mais pesado para o mais leve
bubblesort_camioes( List, SortedList) :-swap_camioes( List, List1 ), ! ,bubblesort_camioes( List1, SortedList).
bubblesort_camioes( List, List).
swap_camioes([ X, Y | Rest ], [ Y, X | Rest ]):-carateristicasCam(X,_,Massa1,_,_,_),carateristicasCam(Y,_,Massa2,_,_,_),
    Massa1<Massa2,!.
swap_camioes([ Z | Rest ], [ Z | Rest1 ]):-swap_camioes(Rest, Rest1).

% Retorna uma lista com os ids das entregas ordenada pela massa, da mais
% pesada para a mais leve
find_entregas(ListaEntregasOrdenada):-findall(Id,entrega(Id,_,_,_,_,_),ListaEntregas),
    bubblesort_entregas(ListaEntregas,ListaEntregasOrdenada).

% Itera uma Lista de entregas de modo a retonar outra lista ordenada
% pela massa, da mais pesada para a mais leve
bubblesort_entregas( List, SortedList) :-swap_entregas( List, List1 ), ! ,bubblesort_entregas( List1, SortedList).
bubblesort_entregas( List, List).
swap_entregas([ X, Y | Rest ], [ Y, X | Rest ]):-entrega(X,_,Massa1,_,_,_),entrega(Y,_,Massa2,_,_,_),
    Massa1<Massa2,!.
swap_entregas([ Z | Rest ], [ Z | Rest1 ]):-swap_entregas(Rest, Rest1).

% É iterada a lista de camioes do sistema, a cada iteracao é adicionado
% um camiao a uma nova lista e comparado o peso total dos camioes dessa
% mesma lista com a massa total das entregas, a iteracao acaba quando a
% massa dos camiões for maior ou igual a massa total das entregas
camioes_necessarios([],_,_,_).
camioes_necessarios([Camiao|ListaCamioes],MassaT,ListaCamioesNecessarios,CapacidadeTotal1):-
    carateristicasCam(Camiao,_,CapacidadeCarga,_,_,_),CapacidadeTotal is CapacidadeCarga+CapacidadeTotal1,
    (CapacidadeTotal<MassaT,camioes_necessarios(ListaCamioes,MassaT,ListaCamioesNecessarios1,CapacidadeTotal),
     append([Camiao],ListaCamioesNecessarios1,ListaCamioesNecessarios),!;
     append([Camiao],[],ListaCamioesNecessarios),
     true).
