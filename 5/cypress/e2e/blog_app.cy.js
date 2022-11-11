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
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login').click()

      cy.contains(`${user.name} logged in`)
    })

    it('Fails with the wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('j')
      cy.get('#login').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.get('#newBlog').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type(user.name)
      cy.get('#url').type('test.com')
      cy.get('#create').click()

      cy.get('#blogs').should('contain', 'Test title')
    })

    it('A blog can be liked', function() {
      cy.get('#newBlog').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type(user.name)
      cy.get('#url').type('test.com')
      cy.get('#create').click()

      cy.get('#blogs').should('contain', 'Test title')

      cy.contains('Test title')
        .parent().contains('View').click()
      cy.contains('Likes 0')
        .parent().get('#like').click()

      cy.contains('Likes 1')
    })

    it('A blog can be deleted', function() {
      cy.get('#newBlog').click()

      cy.get('#title').type('Test title')
      cy.get('#author').type(user.name)
      cy.get('#url').type('test.com')
      cy.get('#create').click()

      cy.get('#blogs').should('contain', 'Test title')

      cy.contains('Test title')
        .parent().contains('View').click()
        .parent().contains('Remove').click()

      cy.get('html').should('not.contain', 'Test title')
    })
  })
})
