import type { Sneaker } from "../../src/types/sneaker";

const sneaker: Sneaker = {
  _id: "test-sneaker",
  shoeName: "Nike Air Max 90",
  thumbnail: "/src/assets/logo.png",
  lowestResellPrice: { stockX: 120, goat: 135 },
  resellLinks: {
    stockX: "https://stockx.com/test-sneaker",
    goat: "https://www.goat.com/sneakers/test-sneaker",
  },
};

describe("Sneakers", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/.netlify/functions/api/popular", {
      body: [sneaker],
    }).as("popularSneakers");
    cy.intercept("GET", "**/.netlify/functions/api/search/*", {
      body: [sneaker],
    }).as("searchSneakers");
  });

  it("loads the home page and navigates to popular sneakers", () => {
    cy.visit("/");
    cy.contains("h1", "Sneaker Spotter").should("be.visible");
    cy.contains("a", "Explore").click();
    cy.wait("@popularSneakers");
    cy.get('[data-cy="sneakers-page"]').should("be.visible");
  });

  it("shows sneaker information and marketplace links on the popular page", () => {
    cy.visit("/popular");
    cy.wait("@popularSneakers");
    cy.contains("h3", sneaker.shoeName).should("be.visible");
    cy.get('[data-cy="sneaker-price"]').should("have.length", 2);
    cy.contains('[data-cy="sneaker-price"]', "$120").should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("be.visible");
    cy.contains("a", "StockX").should("have.attr", "href", sneaker.resellLinks?.stockX);
    cy.contains("a", "Goat").should("have.attr", "href", sneaker.resellLinks?.goat);
  });

  it("shows sneakers for a brand route", () => {
    cy.visit("/sneakers/nike");
    cy.wait("@searchSneakers").its("request.url").should("include", "/search/nike");
    cy.contains("h2", "NIKE").should("be.visible");
    cy.get('[data-cy="sneaker-price"]').should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("be.visible");
  });

  it("submits a search using the focused input and closes the overlay", () => {
    cy.visit("/");
    cy.get(".magnifying-glass-icon").click();
    cy.get(".search-input").should("be.focused").type("air max{enter}");
    cy.location("pathname").should("eq", "/sneakers/air%20max");
    cy.wait("@searchSneakers").its("request.url").should("include", "/search/air%20max");
    cy.contains("h2", "AIR MAX").should("be.visible");
    cy.get(".search-overlay--container").should("not.exist");
  });

  it("handles the API's product-not-found response", () => {
    cy.intercept("GET", "**/.netlify/functions/api/search/missing", {
      body: { error: "Product Not Found" },
    });
    cy.visit("/sneakers/missing");
    cy.contains("h3", "Product Not Found").should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("not.exist");
  });

  it("renders sneakers without marketplace prices or links", () => {
    cy.intercept("GET", "**/.netlify/functions/api/popular", {
      body: [{ _id: sneaker._id, shoeName: sneaker.shoeName, thumbnail: sneaker.thumbnail }],
    });
    cy.visit("/popular");
    cy.contains("h3", sneaker.shoeName).should("be.visible");
    cy.get('[data-cy="sneaker-price"]').should("not.exist");
  });
});
