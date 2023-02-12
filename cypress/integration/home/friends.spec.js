describe("testing friends", () => {

    beforeEach(() => {
        cy.visit('/login');
        cy.get('input[formcontrolname=name]').type('Test');
        cy.get('input[formcontrolname=password]').type('test');
        cy.get('#login-button').click();
    })

    afterEach(() => {
        cy.get('#logout-button').click();
    })

    it("add friend", () => {
        cy.get('#users-button').click();
        expect(cy.get('#logged-user').contains('Test'));
        cy.get('#follow-user').click();
    })

})

