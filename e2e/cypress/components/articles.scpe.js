describe(`Articles Testing`, () => {

    let articleNumber = 5;
    
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

    it(`should show the correct number of articles`, () => {
        const expectedArticlesNum = 6;
        cy.get(`.article-tile`).should(`have.length`, expectedArticlesNum);
    });

    it(`should show article's elements`, () => {
        showElements(articleNumber);
    });

    const showElements = ((articleNum) => {
        showTeaserImage(articleNum);
        showDate(articleNum);
        showTitle(articleNum);
        showSummary(articleNum);
    });

    const showTeaserImage = (articleNum) => {
        cy.get(`:nth-child(` + articleNum + `) > .col-md-3 > .article-tile > :nth-child(1) > .article-tile-image`);
    };

    const showDate = (articleNum) => {
        cy.get(`:nth-child(` + articleNum + `) > .col-md-3 > .article-tile > .article-tile-date`);
    };

    const showTitle = (articleNum) => {
        cy.get(`:nth-child(` + articleNum + `) > .col-md-3 > .article-tile > .article-tile-content > .h4 > a`);
    };

    const showSummary = (articleNum) => {
        cy.get(`:nth-child(` + articleNum + `) > .col-md-3 > .article-tile > .article-tile-content > .article-tile-text`);
    };

});