describe(`Articles Testing`, () => {
    
    beforeEach(() => {
        visitHomePage();
        passAdminConfigurations();
        enterArticlesPage();
    });
    
    const visitHomePage = () => {
        cy.visit(`${Cypress.config().baseUrl}`);
    };
    
    const passAdminConfigurations = () => {
        cy.get(`:nth-child(2) > .button-secondary`).click();
    };

    const enterArticlesPage = () => {
        cy.get(`:nth-child(3) > a`).click();
    };

    it(`should show the correct page title`, () => {
        cy.title().should(`eq`, `Dancing Goat`);
    });

});