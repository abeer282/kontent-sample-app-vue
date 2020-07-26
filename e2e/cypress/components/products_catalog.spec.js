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

    it(`should show the correct menu bar`, () => {
        showsCoffees();
        showsBrewers();
    });

    const showsCoffees = () => {
        cy.get(`.store-menu-list > ul > :nth-child(1) > a`).should(`contain`, `Coffees`);
    };

    const showsBrewers = () => {
        cy.get(`.store-menu-list > ul > :nth-child(2) > a`).should(`contain`, `Brewers`);
    };

    it(`should show the correct number of coffees products`, () => {
        const expectedCoffees = 2;
        cy.get(`.store-menu-list > ul > :nth-child(1) > a`).click();
        cy.get(`.product-tile`).should(`have.length`, expectedCoffees);
    });

    it(`should show the correct number of brewers`, () => {
        const expectedBrewers = 2;
        cy.get(`.store-menu-list > ul > :nth-child(2) > a`).click();
        cy.get(`.product-tile`).should(`have.length`, expectedBrewers);
    });
});