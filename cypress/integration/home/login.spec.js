describe("testing login", () => {

    it("no data entered", () => {
        cy.visit('/login');
        expect(true).to.equal(true);
        
        cy.get('input[formcontrolname=name]').focus();
        cy.get('input[formcontrolname=password]').focus().blur();
        expect(cy.get('#invalid-login').contains('Invalid entry'));
    })

    it("login successful", () => {
        cy.visit('/login');
        cy.get('input[formcontrolname=name]').type('Test');
        cy.get('input[formcontrolname=password]').type('test');
        cy.get('#login-button').click();
        expect(cy.location('pathname').should('eq', '/timeline'))
    })
    
    it("invalid entry", () => {
        cy.visit('/login');
        cy.get('input[formcontrolname=name]').type('bad');
        cy.get('input[formcontrolname=password]').type('bad');
        cy.get('#login-button').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`failed attempt`)
          })
    })

    it("logout successful", () => {
        cy.get('input[formcontrolname=name]').type('Test');
        cy.get('input[formcontrolname=password]').type('test');
        cy.get('#login-button').click();
        cy.get('#logout-button').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`failed attempt`)
          })

    })
})