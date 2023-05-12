import users from "../fixtures/users.json";

describe("Search box", () => {
  it("Is disabled while fetching users", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("localhost:3000/");
    cy.get("[data-cy=searchBox]").should("be.disabled");
  });

  it("Have a placeholder", () => {
    cy.visit("localhost:3000/");
    cy.get("[data-cy=searchBox]").should("have.attr", "placeholder");
  });

  it("Is focused after fetching", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("localhost:3000/");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=searchBox]").should("be.focused");
  });
});

describe("Fetching", () => {
  it("Spinner is shown while fetching", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("localhost:3000/");
    cy.get("[data-cy=spinner]").should("be.visible");
    cy.get("[data-cy=users-list]").should("not.exist");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=spinner]").should("not.exist");
    cy.get("[data-cy=users-list]").should("be.visible");
  });

  it("Error is shown when fetching fails", () => {
    cy.intercept("GET", "/users*", { forceNetworkError: true }).as("getUsers");
    cy.visit("localhost:3000/");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=error]").should("be.visible");
  });

  it("Fetching fake users works", () => {
    cy.intercept("GET", "/users*").as("getUsers");
    cy.visit("localhost:3000/");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=users-list]").children().should("have.length", 10);
  });
});

describe("Users list", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("localhost:3000/");
    cy.wait(["@getUsers"]);
  });

  it("Is filtered correctly", () => {
    cy.get("input[name=search-input]").type("jAc    ");
    cy.get("[data-cy=users-list]").contains(users[0].name);
    cy.get("[data-cy=users-list]").contains(users[1].name);
    cy.get("[data-cy=users-list]").children().should("have.length", 2);
  });

  it("Shows info when no user was matched", () => {
    cy.get("input[name=search-input]").type("bleblebleblebleble");
    cy.get("[data-cy=info]").should("be.visible");
    cy.get("input[name=search-input]").clear();
    cy.get("[data-cy=users-list]").should("be.visible");
    cy.get("[data-cy=users-list]").children().should("have.length", 4);
    cy.get("[data-cy=info]").should("not.exist");
  });

  it("Shows neccessary user info", () => {
    cy.get("[data-cy=user-info]").first().contains(users[0].name);
    cy.get("[data-cy=user-info]").first().contains(`@${users[0].username}`);
  });
});
