describe(`Product Catalog Testing`, () => {

    let coffeeProductNum = 2;

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
        clickCoffees();
        cy.get(`.product-tile`).should(`have.length`, expectedCoffees);
    });

    it(`should show the correct number of brewers`, () => {
        const expectedBrewers = 2;
        clickBrewers();
        cy.get(`.product-tile`).should(`have.length`, expectedBrewers);
    });

    it(`should show the correct filters of coffees`, () => {
        clickCoffees();
        showsCoffeeProcessingFilters();
        showsCoffeesStatusFilters();
    });

    const showsCoffeeProcessingFilters = () => {
        cy.get(`.flex > .col-md-4 > :nth-child(1)`).should(`contain`, `Coffee processing`);
        cy.get(`:nth-child(2) > .checkbox > label`).should(`contain`, `Wet (Washed)`);
        cy.get(`:nth-child(3) > .checkbox > label`).should(`contain`, `Dry (Natural)`);
        cy.get(`:nth-child(4) > .checkbox > label`).should(`contain`, `Semi-dry`);
    };

    const showsCoffeesStatusFilters = () => {
        cy.get(`.col-md-4 > :nth-child(5)`).should(`contain`, `Status`);
        cy.get(`:nth-child(6) > .checkbox > label`).should(`contain`, `On sale`);
        cy.get(`:nth-child(7) > .checkbox > label`).should(`contain`, `Bestseller`);
    };

    it(`should show the correct filters of brewers`, () => {
        clickBrewers();
        showsBrewersManufacturerFilters();
        showsBrewersPriceFilters();
        showsBrewersStatusFilters();
    });

    const showsBrewersManufacturerFilters = () => {
        cy.get(`.flex > .col-md-4 > :nth-child(1)`).should(`contain`, `Manufacturer`);
        cy.get(`:nth-child(2) > label`).should(`contain`, `Aerobie`);
        cy.get(`:nth-child(3) > label`).should(`contain`, `Chemex`);
        cy.get(`:nth-child(4) > label`).should(`contain`, `Espro`);
        cy.get(`:nth-child(5) > label`).should(`contain`, `Hario`);
    };

    const showsBrewersPriceFilters = () => {
        cy.get(`.col-md-4 > :nth-child(6)`).should(`contain`, `Price`);
        cy.get(`:nth-child(7) > label`).should(`contain`, `$0.00 – $50.00`);
        cy.get(`:nth-child(8) > label`).should(`contain`, `$50.00 – $250.00`);
        cy.get(`:nth-child(9) > label`).should(`contain`, `$250.00 – $5,000.00`);
    };

    const showsBrewersStatusFilters = () => {
        cy.get(`.col-md-4 > :nth-child(10)`).should(`contain`, `Status`);
        cy.get(`:nth-child(11) > label`).should(`contain`, `On sale`);
        cy.get(`:nth-child(12) > label`).should(`contain`, `Bestseller`);
    };
    
    it(`should show the correct elements of coffee product`, () => {
        clickCoffees();
        showsProductName(coffeeProductNum);
        showsProductTeaserImage(coffeeProductNum);
        showsProductPrice(coffeeProductNum);
    });

    const showsProductName = (productNum) => {
        cy.get(`:nth-child(` + productNum + `) > .product-tile > a > .product-heading`);
    };

    const showsProductTeaserImage = (productNum) => {
        cy.get(`:nth-child(` + productNum + `) > .product-tile > a > .product-tile-image > img`);
    };

    const showsProductPrice = (productNum) => {
        cy.get(`:nth-child(` + productNum + `) > .product-tile > a > .product-tile-info > .product-tile-price`);
    };

    const clickCoffees = () => {
        cy.get(`.store-menu-list > ul > :nth-child(1) > a`).click();
    };

    const clickBrewers = () => {
        cy.get(`.store-menu-list > ul > :nth-child(2) > a`).click();
    };

});