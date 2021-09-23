import users from "../../fixtures/users.json";

describe("Filtering tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("/");
    cy.wait(["@getUsers"]);
  });

  it("Filters correctlly", () => {
    cy.get("input[name=search-input]").type("jAc    ");
    cy.get("[data-cy=users-list]").contains(users[0].name);
    cy.get("[data-cy=users-list]").contains(users[1].name);
    cy.get("[data-cy=users-list]").children().should("have.length", 2);
  });

  it("Show all users after clearing search box", () => {
    cy.get("input[name=search-input]").type("bleblebleblebleble");
    cy.get("[data-cy=info]").should("be.visible");
    cy.get("input[name=search-input]").clear();
    cy.get("[data-cy=users-list]").should("be.visible");
    cy.get("[data-cy=users-list]").children().should("have.length", 4);
    cy.get("[data-cy=info]").should("not.exist");
  });
});

describe("Behavior while fetching", () => {
  it("Spinner is shown while fetching", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("/");
    cy.get("[data-cy=spinner]").should("be.visible");
    cy.get("[data-cy=users-list]").should("not.exist");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=spinner]").should("not.exist");
    cy.get("[data-cy=users-list]").should("be.visible");
  });

  it("Error is shown when fetching fails", () => {
    cy.intercept("GET", "/users*", { forceNetworkError: true }).as("getUsers");
    cy.visit("/");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=error]").should("be.visible");
  });

  it("Input is disable while fetching users", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("/");
    cy.get("[data-cy=searchBox]").should("be.disabled");
  });
});

describe("Users list tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("/");
    cy.wait(["@getUsers"]);
  });

  it("Info about user is displayed", () => {
    cy.get("[data-cy=user-info]").first().contains(users[0].name);
    cy.get("[data-cy=user-info]").first().contains(`@${users[0].username}`);
  });

  it("Input have a placeholder", () => {
    cy.get("[data-cy=searchBox]").should("have.attr", "placeholder");
  });

  it("Input is focused after fetching", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit("/");
    cy.wait(["@getUsers"]);
    cy.get("[data-cy=searchBox]").should("be.focused");
  });
});
