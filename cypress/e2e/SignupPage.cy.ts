// SignupPage.e2e.js
describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/signup');
    });
  
    it('displays the signup form correctly', () => {
      cy.get('.login-page').should('exist');
      cy.get('.login-box').should('exist');
      cy.get('form#login-form').should('exist');
      cy.contains('p.form-title', 'Sign Up to the Dashboard').should('exist');
      cy.get('input#username').should('exist');
      cy.get('input#signup-email').should('exist');
      cy.get('input#signup-password').should('exist');
      cy.get('button#signup').should('exist');
      cy.contains('article', 'Already have an account?').should('exist');
      cy.contains('article a', 'Sign In').should('exist');
    });
  
    it('successfully signs up with valid credentials', () => {
      const username = 'testuser';
      const email = 'test@example.com';
      const password = 'testpassword';
  
      cy.get('input#username').type(username);
      cy.get('input#signup-email').type(email);
      cy.get('input#signup-password').type(password);
      cy.get('button#signup').click();
      cy.get('.confirmbox').should('exist');
      cy.contains('.confirmbox p', 'Account has been created successfully!').should('exist');
    });
  
    it('handles unsuccessful signup with invalid credentials', () => {
      // Test case for invalid credentials, such as empty fields or incorrect format
    });
  });
  