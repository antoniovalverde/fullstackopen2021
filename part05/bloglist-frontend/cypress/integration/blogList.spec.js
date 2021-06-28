/* eslint-disable no-undef */
// Ejercicio 5.17
describe('Blog app', function() {

    //Ejercicio 5.18
    // create here a user to backend
    const cypressUser = {
      username: 'Peke',
      name: 'Esther Estepa',
      password: '123456',
    }

    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')

      //Ejercicio 5.18
      cy.request('POST', 'http://localhost:3001/api/users', cypressUser)

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('login')
    })

    //Ejercicio 5.18
    describe('Login', function() {
      it('succeeds with correct credentiales', function(){
        cy.get('#username').type(cypressUser.username)
        cy.get('#password').type(cypressUser.password)
        cy.get('#btn-login').click()
  
        cy.get('#msg-hello').contains(`${cypressUser.name} logged in `)
      })
      it('fails with wrong credentials and error message in red', function(){
        cy.get('#username').type(cypressUser.username)
        cy.get('#password').type('654321')
        cy.get('#btn-login').click()
  
        cy.get('#error').contains('Wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)'/*'red'*/)
      })
    })

    //Ejercicio 5.19
    describe.only('When logged in', function() {
      beforeEach(function() {
        // log in user here
        cy.get('#username').type(cypressUser.username)
        cy.get('#password').type(cypressUser.password)
        cy.get('#btn-login').click()
      })
    
      it('A blog can be created', function() {
        // ...
        cy.get('#btn-addBlog').click()

        const cypressBlog = {
          title: 'Cypress Blog',
          author: 'Antonio Valverde Cypress',
          url: 'http://europa.eu'
        }

        cy.get('#title').type(cypressBlog.title)
        cy.get('#author').type(cypressBlog.author)
        cy.get('#url').type(cypressBlog.url)

        cy.get('#btn-addingBlog').click()

        cy.contains('Cypress Blog')
      })

      //Ejercicio 5.20
      it('Blog like by user', function() {
        cy.get('#btn-addBlog').click()

        cy.get('#title').type('Corchopan')
        cy.get('#author').type('Bartolomé Jurado')
        cy.get('#url').type('http://notelodigo.es')

        cy.get('#btn-addingBlog').click()

        cy.get('.btn-ver').click()

        cy.get('.btn-addlike').click()

        cy.get('.likes').contains('Likes: 1')

      })

      //Ejercicio 5.21
      it('Delete Blog by creator', function() {
        cy.get('#btn-addBlog').click()

        cy.get('#title').type('Zampabollos')
        cy.get('#author').type('Esteban Cambio')
        cy.get('#url').type('http://nolose.es')

        cy.get('#btn-addingBlog').click()

        cy.get('.btn-ver').click()

        cy.contains('REMOVE').click()

        cy.contains('Zampabollos').should('not.exist')
      })

      //Ejercicio 5.22
      it('Order Blogs by likes', function() {
        cy.get('#btn-addBlog').click()

        cy.get('#title').type('Blog 1')
        cy.get('#author').type('Pepito Pérez')
        cy.get('#url').type('http://notelodigo.es')

        cy.get('#btn-addingBlog').click()

        cy.get('.btn-ver').click()

        cy.get('.btn-addlike').click()
        cy.wait(500)
        cy.get('.btn-addlike').click()
        cy.wait(500)
        cy.get('.btn-addlike').click()
        cy.wait(500)
        cy.get('#btn-addBlog').click()

        cy.get('#title').type('Blog 2')
        cy.get('#author').type('Pepito Pérez')
        cy.get('#url').type('http://notelodigo.es')

        cy.get('#btn-addingBlog').click()
        cy.wait(500)
        cy.contains('Blog 2').get('.btn-ver:last').click()
        cy.wait(5000)
        cy.contains('Blog 2').get('.btn-addlike:last').click()
        cy.wait(500)
        cy.get('#btn-addBlog').click()

        cy.get('#title').type('Blog 3')
        cy.get('#author').type('Pepito Pérez')
        cy.get('#url').type('http://notelodigo.es')
        cy.wait(500)
        cy.get('#btn-addingBlog').click()
        cy.wait(500)
        cy.contains('Blog 3').get('.btn-ver:last').click()
        cy.wait(5000)
        cy.contains('Blog 3').get('.btn-addlike:last').click()
        cy.wait(500)
        cy.contains('Blog 3').get('.btn-addlike:last').click()
        cy.wait(500)
        cy.contains('Blog 3').get('.btn-addlike').eq(1).click()
        cy.wait(500)
        cy.contains('Blog 3').get('.btn-addlike').eq(1).click()
        cy.wait(500)
        cy.contains('Blog 3').get('.btn-addlike').eq(0).click()
        cy.wait(500)

        cy.get('.likes').eq(0).contains('Likes: 5')
        cy.get('.likes').eq(1).contains('Likes: 3')
        cy.get('.likes').eq(2).contains('Likes: 1')
      })

    })
    

  })