import { Router } from "express";
import {
  productMetalToneListFn,
  productListUserSideFn,
  productGetByIdUserSideFn,
  trendingProductListUserSideFn,
  featuredProductListUserSideFn,
  addProductWishListFn,
  getProductWishListByUserIdFn,
  deleteProductWishListFn,
  addToCartProductAPIFn,
  cartProductListByUSerIdFn,
  deleteCartProductFn,
  wishlistCartListCountFn,
  searchProductGloballyFn,
  cartProductListgustCheckOutFn,
  addVariantProductIntoWishListFn,
  getVariantProductWishlistByUserIdFn,
  deleteVariantProductWishListFn,
  getAllProductImageNamePublicAPIFn,
  getAllProductSlugFn,
  similarProductListFn,
  getProductImagesUsingS3AndAddInDBFn,
  getWishListProductsForProductListAndDetailFn,
  deleteVariantProductWishListWithProductFn,
  addProductSearchValueFn,
  productSearchListForUserFn,
  deleteProductSearchValueForUserFn,
  withoutVariantProductExportFn,
  moveProductCartToWishlistFn,
  getProductsBasedOnTheSettingStyleFn,
} from "../../controllers/product.controller";
import {
  customerAuthorization,
  publicAuthentication,
} from "../../../middlewares/authenticate";
import {
  reqArrayImageParser,
  reqProductBulkUploadFileParser,
  reqSingleImageParser,
} from "../../../middlewares/multipart-file-parser";
import {
  addProductCartListValidator,
  addProductWishListValidator,
  birthstoneProductDetailValidator,
  deleteCartProductValidator,
} from "../../../validators/product/product.validator";
import {
  addProductReviewFn,
  getProductReviewByProductIDFn,
} from "../../controllers/product-review.controller";
import { currencyMiddleware } from "../../../middlewares/currency-rate-change";

export default (app: Router) => {
 
  app.get("/products-list", [currencyMiddleware], productListUserSideFn);
  app.get("/products-featured-list",[currencyMiddleware], featuredProductListUserSideFn);
  app.get("/products-trending-list",[currencyMiddleware], trendingProductListUserSideFn);
  app.post(
    "/products-details",
    [currencyMiddleware],
    productGetByIdUserSideFn
  );
  app.post(
    "/products-wishlist-add",
    [customerAuthorization, addProductWishListValidator],
    addProductWishListFn
  );
  app.post(
    "/products-wishlist-list",
    [customerAuthorization],
    getProductWishListByUserIdFn
  );
  app.post(
    "/products-wishlist-delete",
    [customerAuthorization, addProductWishListValidator],
    deleteProductWishListFn
  );

  app.post(
    "/products-cart-add",
    [customerAuthorization, addProductCartListValidator],
    addToCartProductAPIFn
  );
  app.post(
    "/products-cart-list",
    [customerAuthorization],
    cartProductListByUSerIdFn
  );
  app.post(
    "/products-cart-delete",
    [customerAuthorization, deleteCartProductValidator],
    deleteCartProductFn
  );
  
  app.post(
    "/products-cart-list-gust",
    [currencyMiddleware],
    cartProductListgustCheckOutFn
  );

  app.post(
    "/products-review-add",
    [
      customerAuthorization,
      reqArrayImageParser(["images"]),
      addProductWishListValidator,
    ],
    addProductReviewFn
  );
  app.post("/products-review-list", getProductReviewByProductIDFn);

  app.post("/products-wish-cart-count", wishlistCartListCountFn);
  app.get(
    "/products-serach-list",
    [currencyMiddleware],
    searchProductGloballyFn
  );


  /* new diamond master base One combination config product */

  // app.post(
  //   "/product/config/one-combination/add",
  //   [reqProductBulkUploadFileParser("config_csv")],
  //   addConfigProductsOneCombinationFromCSVFileFn
  // );

  /* config product find based on sku */

  /* ------------------- variant product wish list CRUD ----------------------- */

  app.post(
    "/products-variant-wishlist",
    [reqSingleImageParser("image")],
    [customerAuthorization, addProductWishListValidator],
    addVariantProductIntoWishListFn
  );
  app.get(
    "/products-variant-wishlist-:user_id",
    [customerAuthorization, currencyMiddleware],
    getVariantProductWishlistByUserIdFn
  );

  app.get(
    "/products-wishlist-:user_id",
    getWishListProductsForProductListAndDetailFn
  );
  app.delete(
    "/products-variant-wishlist-:user_id-:whishlist_id",
    [customerAuthorization],
    deleteVariantProductWishListFn
  );
  app.patch(
    "/products-variant-wishlist-delete",
    [customerAuthorization],
    deleteVariantProductWishListWithProductFn
  );

  app.get("/products-slug", getAllProductSlugFn);

  app.get("/similar-products-:slug", [currencyMiddleware], similarProductListFn);

  // app.get("/export/without-variant-products", withoutVariantProductExportFn);



  app.post("/products-search", addProductSearchValueFn);
  app.get("/products-search", productSearchListForUserFn);
  app.delete("/products-search-:ids", deleteProductSearchValueForUserFn);

  
  app.post(
    "/products-wishlist-:cart_id",
    [customerAuthorization],
    moveProductCartToWishlistFn
  );

  app.post("/choose-setting-product-detail",[currencyMiddleware], getProductsBasedOnTheSettingStyleFn)
};
