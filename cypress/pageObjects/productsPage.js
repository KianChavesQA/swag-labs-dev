class ProductsPage {
  visit() {
    cy.visit("/inventory.html");
  }

  getProductList() {
    return cy.get(".inventory_list");
  }

  getProductItem(index) {
    return this.getProductList().find(".inventory_item").eq(index);
  }

  addToCart(productIndex) {
    this.getProductItem(productIndex).find(".btn_inventory").click();
  }

  getCartBadge() {
    return cy.get(".shopping_cart_badge");
  }

  goToCart() {
    cy.get(".shopping_cart_link").click();
  }
  verifyLoginSuccess() {
    cy.location("pathname").should("include", "/inventory.html");
    cy.get(".product_label").should("contain", "Products");
  }
}
export default ProductsPage;
