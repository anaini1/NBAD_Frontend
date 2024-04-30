// Home.e2e.js
describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/');
    });
  
    it('displays the page title correctly', () => {
      cy.contains('h1', 'Budget Tracking Application');
    });
  
    it('displays the "Sign In" button', () => {
      cy.contains('button.menu-btn', 'Sign In').should('exist');
    });
  
    it('displays the "Signup" button', () => {
      cy.contains('button.menu-btn', 'Signup').should('exist');
    });
  
    it('navigates to the login page when "Sign In" button is clicked', () => {
      cy.contains('button.menu-btn', 'Sign In').click();
      cy.url().should('include', 'http://localhost:3001/login');
    });
  
  });
  