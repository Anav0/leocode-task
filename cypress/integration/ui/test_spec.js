import { User } from "../../../src/models/user";
import users from "../../fixtures/users.json";

const URL = "http://localhost:3000";

describe("Filtering tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit(URL);
    cy.wait(["@getUsers"]);
  });

  it("Filters correctlly", () => {
    cy.get("input[name=search-input]").type("jAc    ");
    cy.get(".App__user-list").contains(users[0].name);
    cy.get(".App__user-list").contains(users[1].name);
    cy.get(".App__user-list").children().should("have.length", 2);
  });

  it("Show all users after clearing search box", () => {
    cy.get("input[name=search-input]").type("bleblebleblebleble");
    cy.get(".App__info").should("be.visible");
    cy.get("input[name=search-input]").clear();
    cy.get(".App__user-list").should("be.visible");
    cy.get(".App__user-list").children().should("have.length", 4);
    cy.get(".App__info").should("not.exist");
  });
});

describe("Behavior while fetching", () => {
  it("Spinner is shown while fetching", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit(URL);
    cy.get(".spinner").should("be.visible");
    cy.get(".App__user-list").should("not.exist");
    cy.wait(["@getUsers"]);
    cy.get(".spinner").should("not.exist");
    cy.get(".App__user-list").should("be.visible");
  });

  it("Error is shown when fetching fails", () => {
    cy.intercept("GET", "/users*", { forceNetworkError: true }).as("getUsers");
    cy.visit(URL);
    cy.wait(["@getUsers"]);
    cy.get(".App__error").should("be.visible");
  });

  it("Input is disable while fetching users", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit(URL);
    cy.get(".App__content .base-input").should("be.disabled");
  });

  it("Input is focused after fetching", () => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit(URL);
    cy.wait(["@getUsers"]);
    cy.get(".App__content .base-input").should("be.focused");
  });
});

describe("Users list tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/users*", { fixture: "users" }).as("getUsers");
    cy.visit(URL);
    cy.wait(["@getUsers"]);
  });

  it("Info about user is displayed", () => {
    cy.get(".user-info:first").contains(users[0].name);
    cy.get(".user-info:first").contains(`@${users[0].username}`);
  });

  it("Input have a placeholder", () => {
    cy.get(".App__content .base-input").should("have.attr", "placeholder");
  });
});
