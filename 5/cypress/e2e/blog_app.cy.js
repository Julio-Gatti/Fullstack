describe('Blog app', function() {
  const user = {
    name: 'Juuso J',
    username: 'juuso',
    password: 'salis'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('The login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('Succeeds with the correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#Username').type(user.username)
      cy.get('#Password').type(user.password)
      cy.get('#Login').click()

      cy.contains(`${user.name} logged in`)
    })

    it('Fails with the wrong credentials', function() {
      
    })
  })
})
