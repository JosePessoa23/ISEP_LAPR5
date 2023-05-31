//Cypress Rota test

import { waitForAsync } from "@angular/core/testing"

beforeEach(() => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588");
    window.localStorage.setItem("Role", "GL");
  });

  afterEach(() => {
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
});


describe('Rota', () => {

//Criar Rota

    it('criar uma rota', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()
        
    })

    //Armazém Partida
    it('criar rota armazemPartida null', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    //Armazém Chegada
    it('criar rota armazemChegada null', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })    
    
    //Distância
    it('criar rota distância null', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar rota distância negativa', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('-4')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Obrigatório campo Distância da rota maior que 0!!')
        }
        )
    })    

    //Tempo Viagem Cheio
    it('criar rota tempoViagemCheio null', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar rota tempoViagemCheio negativo', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('-6')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Obrigatório campo tempo viagem cheio da rota maior que 0!!')
        }
        )
    })    

    //Energia Gasta

    it('criar rota energiaGasta null', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar rota energiaGasta negativa', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('-13')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('10')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Obrigatório campo energia gasta da rota maior que 0!!')
        }
        )
    })    

    //Tempo Carregamento Extra

    it('criar rota tempoCarregamentoExtra null', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar rota tempoCarregamentoExtra negativo', () => {
        cy.visit('/rotas')
        cy.contains('Rotas')

        cy.get('input[id="new-idArmazemPartida"]').type('Matosinhos')
        cy.get('input[id="new-idArmazemChegada"]').type('Arouca')
        cy.get('input[id="new-distancia"]').type('40')
        cy.get('input[id="new-tempoViagemCheio"]').type('60')
        cy.get('input[id="new-energiaGasta"]').type('134')
        cy.get('input[id="new-tempoCarregamentoExtra"]').type('-1')
        cy.get('#AddRota').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Obrigatório campo tempo carregamento extra da rota positivo!!')
        }
        )
    })    

    describe('get rotas', () => {
        it('get rotas', () => {
            cy.visit('/rotas')
            cy.contains('Get Rota')
            cy.get('input[id="idArmazemPartidaGet"]').type('Matosinhos')
            cy.get('input[id="idArmazemChegadaGet"]').type('Arouca')
            cy.wait(1000)
            cy.get('#GetRota').click()
            cy.wait(1000)
            cy.get('li').contains('Matosinhos - Arouca')

        })


    })

    describe('update rotas', () => {
        it('update distancia', () => {
            cy.visit('/rotas/detail/Matosinhos/Arouca')
            cy.get('input[id="new-distancia"]').type('40')
            cy.get('#SaveRota').click()
        })

        it('error distancia', () => {
            cy.visit('/rotas/detail/Matosinhos/Arouca')
            cy.get('input[id="new-distancia"]').type('-4')
            cy.get('#SaveRota').click()

            cy.on('window:alert', (str) => {
                expect(str).to.equal('Obrigatório campo Distância da rota maior que 0!!')
            }
        )
        })

    })


    describe('delete rota', () => {
        it('delete rota Matosinhos-Arouca', () => {
            cy.visit('/rotas')
            cy.contains('Get Rota')
            cy.get('input[id="idArmazemPartidaGet"]').type('Matosinhos')
            cy.get('input[id="idArmazemChegadaGet"]').type('Arouca')
            cy.wait(3000)
            cy.get('#GetRota').click()
            cy.wait(3000)
            cy.get('#DeleteRota').click()
            cy.wait(3000)
        })


    })

})