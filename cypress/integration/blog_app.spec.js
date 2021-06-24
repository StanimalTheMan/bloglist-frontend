describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // create here a user to backend
    const user = {
      username: "stanimal69",
      name: "Stan Choy",
      password: "wetnoodle74",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("stanimal69");
      cy.get("#password").type("wetnoodle74");
      cy.get("#login-button").click();

      cy.contains("Stan Choy logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("stanimal");
      cy.get("#password").type("wetnoodle");
      cy.get("#login-button").click();

      cy.contains("wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // login user here
      cy.get("input:first").type("stanimal69");
      cy.get("input:last").type("wetnoodle74");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Bee Awareness by a Chemist");
      cy.get("#author").type("Stan Lee");
      cy.get("#url").type("https://chronicleflask.com/2021/05/");
      cy.get("#create").click();
      cy.contains("Bee Awareness by a Chemist Stan Lee");
    });
  });

  describe("and a blog exists", function () {
    beforeEach(function () {
      cy.get("input:first").type("stanimal69");
      cy.get("input:last").type("wetnoodle74");
      cy.get("#login-button").click();
      cy.contains("create new blog").click();
      cy.get("#title").type("Bee Awareness by a Chemist");
      cy.get("#author").type("Stan Lee");
      cy.get("#url").type("https://chronicleflask.com/2021/05/");
      cy.get("#create").click();
    });

    it("it can be liked and the count goes from 0 to 1", function () {
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains(1);
    });
  });
});
