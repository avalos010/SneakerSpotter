import type { Sneaker } from "../../src/types/sneaker";

const sneaker: Sneaker = {
  _id: "test-sneaker",
  shoeName: "Nike Air Max 90",
  thumbnail: "/src/assets/logo.png",
  styleID: "HQ7978-001",
  lowestResellPrice: { goat: 135, flightClub: 150, stadiumGoods: 160 },
  resellLinks: {
    goat: "https://www.goat.com/sneakers/test-sneaker",
    flightClub: "https://www.flightclub.com/test-sneaker",
    stadiumGoods: "https://www.stadiumgoods.com/products/test-sneaker",
  },
};

const popularRoute = {
  method: "GET",
  pathname: /\/popular$/,
  resourceType: /^(xhr|fetch)$/,
};

const detailedSneaker: Sneaker = {
  ...sneaker,
  brand: "Nike",
  colorway: "Black/White",
  description: "A sneaker for comparing sellers.",
  lowestResellPrice: { ...sneaker.lowestResellPrice, stockX: 120 },
  resellLinks: { ...sneaker.resellLinks, stockX: "https://stockx.com/test-sneaker" },
  resellPrices: {
    goat: { "8": 135, "9": 140 },
    flightClub: { "8": 150, "9": 155 },
    stadiumGoods: { "8": 160 },
    stockX: { "8": 120, "9": 130 },
  },
};

describe("Sneakers", () => {
  beforeEach(() => {
    cy.intercept(popularRoute, {
      body: [sneaker],
    }).as("popularSneakers");
    cy.intercept("GET", "**/search/*", {
      body: [sneaker],
    }).as("searchSneakers");
    cy.intercept("GET", "**/id/*/prices", { body: detailedSneaker }).as("sneakerPrices");
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
    cy.get('[data-cy="sneaker-price"]').should("have.length", 3);
    cy.contains('[data-cy="sneaker-price"]', "From $135").should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("be.visible");
    cy.contains("a", "GOAT").should("have.attr", "href", sneaker.resellLinks?.goat);
    cy.contains("a", "Flight Club").should("have.attr", "href", sneaker.resellLinks?.flightClub);
    cy.contains("a", "Stadium Goods").should("have.attr", "href", sneaker.resellLinks?.stadiumGoods);
    cy.contains("a", "StockX").should("not.exist");
  });

  it("shows sneakers for a brand route", () => {
    cy.visit("/sneakers/nike");
    cy.wait("@searchSneakers").its("request.url").should("include", "/search/nike");
    cy.contains("h2", "NIKE").should("be.visible");
    cy.get('[data-cy="sneaker-price"]').should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("be.visible");
    cy.get('[data-cy="seller-offer"]').should("have.length", 3);
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
    cy.intercept("GET", "**/search/missing", {
      statusCode: 404,
      body: { error: "Product Not Found" },
    });
    cy.visit("/sneakers/missing");
    cy.contains("h3", "Product Not Found").should("be.visible");
    cy.get('[data-cy="sneaker-image"]').should("not.exist");
  });

  it("renders sneakers without marketplace prices or links", () => {
    cy.intercept(popularRoute, {
      body: [{ _id: sneaker._id, shoeName: sneaker.shoeName, thumbnail: sneaker.thumbnail }],
    });
    cy.visit("/popular");
    cy.contains("h3", sneaker.shoeName).should("be.visible");
    cy.get('[data-cy="sneaker-price"]').should("not.exist");
  });

  it("keeps seller links without prices and ignores empty price maps", () => {
    cy.intercept(popularRoute, {
      body: [{
        ...sneaker,
        lowestResellPrice: { goat: 135, flightClub: null, stadiumGoods: 0 },
        resellPrices: { stockX: {} },
      }],
    });
    cy.visit("/popular");
    cy.get('[data-cy="seller-offer"]').should("have.length", 3);
    cy.contains('[data-cy="seller-offer"]', "Flight Club").within(() => {
      cy.contains("Price unavailable").should("be.visible");
      cy.get("a").should("have.attr", "href", sneaker.resellLinks?.flightClub);
    });
    cy.contains("a", "StockX").should("not.exist");
    cy.contains('[data-cy="sneaker-price"]', "$0").should("not.exist");
  });

  it("opens all four sellers' detailed prices and compares the selected size", () => {
    cy.visit("/popular");
    cy.contains("a", "Compare sizes").click();
    cy.wait("@sneakerPrices").its("request.url").should("include", "/id/HQ7978-001/prices");
    cy.get('[data-cy="seller-offer"]').should("have.length", 4);
    cy.contains("a", "StockX").should("have.attr", "href", detailedSneaker.resellLinks?.stockX);
    cy.contains("A sneaker for comparing sellers.").should("be.visible");
    cy.get("select").select("9");
    cy.contains('[data-cy="seller-offer"]', "StockX").should("contain", "$130");
    cy.contains('[data-cy="seller-offer"]', "GOAT").should("contain", "$140");
    cy.contains('[data-cy="seller-offer"]', "Flight Club").should("contain", "$155");
    cy.contains('[data-cy="seller-offer"]', "Stadium Goods").should("contain", "Price unavailable for this size");
    cy.get("select").select("");
    cy.contains('[data-cy="seller-offer"]', "StockX").should("contain", "From $120");
  });

  it("keeps available seller prices when a provider fails", () => {
    cy.intercept("GET", "**/id/*/prices", {
      body: {
        ...sneaker,
        resellPrices: { goat: { "8": 135 } },
        providerErrors: [{ provider: "stockX", operation: "prices", message: "Provider unavailable" }],
      },
    });
    cy.visit("/sneaker/HQ7978-001");
    cy.contains('[role="status"]', "StockX").should("be.visible");
    cy.contains('[data-cy="seller-offer"]', "GOAT").should("contain", "From $135");
  });

  it("shows a retry action for API errors", () => {
    cy.intercept(popularRoute, { statusCode: 502, body: { error: "Provider unavailable" } });
    cy.visit("/popular");
    cy.contains('[role="alert"]', "Unable to load popular sneakers.").should("be.visible");
    cy.intercept(popularRoute, { body: [sneaker] });
    cy.contains("button", "Try again").click();
    cy.contains("h3", sneaker.shoeName).should("be.visible");
  });

  it("shows a product-not-found page for missing detailed prices", () => {
    cy.intercept("GET", "**/id/*/prices", { statusCode: 404, body: { error: "Product Not Found" } });
    cy.visit("/sneaker/missing");
    cy.contains('[role="alert"]', "Product Not Found").should("be.visible");
  });

  it("shows every size and seller together in a table that fits mobile", () => {
    cy.viewport(390, 844);
    cy.visit("/sneaker/HQ7978-001");
    cy.get('[data-cy="size-price-table"] thead').within(() => {
      for (const name of ["Size", "GOAT", "StockX", "Flight Club", "Stadium Goods"]) {
        cy.contains("th", name).should("exist");
      }
    });
    cy.get('[data-cy="size-price-table"] tbody tr').should("have.length", 2);
    cy.get('tr[data-size="8"]').within(() => {
      cy.get('td[data-seller="goat"]').should("have.text", "$135");
      cy.get('td[data-seller="stockX"]').should("have.text", "$120").and("have.class", "size-price-table--lowest");
    });
    cy.get('tr[data-size="9"]').within(() => {
      cy.get('td[data-seller="goat"]').should("have.text", "$140");
      cy.get('td[data-seller="flightClub"]').should("have.text", "$155");
      cy.get('td[data-seller="stadiumGoods"] [aria-label="Price unavailable"]').should("have.text", "—");
      cy.get('td[data-seller="stockX"]').should("have.text", "$130");
    });
    cy.contains("button", "9").click();
    cy.get("select").should("have.value", "9");
    cy.contains('[data-cy="seller-offer"]', "StockX").should("contain", "$130");
    cy.get('[data-cy="size-price-table"] tbody tr').should("have.length", 2);
    cy.get('[aria-label="Size and seller prices"]').scrollTo("right");
    cy.get('tr[data-size="8"] button').should("be.visible");
    cy.get("select").select("8");
    cy.get('tr[data-size="8"] button').should("have.attr", "aria-pressed", "true");
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(390);
    });
  });

  it("handles a table with one size or no available size prices", () => {
    cy.intercept("GET", "**/id/*/prices", {
      body: { ...sneaker, resellPrices: { goat: { "8": 135 } } },
    });
    cy.visit("/sneaker/HQ7978-001");
    cy.get('[data-cy="size-price-table"] tbody tr').should("have.length", 1);
    cy.get('tr[data-size="8"] td[data-seller="goat"]').should("have.text", "$135");
    cy.intercept("GET", "**/id/*/prices", {
      body: { ...sneaker, resellPrices: {} },
    });
    cy.reload();
    cy.contains("Size prices aren’t available for this sneaker yet.").should("be.visible");
    cy.get('[data-cy="size-price-table"] table').should("not.exist");
  });
});
