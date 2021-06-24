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
});
