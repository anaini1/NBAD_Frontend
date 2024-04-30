// Home.e2e.js
describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('https://coral-app-aqy9y.ondigitalocean.app/');
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
      cy.url().should('include', 'https://coral-app-aqy9y.ondigitalocean.app/login');
    });
  
  });
  