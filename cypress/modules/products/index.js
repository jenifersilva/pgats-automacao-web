import titles from "../../fixtures/titles.json";

class Products {
  elements = {
    productsListTitle: () => cy.get(".title"),
    searchInput: () => cy.get("input[id='search_product']"),
    submitSearchBtn: () => cy.get("button[id='submit_search']"),
    productList: () => cy.get(".features_items"),
    productCard: () => cy.get(".single-products"),
    viewProductBtn: () => cy.get(".choose"),
    addToCartListBtn: () => cy.get(".productinfo > a.add-to-cart"),
    continueShoppingBtn: () => cy.get(".close-modal"),
    viewCartBtn: () => cy.get("a[href='/view_cart'] > u"),
    productDetailsArea: () => cy.get(".product-information"),
    productNameLbl: () => cy.get(".product-information > h2"),
    productCategoryLbl: () => cy.get(".product-information > p").first(),
    productPriceLbl: () => cy.get(".product-information > span > span"),
    productQuantityInput: () => cy.get('[name="quantity"]'),
    addToCartDetailsBtn: () => cy.get(".cart"),
    productAvailabilityLbl: () => cy.get(".product-information > p").eq(1),
    productConditionLbl: () => cy.get(".product-information > p").eq(2),
    productBrandLbl: () => cy.get(".product-information > p").eq(3),
  };

  checkAllProductsTitle() {
    this.elements.productsListTitle().should("have.text", titles.all_products);
  }

  checkProductList() {
    this.elements.productList().should("be.visible");
  }

  searchProduct(productName) {
    this.elements.searchInput().type(productName);
    this.elements.submitSearchBtn().click();
  }

  checkSearchedProducts() {
    this.elements
      .productsListTitle()
      .should("have.text", titles.searched_products);

    this.elements.productCard().should("have.length", 1);
  }

  addProductToCartFromList(index) {
    this.elements.addToCartListBtn().eq(index).click();
  }

  goToCart() {
    this.elements.viewCartBtn().click();
  }

  closeCartModal() {
    this.elements.continueShoppingBtn().click();
  }

  goToProductDetail(index) {
    this.elements.viewProductBtn().eq(index).click();
  }

  checkProductInformation() {
    this.elements.productDetailsArea().should("be.visible");
    this.elements.productNameLbl().should("be.visible").should("not.be.empty");
    this.elements
      .productCategoryLbl()
      .should("be.visible")
      .should("not.be.empty");
    this.elements.productPriceLbl().should("be.visible").should("not.be.empty");
    this.elements
      .productAvailabilityLbl()
      .should("be.visible")
      .should("not.be.empty");
    this.elements
      .productConditionLbl()
      .should("be.visible")
      .should("not.be.empty");
    this.elements.productBrandLbl().should("be.visible").should("not.be.empty");
  }

  updateQuantity(quantity) {
    this.elements.productQuantityInput().clear().type(quantity);
  }

  addProductToCartFromDetails() {
    this.elements.addToCartDetailsBtn().click();
  }
}
export default new Products();
