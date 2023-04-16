describe('test', () => {
    beforeEach(() => {
        cy.visit('link')
    })
    
    it('opens page', () => {
        cy.contains('Catalog').should('be.visible')
        
        cy.contains('Schuhe').click();
        
        cy.get('.item').should('have.length', 20);
    })
    
    it('search a nike product', () => {
        cy.get('input[placeholder="Produktsuche"]').first().type('nike{enter}');
    })
})

export {}