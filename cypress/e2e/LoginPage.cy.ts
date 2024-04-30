describe('LoginPage', () => {
    it('should login successfully', () => {
   
      cy.visit('https://coral-app-aqy9y.ondigitalocean.app/login');
      cy.get('input[type="text"]').type('ashish@gmail.com');
      cy.get('input[type="password"]').type('ashish');
      cy.get('button#login').click();
      cy.url().should('include', '/dashboard');
    });
  });
  