describe(`Product Catalog Testing`, () => {

    beforeEach(() => {
        visitHomePage();
        passAdminConfigurations();
        enterProductsPage();
    });

    const visitHomePage = () => {
        cy.visit(`${Cypress.config().baseUrl}`);
    };

    const passAdminConfigurations = () => {
        if (cy.url().should(`eq`, `http://localhost:8080/Admin/Configuration`))
            cy.get(`:nth-child(2) > .button-secondary`).click();
    };

    const enterProductsPage = () => {
        cy.get(`.container > :nth-child(1) > ul > :nth-child(2) > a`).click();
    };

    it(`should show the correct page title`, () => {
        cy.title().should(`eq`, `Dancing Goat`);
    });

});