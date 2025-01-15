describe('Register parking at tastarustå', () => {
    const plate = Cypress.env('PLATE_NO'); // Replace with the actual plate number

    it('should be able to register parking', () => {
        cy.visit('https://permit.parkingguru.com/no/Account/LogIn');
        cy.get('input[name="UserName"]').type(Cypress.env('PARKINGGURU_USERNAME'));
        cy.get('input[name="Password"]').type(Cypress.env('PARKINGGURU_PASSWORD'));
        cy.get('input[type="submit"]').click(); // Log in
        cy.get(':nth-child(2) > a').click(); // Register parking
        cy.get('.guestWebCheckinItemHeader > :nth-child(1) > .col-md-3').should('exist');
        cy.get('body').then($body => {
            if ($body.find(`#ValidParking-0:contains("${plate}")`).length === 0) {
                cy.get('#LicensePlate').type(plate);
                cy.get('#vehicle-data-submit').click(); // Register parking
                
                cy.get('.modal-content').should('contain.text', 'Ved å trykke ja så er kjøretøyet registrert');
                cy.get('.btn-primary').contains('Ja').click(); // Confirm parking
                cy.get('#tabConent-0 > :nth-child(2) > :nth-child(2)').should('contain.text', plate);
            }
        });
    });
});