

import { waitForAsync } from "@angular/core/testing"


beforeEach(() => {
    
  });

  afterEach(() => {
   
});


    it('criar um utilizador', () => {
        window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMWQzZmE4LWQyMWQtNDE5My1hNGRlLWRiYjNmZjE4Zjg3MiIsImVtYWlsIjoiam9zZWRhdmlkcGVzc29hQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5hbWUiOiJEYXZpZCBQZXNzb2EiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMTIzMTM5fX0sImV4cCI6MTY4MzMzNTMyNC4yLCJpYXQiOjE2NzI5NzA5MjR9.2OcITihtpj0dYhU5P0eVN7g6W-M8CswSfoYF7H6qHxw");
    window.localStorage.setItem("Role", "Admin");
        cy.visit('/create-acc')
        cy.contains('Create Account')

        cy.get('input[id="new-email"]').type('testeteste@gmail.com')
        cy.get('input[id="new-name"]').type('Teste Testado')
        cy.get('input[id="new-phoneNumber"]').type('111111111')
        cy.get('select[id="cms-features"]').select('GA')

        cy.get('#AddUser').click()
        cy.clearLocalStorage("UserToken");
        cy.clearLocalStorage("Role");
    })


    it('criar email formato errado', () => {
        window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMWQzZmE4LWQyMWQtNDE5My1hNGRlLWRiYjNmZjE4Zjg3MiIsImVtYWlsIjoiam9zZWRhdmlkcGVzc29hQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5hbWUiOiJEYXZpZCBQZXNzb2EiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMTIzMTM5fX0sImV4cCI6MTY4MzMzNTMyNC4yLCJpYXQiOjE2NzI5NzA5MjR9.2OcITihtpj0dYhU5P0eVN7g6W-M8CswSfoYF7H6qHxw");
    window.localStorage.setItem("Role", "Admin");
        cy.visit('/create-acc')
        cy.contains('Create Account')

        cy.get('input[id="new-email"]').type('blahblah')
        cy.get('input[id="new-name"]').type('Teste Testado')
        cy.get('input[id="new-phoneNumber"]').type('111111111')
        cy.get('select[id="cms-features"]').select('GA')

        cy.get('#AddUser').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('O formato do email esta incorreto')
        }
        )
        cy.clearLocalStorage("UserToken");
        cy.clearLocalStorage("Role");
    })

    it('criar telemovél formato errado', () => {
        window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMWQzZmE4LWQyMWQtNDE5My1hNGRlLWRiYjNmZjE4Zjg3MiIsImVtYWlsIjoiam9zZWRhdmlkcGVzc29hQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5hbWUiOiJEYXZpZCBQZXNzb2EiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMTIzMTM5fX0sImV4cCI6MTY4MzMzNTMyNC4yLCJpYXQiOjE2NzI5NzA5MjR9.2OcITihtpj0dYhU5P0eVN7g6W-M8CswSfoYF7H6qHxw");
    window.localStorage.setItem("Role", "Admin");
        cy.visit('/create-acc')
        cy.contains('Create Account')

        cy.get('input[id="new-email"]').type('testeteste@gmail.com')
        cy.get('input[id="new-name"]').type('Teste Testado')
        cy.get('input[id="new-phoneNumber"]').type('1111111118')
        cy.get('select[id="cms-features"]').select('GA')

        cy.get('#AddUser').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('O número de telemovél é tem de conter 9 digitos.')
        }
        )
        cy.clearLocalStorage("UserToken");
        cy.clearLocalStorage("Role");
    })

    it('criar sem role', () => {
        window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMWQzZmE4LWQyMWQtNDE5My1hNGRlLWRiYjNmZjE4Zjg3MiIsImVtYWlsIjoiam9zZWRhdmlkcGVzc29hQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5hbWUiOiJEYXZpZCBQZXNzb2EiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMTIzMTM5fX0sImV4cCI6MTY4MzMzNTMyNC4yLCJpYXQiOjE2NzI5NzA5MjR9.2OcITihtpj0dYhU5P0eVN7g6W-M8CswSfoYF7H6qHxw");
    window.localStorage.setItem("Role", "Admin");
        cy.visit('/create-acc')
        cy.contains('Create Account')

        cy.get('input[id="new-email"]').type('testeteste@gmail.com')
        cy.get('input[id="new-name"]').type('Teste Testado')
        cy.get('input[id="new-phoneNumber"]').type('111111111')

        cy.get('#AddUser').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário escolher uma opção.')
        }
        )
        cy.clearLocalStorage("UserToken");
        cy.clearLocalStorage("Role");
    })

    it('criar null', () => {
        window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjMWQzZmE4LWQyMWQtNDE5My1hNGRlLWRiYjNmZjE4Zjg3MiIsImVtYWlsIjoiam9zZWRhdmlkcGVzc29hQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsIm5hbWUiOiJEYXZpZCBQZXNzb2EiLCJwaG9uZU51bWJlciI6eyJwcm9wcyI6eyJ2YWx1ZSI6MTIzMTIzMTM5fX0sImV4cCI6MTY4MzMzNTMyNC4yLCJpYXQiOjE2NzI5NzA5MjR9.2OcITihtpj0dYhU5P0eVN7g6W-M8CswSfoYF7H6qHxw");
    window.localStorage.setItem("Role", "Admin");
        cy.visit('/create-acc')
        cy.contains('Create Account')

        cy.get('#AddUser').click()

        cy.on('window:alert', (str) => {
            expect(str).to.equal('É necessário preencher todos os campos.')
        }
        )
        cy.clearLocalStorage("UserToken");
        cy.clearLocalStorage("Role");
    })    

    it('anonimizar um utilizador', () => {
        window.localStorage.setItem("UserToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NzRlZDE0LWQxMWQtNGY4Zi1iMTk1LWRlOThmMDMwZTBmZSIsImVtYWlsIjoidGVzdGV0ZXN0ZUBnbWFpbC5jb20iLCJyb2xlIjoiR0EiLCJuYW1lIjoiVGVzdGUgVGVzdGFkbyIsInBob25lTnVtYmVyIjoxMTExMTExMTEsImV4cCI6MTY4MzU2Mzg3MS40NjQsImlhdCI6MTY3MzE5OTQ3MX0.lbSKKbjszaK14Mj5GYDUPtbeP23-1HnluKta2c0e16g");
        window.localStorage.setItem("Role", "GA");
        
        cy.wait(2000);
        
        cy.wait(2000);
        cy.visit('/logout')
        cy.contains('Detalhes do utilizador:')
        cy.get('#anonimizarUser').click()
        cy.clearLocalStorage("UserToken");
        cy.clearLocalStorage("Role");
    })




