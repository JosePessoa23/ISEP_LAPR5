//Cypress Armazem test
import { waitForAsync } from "@angular/core/testing"


beforeEach(() => {
    window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRiNDkwNzFiLTA2ZDctNDVmNS1hNWY1LTg0MzUzZTFhOWYwNyIsImVtYWlsIjoiZmFmYXJvY2FzQGdtYWlsLmNvbSIsInJvbGUiOiJHQSIsIm5hbWUiOiJQb2xpYW5kbyIsInBob25lTnVtYmVyIjp7InByb3BzIjp7InZhbHVlIjoxMjMzNTQ4NTl9fSwiZXhwIjoxNjgzMzM1MjU2Ljg5OCwiaWF0IjoxNjcyOTcwODU2fQ.8YBJkws6QIX9Kqhx-W5YLwkgbtSrD8L94_5sO0Fm2GQ");
    window.localStorage.setItem("Role", "GA");
  });

  afterEach(() => {
    cy.clearLocalStorage("UserToken");
    cy.clearLocalStorage("Role");
});


describe('Armazem', () => {

    //Criar Armazem
    it('criar um armazem', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G22')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()
        })
    })

    //IdProprio 
    it('criar idProprio null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    it('criar idProprio formato invalido', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('70707')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('ID deve ser um codigo alfanumérico de três caracteres.')
        })
    })

    //Morada
    it('criar Morada null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G23')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    //Codigo Postal
    it('criar Codigo Postal null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G24')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    it('criar Codigo Postal formato invalido', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G25')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('445_5547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('O Código Postal deve ter 8 caracteres: 7 dígitos (4+3) separados por um hífen (-) e sem espaços.')
        })
    })

    //Localidade
    it('criar Localidade null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G26')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    //Pais
    it('criar Pais null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G27')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    //Designacao
    it('criar Designacao null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G28')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    it('criar Designacao formato invalido', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G29')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro Freixieiro ')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('A designacao do armazem nao deve ter mais que 50 caracteres.')
        })
    })

    //Latitude
    it('criar Latitude null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G28')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    it('criar Latitude formato invalido', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G29')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('92')
        cy.get('input[id="new-longitude"]').type('-8.69')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('A latitude tem que estar entre -90 e 90.')
        })
    })

    //Longitude
    it('criar Longitude null', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G28')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        })
    })

    it('criar Longitude formato invalido', () => {
        cy.visit('/armazens')
        cy.contains('Armazéns')

        cy.get('input[id="new-idProprio"]').type('G29')
        cy.get('input[id="new-morada"]').type('Travessa das Ribeiras, 71')
        cy.get('input[id="new-codigoPostal"]').type('4455-547')
        cy.get('input[id="new-localidade"]').type('Matosinhos')
        cy.get('input[id="new-pais"]').type('Portugal')
        cy.get('input[id="new-designacao"]').type('Freixieiro')
        cy.get('input[id="new-latitude"]').type('41.22')
        cy.get('input[id="new-longitude"]').type('-185')
        cy.get('input[id="new-altitude"]').type('0')
        cy.get('#AddArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('A longitude tem que estar entre -180 e 180.')
        })
    })
    
describe('get armazens', () => {
    it('get armazens', () => {
        cy.visit('/armazens')
        cy.contains('Get Armazém')
        cy.get('li').contains('G22 - Freixieiro')
    })
})

describe('update armazens', () => {
    it('update codigo postal', () => {
        cy.visit('/armazens')
        cy.contains('Get Armazém')
        cy.get('input[id="idProprio"]').type('G22')
        cy.wait(3000)
        cy.get('#GetArmazem').click()
        cy.wait(3000)
        cy.contains('G22').click()
        cy.get('input[id="new-codigoPostal"]').type('4485-965')
        cy.get('#SaveArmazem').click()
    })

    it('inibir armazem', () => {
        cy.visit('/armazens')
        cy.contains('Get Armazém')
        cy.get('input[id="idProprio"]').type('G22')
        cy.wait(3000)
        cy.get('#GetArmazem').click()
        cy.wait(3000)
        cy.contains('G22').click()
        cy.get('#armazemFalse').click()
        cy.get('#SaveArmazem').click()
    })

    it('error codigo postal', () => {
        cy.visit('/armazens')
        cy.contains('Get Armazém')
        cy.get('input[id="idProprio"]').type('G22')
        cy.wait(3000)
        cy.get('#GetArmazem').click()
        cy.wait(3000)
        cy.contains('G22').click()
        cy.get('input[id="new-codigoPostal"]').type('4485965')
        cy.get('#SaveArmazem').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('O Código Postal deve ter 8 caracteres: 7 dígitos (4+3) separados por um hífen (-) e sem espaços.')
        }
    )
    })

})

describe('delete armazem', () => {
    it('delete armazem', () => {
        cy.visit('/armazens')
        cy.contains('Get Armazém')
        cy.get('input[id="idProprio"]').type('G22')
        cy.wait(3000)
        cy.get('#GetArmazem').click()
        cy.wait(3000)
        cy.get('#DeleteArmazem').click()
        cy.wait(3000)
    })



})