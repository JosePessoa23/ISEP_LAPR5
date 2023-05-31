

describe('get viagem', () => {

it('criar uma entrega', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ");
    window.localStorage.setItem("Role", "GA");
        cy.visit('/entregas')
        cy.contains('Entregas')

        cy.get('input[id="new-idLoja"]').type('001')
        cy.get('input[id="new-tempoCarga"]').type('30')
        cy.get('input[id="new-tempoDescarga"]').type('30')
        cy.get('input[id="new-data"]').type('22222222')
        cy.get('input[id="new-peso"]').type('200')
        cy.get('#AddEntrega').click()

        cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
        
})

it('obter viagem null', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588");
    window.localStorage.setItem("Role", "GL");
    cy.visit('/viagem')
    cy.contains('Planeamento para a Frota')
    cy.get('#CreateViagem').click()
    cy.on('window:alert', (str) => {
        expect(str).to.equal('É necessário preencher todos os campos.')
    })

    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
})

it('obter viagem data formato errado', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588");
    window.localStorage.setItem("Role", "GL");
    cy.visit('/viagem')
    cy.contains('Planeamento para a Frota')

    cy.get('input[id="new-data"]').type('22222222A')
    cy.get('input[id="new-ng"]').type('3')
    cy.get('input[id="new-dp"]').type('3')
    cy.get('input[id="new-pc"]').type('50')
    cy.get('input[id="new-pm"]').type('50')
    cy.get('input[id="new-cp"]').type('1')

    cy.get('#CreateViagem').click()
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Data deve seguir o formato yyyyMMdd.')
    })
    
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
})

it('obter pc superior a 100', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588");
    window.localStorage.setItem("Role", "GL");
    cy.visit('/viagem')
    cy.contains('Planeamento para a Frota')

    cy.get('input[id="new-data"]').type('22222222')
    cy.get('input[id="new-ng"]').type('3')
    cy.get('input[id="new-dp"]').type('3')
    cy.get('input[id="new-pc"]').type('101')
    cy.get('input[id="new-pm"]').type('50')
    cy.get('input[id="new-cp"]').type('1')

    cy.get('#CreateViagem').click()
    cy.on('window:alert', (str) => {
        expect(str).to.equal('A Probabilidade de cruzamento tem de ser um número maior que 0 e menor ou igual a 100.')
    })
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
})


/*
it('obter viagem', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588");
    window.localStorage.setItem("Role", "GL");
    cy.visit('/viagem')
    cy.contains('Planeamento para a Frota')

    cy.get('input[id="new-data"]').type('22222222')
    cy.get('input[id="new-ng"]').type('3')
    cy.get('input[id="new-dp"]').type('3')
    cy.get('input[id="new-pc"]').type('50')
    cy.get('input[id="new-pm"]').type('50')
    cy.get('input[id="new-cp"]').type('1')

    cy.get('#CreateViagem').click()

    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
})
*/

/*
it('delete viagem', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHTCIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MzYwLjkzNSwiaWF0IjoxNjcyOTcwOTYwfQ.xpsjmD2y0e4mGrTiR-acqFP8q6iW3xpDL3EwP-7U588");
    window.localStorage.setItem("Role", "GL");
    cy.visit('/viagem')
    cy.contains('Planeamento para a Frota')
    cy.get('#DeleteViagem').click()
    cy.wait(3000)
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
})
*/

it('delete entrega', () => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ");
    window.localStorage.setItem("Role", "GA");
    cy.visit('/entregas')
    cy.contains('Filtrar Entrega')
    cy.get('input[id="data"]').type('22222222')
    cy.wait(3000)
    cy.get('#pesquisarData').click()
    cy.wait(3000)
    cy.get('#DeleteEntrega').click()
    cy.wait(3000)
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
})


})
