describe("Testing our form inputs", function() {

    this.beforeEach(function(){
        cy.visit("http://localhost:3000/");
    });

    it("Add text inputs", function() {
        cy.get('[data-cy="name"]').type("Jason Ours").should("have.value", "Jason Ours");
        cy.get('[data-cy="email"]').type("jason@jasonours.com").should("have.value", "jason@jasonours.com");
        cy.get('[data-cy="password"]').type("12password34").should("have.value", "12password34");
        cy.get("#positions").select("FrontEnd").should("have.value", "FrontEnd");
        cy.get('[type="checkbox"]').check().should("be.checked");
        cy.contains('Submit').click();
    });
});