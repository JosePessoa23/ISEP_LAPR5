//Cypress Entrega test

import { waitForAsync } from "@angular/core/testing"


beforeEach(() => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ");
    window.localStorage.setItem("Role", "GA");
  });

  afterEach(() => {
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
});

describe('Entrega', () => {


//Criar Entrega

    it('criar uma entrega', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()
        
    })


    })

 //idArmazem  
    it('criar id armazem null', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar id armazem formato invalido', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('1')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Id do armazém tem de ser um número com 3 algarismos.')
        }
        )
    })
//Tempo de Carga
    it('criar entrega tempo de carga null', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar entrega tempo de carga negativa', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('-30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Tempo de Carregamento tem de ser um número maior do que 0.')
        }
        )
    })    
//Tempo de descarga
    it('criar entrega tempo de descarga null', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar entrega tempo de descarga negativa', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('-30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Tempo de Descarga tem de ser um número maior do que 0.')
        }
        )
    })    

//Data

it('criar entrega data null', () => {
    cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('É necessário preencher todos os campos.')
    }
    )
})

it('criar entrega data formato invalido', () => {
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('220801')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Data deve seguir o formato yyyyMMdd.')
    }
    )
})    

//Peso

it('criar entrega peso null', () => {
    cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('#AddEntrega').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('É necessário preencher todos os campos.')
    }
    )
})

it('criar entrega peso negativo', () => {
    cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('11111111')
        cy.get('input[id="new-peso"]').type('-200')
        cy.get('#AddEntrega').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Peso deve ser maior do que 0.')
    }
    )
})       

    describe('get entregas', () => {
        it('get entregas', () => {
            cy.visit('/entregas')
            cy.contains('Pesquisar')
            cy.get('li').contains('001 - 11111111')
        })
    })

    describe('update entregas', () => {
        it('update peso', () => {
            cy.visit('/entregas')
            cy.contains('Filtrar Entrega')
            cy.get('input[id="data"]').type('11111111')
            cy.wait(3000)
            cy.get('#pesquisarData').click()
            cy.wait(3000)
            cy.contains('11111111').click()
            cy.get('input[id="new-peso"]').type('250')
            cy.get('#SaveEntrega').click()
        })

        it('error peso', () => {
            cy.visit('/entregas')
            cy.contains('Filtrar Entrega')
            cy.get('input[id="data"]').type('11111111')
            cy.wait(3000)
            cy.get('#pesquisarData').click()
            cy.wait(3000)
            cy.contains('11111111').click()
            cy.get('input[id="new-peso"]').clear
            cy.get('input[id="new-peso"]').type('-200')
            cy.get('#SaveEntrega').click()

            cy.on('window:alert', (str) => {
                expect(str).to.equal('Peso deve ser maior do que 0.')
            }
        )
        })

    })


    describe('delete entrega', () => {
        it('delete entrega', () => {
            cy.visit('/entregas')
            cy.contains('Filtrar Entrega')
            cy.get('input[id="data"]').type('11111111')
            cy.wait(3000)
            cy.get('#pesquisarData').click()
            cy.wait(3000)
            cy.get('#DeleteEntrega').click()
            cy.wait(3000)
        })



    })





