% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
%:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


:- json_object rota(custo:number,caminho:list).


% Relação entre pedidos HTTP e predicados que os processam
:- http_handler('/entregas0', entregas, []).
:- http_handler('/entregas1', entregas1, []).
:- http_handler('/entregas2', entregas2, []).
:- http_handler('/entregas3', entregas3, []).


 melhor_caminho():-
        rota_tempo_min(Custo, LAF),
        R = rota(Custo,LAF),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).



 heuristica1():-
        rota_tempo_min_tempo(Custo, LAF),
        R = rota(Custo,LAF),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).

 heuristica2():-
        rota_tempo_min_massa(Custo, LAF),
        R = rota(Custo,LAF),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).

 heuristica3():-
        rota_tempo_min_tempo_e_massa(Custo, LAF),
        R = rota(Custo,LAF),
        prolog_to_json(R, JSONObject),
        reply_json(JSONObject, [json_object(dict)]).




% Criação de servidor HTTP no porto 'Port'
server(Port) :-
        http_server(http_dispatch, [port(Port)]).

entregas(Request):-
         cors_enable(Request,[methods([get])]),
         remover_dados(),
         member(data(Value), Request),
         string_concat('https://localhost:5001/api/entregas/data/',Value,Url),
         http_open(Url, Reply,[request_header('Token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ'), cert_verify_hook(cert_accept_any)]),
         json_read_dict(Reply,Dados),
         save_entrega(Dados),
         camiao(_),
         rotas(),
         armazens(),
         melhor_caminho().


entregas1(Request):-
         cors_enable(Request,[methods([get])]),
         remover_dados(),
         member(data(Value), Request),
         string_concat('https://localhost:5001/api/entregas/data/',Value,Url),
         http_open(Url, Reply,[request_header('Token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ'), cert_verify_hook(cert_accept_any)]),
         json_read_dict(Reply,Dados),
         save_entrega(Dados),
         camiao(_),
         rotas(),
         armazens(),
         heuristica1().

entregas2(Request):-
         cors_enable(Request,[methods([get])]),
         remover_dados(),
         member(data(Value), Request),
         string_concat('https://localhost:5001/api/entregas/data/',Value,Url),
         http_open(Url, Reply,[request_header('Token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ'), cert_verify_hook(cert_accept_any)]),
         json_read_dict(Reply,Dados),
         save_entrega(Dados),
         camiao(_),
         rotas(),
         armazens(),
         heuristica2().

entregas3(Request):-
         cors_enable(Request,[methods([get])]),
         remover_dados(),
         member(data(Value), Request),
         string_concat('https://localhost:5001/api/entregas/data/',Value,Url),
         http_open(Url, Reply,[request_header('Token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ'), cert_verify_hook(cert_accept_any)]),
         json_read_dict(Reply,Dados),
         save_entrega(Dados),
         camiao(_),
         rotas(),
         armazens(),
         heuristica3().





camiao(_Request):-
        http_open('http://localhost:3000/api/camioes',Reply,
                 [
                   request_header('token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMmM2MmNkLWI3MWUtNGI2Ni05YTM1LWY4YjkyYTI1NWMwZCIsImVtYWlsIjoiZGF2aWRmYXJtaW5nY3J5cHRvQGdtYWlsLmNvbSIsInJvbGUiOiJHRiIsIm5hbWUiOiJEYXZpZCBvIGNhbWlvbmlzdGEiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMjM0MzQ1fX0sImV4cCI6MTY4MzMzNTMzNC41MjksImlhdCI6MTY3Mjk3MDkzNH0.H4zh5dDOyTfHjTeZRViP1WmwGxCyg5QHy6Knna2HWSU'),cert_verify_hook(cert_accept_any)]

                ),
        json_read_dict(Reply, Data),
        save_camiao(Data).


rotas():-
        http_open('http://localhost:3000/api/rotas',Reply,
                 [
                   request_header('token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588'),cert_verify_hook(cert_accept_any)]
                ),
        json_read_dict(Reply, Data),
        save_rotas(Data).

armazens():-
        http_open('https://localhost:5001/api/armazens',Reply,
                 [
                   request_header('Token'='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ'),cert_verify_hook(cert_accept_any)]
                ),
        json_read_dict(Reply, Data),
        save_armazens(Data).



save_camiao([A|_B]):- assertz(carateristicasCam(A.matricula,A.tara,A.capacidade,A.cargaBateria,A.autonomia,A.tempoCarregamentoRapido)).
save_camiao(A):- assertz(carateristicasCam(A.matricula,A.tara,A.capacidade,A.cargaBateria,A.autonomia,A.tempoCarregamentoRapido)).


save_entrega([]).
save_entrega([A|B]):-number_codes(N,A.idLoja),assertz(entrega(A.id,A.data,A.peso,N,A.tempoCarga,A.tempoDescarga)),save_entrega(B).

save_rotas([]).
save_rotas([A|B]):-number_codes(IdPartida,A.idArmazemPartida),number_codes(IdChegada,A.idArmazemChegada),carateristicasCam(Id,_,_,_,_,_),assertz(dadosCam_t_e_ta(Id,IdPartida,IdChegada,A.tempoViagemCheio,A.energiaGasta,A.tempoCarregamentoExtra)), save_rotas(B).

save_armazens([]).
save_armazens([A|B]):-number_codes(Id,A.idProprio),assertz(idArmazem(A.localidade,Id)), save_armazens(B).


remover_dados():-retractall(entrega(_,_,_,_,_,_)), retractall(carateristicasCam(_,_,_,_,_,_)), retractall(dadosCam_t_e_ta(_,_,_,_,_,_)), retractall(idArmazem(_,_)).

