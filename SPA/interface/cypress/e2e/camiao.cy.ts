//Cypress Camiao test

import { waitForAsync } from "@angular/core/testing"

beforeEach(() => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMmM2MmNkLWI3MWUtNGI2Ni05YTM1LWY4YjkyYTI1NWMwZCIsImVtYWlsIjoiZGF2aWRmYXJtaW5nY3J5cHRvQGdtYWlsLmNvbSIsInJvbGUiOiJHRiIsIm5hbWUiOiJEYXZpZCBvIGNhbWlvbmlzdGEiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMjM0MzQ1fX0sImV4cCI6MTY4MzMzNTMzNC41MjksImlhdCI6MTY3Mjk3MDkzNH0.H4zh5dDOyTfHjTeZRViP1WmwGxCyg5QHy6Knna2HWSU");
    window.localStorage.setItem("Role", "GF");
  });

  afterEach(() => {
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
});


describe('Camiao', () => {

//Criar Camião

    it('criar um camião', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-00-FF')
        cy.get('input[id="new-tara"]').type('12')
        cy.get('input[id="new-capacidade"]').type('13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()
        
    })

    it('criar um camiao2', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-01-FF')
        cy.get('input[id="new-tara"]').type('12')
        cy.get('input[id="new-capacidade"]').type('13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

    })

 //Matrícula   
    it('criar camiao matricula formato', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-002-FF')
        cy.get('input[id="new-tara"]').type('12')
        cy.get('input[id="new-capacidade"]').type('13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Matricula com o formato inválido.')
        }
        )
    })

    it('criar camiao matricula igual', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-00-FF')
        cy.get('input[id="new-tara"]').type('12')
        cy.get('input[id="new-capacidade"]').type('13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Matrícula ja existe no sistema')
        }
        )
    })
//Tara
    it('criar camiao tara null', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-02-FF')
        cy.get('input[id="new-capacidade"]').type('13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar camiao tara negativa', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-02-FF')
        cy.get('input[id="new-tara"]').type('-12')
        cy.get('input[id="new-capacidade"]').type('13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Tara tem de ser um número maior que 0.')
        }
        )
    })    
//Capacidade
    it('criar camiao capacidade null', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-02-FF')
        cy.get('input[id="new-tara"]').type('12')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
    })

    it('criar camiao capacidade negativa', () => {
        cy.visit('/camioes')
        cy.contains('Camiões')

        cy.get('input[id="new-matricula"]').type('AA-02-FF')
        cy.get('input[id="new-tara"]').type('12')
        cy.get('input[id="new-capacidade"]').type('-13')
        cy.get('input[id="new-cargaBateria"]').type('14')
        cy.get('input[id="new-autonomia"]').type('15')
        cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
        cy.get('#AddCamiao').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Capacidade tem de ser um número maior que 0.')
        }
        )
    })    

//Carga Bateria

it('criar camiao cargaBateria null', () => {
    cy.visit('/camioes')
    cy.contains('Camiões')

    cy.get('input[id="new-matricula"]').type('AA-02-FF')
    cy.get('input[id="new-tara"]').type('12')
    cy.get('input[id="new-capacidade"]').type('13')
    cy.get('input[id="new-autonomia"]').type('15')
    cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
    cy.get('#AddCamiao').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('É necessário preencher todos os campos.')
    }
    )
})

it('criar camiao cargaBateria negativa', () => {
    cy.visit('/camioes')
    cy.contains('Camiões')

    cy.get('input[id="new-matricula"]').type('AA-02-FF')
    cy.get('input[id="new-tara"]').type('12')
    cy.get('input[id="new-capacidade"]').type('13')
    cy.get('input[id="new-cargaBateria"]').type('-14')
    cy.get('input[id="new-autonomia"]').type('15')
    cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
    cy.get('#AddCamiao').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('A Carga da Bateria tem de ser um número maior que 0.')
    }
    )
})    

//Autonomia

it('criar camiao autonomia null', () => {
    cy.visit('/camioes')
    cy.contains('Camiões')

    cy.get('input[id="new-matricula"]').type('AA-02-FF')
    cy.get('input[id="new-tara"]').type('12')
    cy.get('input[id="new-capacidade"]').type('13')
    cy.get('input[id="new-cargaBateria"]').type('14')
    cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
    cy.get('#AddCamiao').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('É necessário preencher todos os campos.')
    }
    )
})

it('criar camiao autonomia negativa', () => {
    cy.visit('/camioes')
    cy.contains('Camiões')

    cy.get('input[id="new-matricula"]').type('AA-02-FF')
    cy.get('input[id="new-tara"]').type('12')
    cy.get('input[id="new-capacidade"]').type('13')
    cy.get('input[id="new-cargaBateria"]').type('14')
    cy.get('input[id="new-autonomia"]').type('-15')
    cy.get('input[id="new-tempoCarregamentoRapido"]').type('16')
    cy.get('#AddCamiao').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('A Autonomia tem de ser um número maior que 0.')
    }
    )
})    

//TempoCarregamentoRapido

it('criar camiao tempoCarregamentoRapido null', () => {
    cy.visit('/camioes')
    cy.contains('Camiões')

    cy.get('input[id="new-matricula"]').type('AA-02-FF')
    cy.get('input[id="new-tara"]').type('12')
    cy.get('input[id="new-capacidade"]').type('13')
    cy.get('input[id="new-cargaBateria"]').type('14')
    cy.get('input[id="new-autonomia"]').type('15')
    cy.get('#AddCamiao').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('É necessário preencher todos os campos.')
    }
    )
})

it('criar camiao tempoCarregamentoRapido negativa', () => {
    cy.visit('/camioes')
    cy.contains('Camiões')

    cy.get('input[id="new-matricula"]').type('AA-02-FF')
    cy.get('input[id="new-tara"]').type('12')
    cy.get('input[id="new-capacidade"]').type('13')
    cy.get('input[id="new-cargaBateria"]').type('14')
    cy.get('input[id="new-autonomia"]').type('15')
    cy.get('input[id="new-tempoCarregamentoRapido"]').type('-16')
    cy.get('#AddCamiao').click()

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Tempo de Carregamento Rápido tem de ser um número maior que 0.')
    }
    )
})    

    describe('get camioes', () => {
        it('get camioes', () => {
            cy.visit('/camioes')
            cy.contains('Get Camião')
            cy.get('li').contains('AA-00-FF')

        })

        it('get camioes 2', () => {
            cy.visit('/camioes')
            cy.contains('Get Camião')
            cy.get('li').contains('AA-01-FF')

        })


    })

    describe('update camioes', () => {
        it('update tara', () => {
            cy.visit('/camioes/detail/AA-00-FF')
            cy.get('input[id="new-tara"]').type('20')
            cy.get('#SaveCamiao').click()
        })

        it('error tara', () => {
            cy.visit('/camioes/detail/AA-00-FF')
            cy.get('input[id="new-tara"]').type('-20')
            cy.get('#SaveCamiao').click()

            cy.on('window:alert', (str) => {
                expect(str).to.equal('Tara tem de ser um número maior que 0.')
            }
        )
        })

        it('inibir camiao', () => {
            cy.visit('/camioes/detail/AA-00-FF')
            cy.get('#camiaoFalse').click()
            cy.get('#SaveCamiao').click()

            cy.on('window:alert', (str) => {
                expect(str).to.equal('Tara tem de ser um número maior que 0.')
            }
        )
        })

    })

    describe('delete camioes', () => {
        it('delete camiao AA-00-FF', () => {
            cy.visit('/camioes')
            cy.contains('Get Camião')
            cy.get('input[id="matricula"]').type('AA-00-FF')
            cy.wait(3000)
            cy.get('#GetCamiao').click()
            cy.wait(3000)
            cy.get('#DeleteCamiao').click()
            cy.wait(3000)
        })

        it('delete camiao AA-01-FF', () => {
            cy.visit('/camioes')
            cy.contains('Get Camião')
            cy.get('input[id="matricula"]').type('AA-01-FF')
            cy.wait(3000)
            cy.get('#GetCamiao').click()
            cy.wait(3000)
            cy.get('#DeleteCamiao').click()

        })


    })

})




