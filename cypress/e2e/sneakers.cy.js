/// <reference types="cypress" />

context("Sneakers", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it.only("loads up the sneakers page", () => {
    cy.visit("http://localhost:5173/popular");
    cy.get('[data-cy="sneakers-page"]').should("be.visible");
  });

  it.only("shows all neccesary information in the popular page", () => {
    cy.visit("http://localhost:5173/popular");
    cy.get('[data-cy="sneaker-price"]').should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("be.visible");
  });

  it.only("shows all neccesary information in any sneakers page", () => {
    cy.visit("http://localhost:5173/sneakers/nike");
    cy.get('[data-cy="sneaker-price"]').should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("be.visible");
  });
});
