calcula_tempo_solucao(Custo, LAF):- get_time(Ti), rota_tempo_min(Custo,LAF), get_time(Tf), T is Tf-Ti, write('Tempo gerar da solucao:'), write(T).
