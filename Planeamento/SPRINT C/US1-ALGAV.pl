
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic num_entregas/1.
:-dynamic cond_paragem/1.
:-dynamic cam/1.
:-dynamic caminho/1.
:-dynamic custo/1.
:-dynamic entregas_final/1.



%Adiciona o armazï¿½m principal, Matosinhos, ao inï¿½cio e fim da lista.
adicionar_armazem_inicial_final(Percurso,A):-append([5|Percurso],[5],A).

%Coloca todos os armazï¿½ns que tï¿½m entregas em Armazens.
get_armazens(Armazens):-findall(Id,entrega(_,_,_,Id,_,_),Armazens).


conta_elementos([],0).
conta_elementos([_|B],N):-conta_elementos(B,N1), N is N1+1.


% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG),
       (retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Tempo máximo de viagem para parar o algoritmo: '), read(CP),
	(retract(cond_paragem(_));true), asserta(cond_paragem(CP)).


gerahttp(ListaCamioesF,ListaCaminhosF,ListaCustosF,NG1,DP1,PC1,PM1,CP1,Entregas):-
	(retractall(cam(_));true),
	(retractall(caminho(_));true),
	(retractall(custo(_));true),
	(retractall(entregas_final(_));true),
	(retract(geracoes(_));true),atom_number(NG1,NG), asserta(geracoes(NG)),
	(retract(populacao(_));true),atom_number(DP1,DP), asserta(populacao(DP)),
	(retract(prob_cruzamento(_));true),atom_number(PC1,PC),	asserta(prob_cruzamento(PC)),
	(retract(prob_mutacao(_));true),atom_number(PM1,PM), asserta(prob_mutacao(PM)),
	(retract(cond_paragem(_));true),atom_number(CP1,CP), asserta(cond_paragem(CP)),
	findall(CamiaoId,entrega_camiao(_,CamiaoId,_),ListaCamioes),
	gera_para_camiao(ListaCamioes),
	findall(Camiao,cam(Camiao),ListaCamioesF),
	findall(Trajeto,caminho(Trajeto),ListaCaminhosF),
	findall(Cust,custo(Cust),ListaCustosF),
        findall(Entre, entregas_final(Entre),Entregas).


matosinhos_caminho(A,B):- adicionar_armazem_inicial_final(A,B).

adicionar_matosinhos_sem_custo([],_).
adicionar_matosinhos_sem_custo([A|B],[Novo|C]):- adicionar_matosinhos_sem_custo(B,C),adicionar_armazem_inicial_final(A,Novo).

melhor_solucao_atual([_*T|_], T).
melhor_solucao_atual_caminho([C*T|_], T,C).


gera1(ListaCamioesF,ListaCaminhosF,ListaCustosF):-
	(retractall(cam(_));true),
	(retractall(caminho(_));true),
	(retractall(custo(_));true),
	inicializa,
	findall(CamiaoId,entrega_camiao(_,CamiaoId,_),ListaCamioes),
	gera_para_camiao(ListaCamioes),
	findall(Camiao,cam(Camiao),ListaCamioesF),
	findall(Trajeto,caminho(Trajeto),ListaCaminhosF),
	findall(Cust,custo(Cust),ListaCustosF).

gera_para_camiao([]).
gera_para_camiao([Camiao|ListaCamioes]):-
	%write('Matrícula Camião: '),
	%write(Camiao),
	%nl,
	findall(Entrega,entrega_camiao(Entrega,Camiao,_),ListaEntregas),
	gera_populacao(Pop, Camiao),
	adicionar_matosinhos_sem_custo(Pop,_NPop),
	%write('Pop='),write(NPop),nl,
	avalia_populacao(Pop,PopAv,Camiao),
	adicionar_matosinhos(PopAv,_NPopAv),
	%write('PopAv='),write(NPopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	melhor_solucao_atual(PopOrd, S),
	cond_paragem(CP),
	(S>CP,  % testa a condição de paragem, caso a melhor solução atual seja inferior ao limite definido, o algoritmo para.
	geracoes(NG),
	gera_geracao(0,NG,PopOrd,Camiao);gera_geracao(0,0,PopOrd,Camiao)),%nl,nl,
	melhor_solucao_atual_caminho(PopOrd,A,C1),
	assertz(cam(Camiao)),
	matosinhos_caminho(C1,C),
	assertz(caminho(C)),
	assertz(custo(A)),
	assertz(entregas_final(ListaEntregas)),
	gera_para_camiao(ListaCamioes).

list_unique(List, Unique) :-
    list_unique_1(List, [], Unique).

list_unique_1([], _, []).
list_unique_1([X|Xs], So_far, Us) :-
    list_unique_2(X, Xs, So_far, Us).

list_unique_2(X, Xs, So_far, [X|Us]) :-
    maplist(dif(X), So_far),!,
    list_unique_1(Xs, [X|So_far], Us).

list_unique_2(X, Xs, So_far, Us) :-
    memberchk(X, So_far),
    list_unique_1(Xs, So_far, Us).

agrega_entregas([]).
agrega_entregas([A|B]):-not(entrega_agregada(_,A,_,_)),
                                                    (findall(Massa,entrega(_,_,Massa,A,_,_),ListaMassa),
                                                    findall(TempoCol,entrega(_,_,_,A,TempoCol,_),ListaTempoCol),
                                                    findall(TempoDesc,entrega(_,_,_,A,_,TempoDesc),ListaTempoDesc),
                                                    soma(ListaMassa,MassaTotal),
                                                    soma(ListaTempoCol,TempoColTotal),
                                                    soma(ListaTempoDesc,TempoDescTotal),
                                                    assertz(entrega_agregada(MassaTotal,A,TempoColTotal,TempoDescTotal)),
                                                    agrega_entregas(B));
                                                    agrega_entregas(B).




apagar_matosinhos([],_).
apagar_matosinhos([5|B],C):- apagar_matosinhos(B,C).
apagar_matosinhos([A|B],[A|C]):-apagar_matosinhos(B,C).


factorial(0,1):-!.
factorial(N,F):-N1 is N-1,factorial(N1,F1),F is N*F1.


gera_populacao(Pop, CamiaoId):-
	entrega_camiao(ListaEntregas,CamiaoId,_),
	get_armazens(ListaEntregas,ListaArmazens1),
	list_unique(ListaArmazens1,ListaArmazens),
	agrega_entregas(ListaArmazens),
	get_massas(ListaArmazens,ListaMassas),
	(retract(num_entregas(_));true),
	conta_elementos(ListaArmazens, NumE),
	populacao(TamPop1),
	factorial(NumE,X),
	((X < TamPop1),(TamPop is X);(TamPop is TamPop1)),
	asserta(num_entregas(NumE)),
	gera_populacao_heuristica_massa(TamPop,ListaArmazens,NumE,Pop,ListaMassas). % obtem o primeiro indivíduo através da heurística da massa

gera_populacao_heuristica_massa(TamPop,ListaArmazens,NumE,[Ind|Resto],ListaMassas):-
	TamPop1 is TamPop-1,
	gera_populacao_heuristica_tempo(TamPop1, ListaArmazens,NumE,Resto), % obtem o segundo indivíduo através da heurística do tempo
        armazens_por_massa(Ind,ListaArmazens,ListaMassas).
	%(not(member(Ind,Resto))).

get_massas([],_).
get_massas([Entrega|ListaEntregas], [Massa|ListaMassas]):-
	entrega_agregada(Massa,Entrega,_,_),get_massas(ListaEntregas,ListaMassas).

get_armazens([],_).
get_armazens([Entrega|ListaEntregas], [Armazem|ListaArmazem]):-
	entrega(Entrega,_,_,Armazem,_,_),get_armazens(ListaEntregas,ListaArmazem).



gera_populacao_heuristica_tempo(0,_,_,[]).
gera_populacao_heuristica_tempo(TamPop,ListaEntregas,NumE,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaEntregas,NumE,Resto),
	armazens_por_tempo(ListaEntregas,Ind1),
	apagar_matosinhos(Ind1,Ind).
%	not(member(Ind,Resto)).



gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaEntregas,NumE,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaEntregas,NumE,Resto),
	gera_individuo(ListaEntregas,NumE,Ind),
	not(member(Ind,Resto)).

gera_populacao(TamPop,ListaEntregas,NumE,L):-
	gera_populacao(TamPop,ListaEntregas,NumE,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaEntregas,NumE,[G|Resto]):- % cria uma ordem aleatória de entregas
	NumTemp is NumE + 1, % Soma-se um porque o intervalo é aberto
	random(1,NumTemp,N),
	retira(N,ListaEntregas,G,NovaLista),
	NumE1 is NumE-1,
	gera_individuo(NovaLista,NumE1,Resto).

retira(1,[G|Resto],G,Resto).  %retorna uma entrega aleatória da lista
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[],_).
avalia_populacao([Ind|Resto],[Ind*V|Resto1],Camiao):-
	avalia(Ind,V,Camiao),
	avalia_populacao(Resto,Resto1,Camiao).

avalia(Seq,V,Camiao):-
	entrega_camiao(_,Camiao,MassaT),
	carateristicasCam(Camiao,_,_,Energia,_,_),
	adicionar_armazem_inicial_final(Seq,NovoSeq),
	tempo_total(NovoSeq,V,MassaT,Energia,Camiao).

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	(VX > VY),!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

persiste_melhores(0,_,NPop,FPop):-append([],NPop,FPop).
persiste_melhores(N,[A|B],NPop, FPop):-N1 is N-1,persiste_melhores(N1,B,NPop,FPop1), (not(member(A,FPop1)),append([A],FPop1,FPop);append([],FPop1,FPop)).

apaga_n_primeiros(0,A,A):-!.
apaga_n_primeiros(N,[_|B],C):-N1 is N-1, apaga_n_primeiros(N1,B,C).

multiplica_aleatorio([],_).
multiplica_aleatorio([G*T|Resto],[G*T1|Resto1]):- random(0.0,1.0,X), T1 is T*X, multiplica_aleatorio(Resto,Resto1).

adiciona_pior([G*_|_B],NPop,FPop,Camiao):- avalia(G,CusOri,Camiao), (not(member([G*CusOri],NPop)),append([G*CusOri],NPop,FPop); true).

persiste_pior_aleatorio(_,_,FPop,FPop,_,1).
persiste_pior_aleatorio(N,Pop,NPop,FPop,Camiao,_):- apaga_n_primeiros(N,Pop,PPop),
	multiplica_aleatorio(PPop,APop),
	ordena_populacao(APop,OrdAPop),
	adiciona_pior(OrdAPop,NPop,FPop,Camiao).

melhor_persiste(Pop,NPop,FPop,Camiao):-populacao(Ne),N1 is Ne*0.2,((N1 < 1), N is 1; N is round(N1)),
	persiste_melhores(N,Pop,NPop,FPop1),
	conta_elementos(Pop,Number),
	persiste_pior_aleatorio(N,Pop,FPop1,FPop,Camiao,Number).

remover_excesso(_,0,_).
remover_excesso([A|B],N,[A|C]):- N1 is N-1, remover_excesso(B,N1,C).

gera_geracao(G,G,Pop,_):-!,
	adicionar_matosinhos(Pop,_PopMatosinhos).
	%write('Gera��o '), write(G), write(':'), nl, write(PopMatosinhos), nl.

gera_geracao(N,G,Pop,Camiao):-
	adicionar_matosinhos(Pop,_PopMatosinhos),
	%write('Gera��o '), write(N), write(':'), nl, write(PopMatosinhos), nl,
	random_permutation(Pop,PermPop), % garante que o cruzamento não seja feito sempre entre indivíduos em posições consecutivas
	cruzamento(PermPop,NPop1), % para melhorar permutar os elementos de Pop
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv,Camiao),
	melhor_persiste(Pop, NPopAv,FPopAv,Camiao), % garante que o melhor indivíduo persiste para a proxima geração
	ordena_populacao(FPopAv,NPopOrd),
	populacao(NP1),
	conta_elementos(Pop,Num),
	factorial(Num,X),
	((X < NP1),(NP is X);(NP is NP1)),
	remover_excesso(NPopOrd,NP, FPopOrd), % remove o pior indivíduo para a população não ultrapassar o nº de indivíduos, devido ao melhor_persiste
	N1 is N+1,
	cond_paragem(CP),
	melhor_solucao_atual(FPopOrd, S),
	(S>CP,  % testa a condição de paragem, caso a melhor solução atual seja inferior ao limite definido, o algoritmo para.
	gera_geracao(N1,G,FPopOrd,Camiao);gera_geracao(N1,N1,FPopOrd,Camiao)).

adicionar_matosinhos([],_).
adicionar_matosinhos([A*Custo|B],[Novo*Custo|C]):- adicionar_matosinhos(B,C),adicionar_armazem_inicial_final(A,Novo).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	num_entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	(((P11 < P21),!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	(I1 < I2),!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	num_entregas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	num_entregas(T),
	(((N >T),!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	num_entregas(NumE),
	R is NumE-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([Ind],[Ind]).
mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).











