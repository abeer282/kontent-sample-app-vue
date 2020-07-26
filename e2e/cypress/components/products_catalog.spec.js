describe(`Product Catalog Testing`, () => {

    let coffeeProductNum = 2;
    let brewerProductNum = 1;

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

    it(`should show the correct elements of brewer product`, () => {
        clickBrewers();
        showsProductName(brewerProductNum);
        showsProductTeaserImage(brewerProductNum);
        showsProductPrice(brewerProductNum);
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

    it(`should filter bestseller coffee products`, () => {
        clickCoffees();
        clickCoffeeBestsellerFilter();//check
        isBestsellerProduct();
        clickCoffeeBestsellerFilter();//unckeck
    });

    const clickCoffeeBestsellerFilter = () => {
        cy.get(`:nth-child(7) > .checkbox > label`).click();
    };

    it(`should filter bestseller brewer products`, () => {
        clickBrewers();
        clickBrewerBestsellerFilter();//check
        isBestsellerProduct();
        clickBrewerBestsellerFilter();//unckeck
    });

    it(`should filter bestseller brewer products with price 0-50$`, () => {
        clickBrewers();
        clickBrewerBestsellerFilter();//check
        clickBrewerPrice0_50();//check
        isBestsellerProduct();
        isBrewerPrice0_50();
        clickBrewerBestsellerFilter();//unckeck
        clickBrewerPrice0_50();//unckeck
    });

    const clickBrewerPrice0_50 = () => {
        cy.get(':nth-child(7) > label').click();
    };

    const isBrewerPrice0_50 = () => {
        cy.get(`.product-tile-price`).should(`contain`,`$25.90`);
    };

    const clickBrewerBestsellerFilter = () => {
        cy.get(':nth-child(12) > label').click();
    };

    const isBestsellerProduct = () => {
        cy.get(`.product-tile-status`).should(`contain`, `Bestseller`);
    };

    const clickCoffees = () => {
        cy.get(`.store-menu-list > ul > :nth-child(1) > a`).click();
    };

    const clickBrewers = () => {
        cy.get(`.store-menu-list > ul > :nth-child(2) > a`).click();
    };

});