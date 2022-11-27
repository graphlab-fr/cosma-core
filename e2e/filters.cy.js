describe('Filters', () => {
  beforeEach(() => {
    cy.visit('/temp/cosmoscope.html');
  });

  it('should uncheck input on filter label click', () => {
    const input = cy.get('.menu-types-list .filter').first();
    input.find('label').click();
    input.find('input').should('not.be.checked');
  });

  describe('with alt key', () => {
    it('should uncheck all inputs but not clicked one if alt key is pressed', () => {
      let clickedFilterName;

      const inputToClick = cy.get('.menu-types-list .filter').first();
      inputToClick
        .find('label')
        .click({ altKey: true })
        .then((elt) => {
          const name = elt.find('input').attr('name');
          clickedFilterName = name;
        });
      cy.get('.menu-types-list .filter').each((elt) => {
        const input = elt.find('input');
        const name = input.attr('name');
        if (name !== clickedFilterName) {
          expect(input.is(':checked')).to.be.false;
        }
      });
    });

    it('should check all inputs if alt key is pressed on a second click on same filter', () => {
      const inputToClick = cy.get('.menu-types-list .filter').first();
      inputToClick.find('label').click({ altKey: true }).click({ altKey: true });
      cy.get('.menu-types-list .filter').each((elt) => {
        const input = elt.find('input');
        expect(input.is(':checked')).to.be.true;
      });
    });
  });
});
