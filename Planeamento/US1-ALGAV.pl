%Encontra todas as solu��es poss�veis para realizar as entregas.
trajetorias(Percurso, PF):-get_armazens(Armazens),permutation(Armazens,Percurso),adicionar_armazem_inicial_final(Percurso, PF).

%Adiciona o armaz�m principal, Matosinhos, ao in�cio e fim da lista.
adicionar_armazem_inicial_final(Percurso,A):-append([5|Percurso],[5],A).

%Coloca todos os armaz�ns que t�m entregas em Armazens.
get_armazens(Armazens):-findall(Id,entrega(_,_,_,Id,_,_),Armazens).
