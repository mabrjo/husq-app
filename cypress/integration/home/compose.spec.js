describe("testing husqing", () => {

    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[formcontrolname=name]').type('Test');
        cy.get('input[formcontrolname=password]').type('test');
        cy.get('#login-button').click();
        cy.wait(2000)

    })
    
    afterEach(() =>{
        cy.get('#logout-button').click();
    })

    it("no data entered", () => {
        cy.get('input[formcontrolname=message]').first().focus();
        expect(cy.get('#husq-button').should('be.disabled'))
        
    })

    it("husq successful", () => {
        cy.get('input[formcontrolname=message]').first().type('Testing Husqs E2E');
        cy.get('#husq-button').click();
        expect(cy.location('pathname').should('eq', '/timeline'))
    })

    it("invalid entry", () => {
        cy.get('input[formcontrolname=message]').first().type('This is testing if we can enter more than 120 characters, This is testing if we can enter more than 120 characters, need a few more letters');
        cy.get('#husq-button').should('be.disabled')
    })

    it("husq reply successful", () => {
    cy.get('#reply-message-1').filter('input[formControlName=message]').type('Testing Husqs E2E replies');
    cy.get('#reply-button').click();
    expect(cy.location('pathname').should('eq', '/timeline'))
    })

    it("delete successful", () => {
        cy.get('#profile-button').click();
        cy.get('#delete-button').click();

    })

})