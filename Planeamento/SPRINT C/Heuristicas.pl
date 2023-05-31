% Obtem um percurso, que comeca e acaba no armazem de Matosinhos, que
% visita os armazens das entregas existentes desde a entrega com massas
% maior até a de massa menor.
armazens_por_massa(Percurso, Armazens, Massas):-sort_by_massas(Armazens,Massas,Percurso,_),!.

% Ordena uma lista Armazens segundo o sorting da lista Massas atraves de
% uma implementacao do algoritmo Bubble Sort, inserindo o resultado das
% ordenacoes nas listas OrdemArmazens e SortedMassas, respetivamente.
%
% H_A: Head_Armazens, T_A: Tail_Armazens, NT_A, NewTail_Armazens
% H_M: Head_Massas, T_M: Tail_Massas, NT_M: NewTail_Massas
% Acc_A: Acumulador_Armazens, Acc_M: Acumulador_Massas
sort_by_massas(Armazens,Massas,OrdemArmazens,SortedMassas):-m_sort(Armazens,Massas,[],OrdemArmazens,[],SortedMassas).
m_sort(_,[],Acc_A,Acc_A,Acc_M,Acc_M).
m_sort([H_A|T_A],[H_M|T_M],Acc_A,OrdemArmazens,Acc_M,SortedMassas):-massas(H_A,T_A,NT_A,Armazem,H_M,T_M,NT_M,MassaMax),m_sort(NT_A,NT_M,[Armazem|Acc_A],OrdemArmazens,[MassaMax|Acc_M],SortedMassas).

massas(XA,[],[],XA,X,[],[],X).
massas(XA,[YA|TA],[YA|NTA],Passe,X,[Y|T],[Y|NT],Max):-X<Y,massas(XA,TA,NTA,Passe,X,T,NT,Max).
massas(XA,[YA|TA],[XA|NTA],Passe,X,[Y|T],[X|NT],Max):-X>=Y,massas(YA,TA,NTA,Passe,Y,T,NT,Max).

% Coloca todas as massas das entregas na lista Massas, mas apenas dos
% Armazens inseridos.
get_massas_de_armazens(Armazens,Massas):-get_massas_de_armazens(Armazens, [], Massas).
get_massas_de_armazens([],Massas,Massas):-!.
get_massas_de_armazens([Armazem|Resto], Massas, MassasFinal):- findall(M,entrega(_,_,M,Armazem,_,_),SomeMassas), append(Massas, SomeMassas, NewMassas), get_massas_de_armazens(Resto, NewMassas, MassasFinal).





% Obtem um percurso, que comeca e acaba no armazem de Matosinhos, que
% visita os armazens das entregas existentes desde a entrega de tempo
% menor de chegada, as de tempo maior de chegada.
%
% CO: Cidade Origem, CD: Cidade Destino
armazens_por_tempo(Armazens, Percurso):-armazens_por_tempo(Armazens, 5, [], P), adicionar_armazem_inicial_final(P, Percurso).
armazens_por_tempo([], _, OrdemArmazens, OrdemArmazens):-!.
armazens_por_tempo(Armazens, CO, OrdemArmazens,Percurso):-armazem_melhor_tempo(Armazens,CO,CD), delete(Armazens, CD, NewArmazens), append(OrdemArmazens, [CD], NewOrdemArmazens), armazens_por_tempo(NewArmazens, CD, NewOrdemArmazens, Percurso).

% Coloca os armazens de destino com o menor tempo na lista CDS (Cidades
% Destino).
armazens_melhor_tempo(Armazens,CO,CDS):-tempos_de_armazens(Armazens,CO,TS), min_list(TS,T), findall(CD,dadosCam_t_e_ta(_,CO,CD,T,_,_),AllCDS), intersection(Armazens, AllCDS, CDS).

% Retorna o armazem da lista Armazens com o menor tempo.
armazem_melhor_tempo(Armazens,CO,CD):-armazens_melhor_tempo(Armazens,CO,CDS), member(CD, CDS),!.

% Retorna os tempos dos armazens inseridos
tempos_de_armazens(Armazens,CO,Tempos):-tempos_de_armazens(Armazens,CO,[],Tempos).
tempos_de_armazens([],_,Tempos,Tempos).
tempos_de_armazens([Armazem|Resto],CO,Tempos,TemposFinal):-findall(T,dadosCam_t_e_ta(_,CO,Armazem,T,_,_),AddTempos), append(Tempos, AddTempos, NewTempos), tempos_de_armazens(Resto,CO,NewTempos,TemposFinal).





% Obtem um percurso, que comeca e acaba no armazem de Matosinhos, que
% visita os armazens das entregas existentes desde a entrega de tempo
% menor de chegada, as de tempo maior de chegada. Em caso de encontrar
% mais que um armazem de tempo optimo, escolhe a entrega de maior massa.
armazens_por_tempo_e_massa(Percurso):-get_armazens(Armazens),armazens_por_tempo_e_massa(Armazens,5,[],P), adicionar_armazem_inicial_final(P, Percurso),!.
armazens_por_tempo_e_massa([],_,OrdemArmazens,OrdemArmazens):-!.
armazens_por_tempo_e_massa(Armazens,CO,OrdemArmazens,Percurso):-armazens_melhor_tempo(Armazens,CO,CDS), get_massas_de_armazens(CDS, Massas), sort_by_massas(CDS, Massas, MassaOrdemArmazens,_), member(CD, MassaOrdemArmazens), delete(Armazens, CD, NewArmazens), append(OrdemArmazens, [CD],NewOrdemArmazens), armazens_por_tempo_e_massa(NewArmazens, CD,NewOrdemArmazens, Percurso).


