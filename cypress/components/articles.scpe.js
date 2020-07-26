describe(`Articles Testing`, () => {

    it(`should show the correct page title`, () => {
        cy.visit(`${Cypress.config().baseUrl}`);
        cy.get(`:nth-child(2) > .button-secondary`).click();
        cy.get(`:nth-child(3) > a`).click();
        cy.title().should(`eq`, `Dancing Goat`);
    });

});