# ROUTE_CHANGES

This file lists all route path changes applied under `src/version-one/routes` during the normalization pass.

WARNING: These are breaking changes for any clients that call the old paths. Update callers accordingly.

---

## Frontend routes

### enquiriesUser.route.ts
- POST `/general/enquiries`  -> POST `/enquiries`
- POST `/product/enquiries`  -> POST `/enquiries/product`

### masterUser.route.ts
- GET  `/country/list`       -> GET  `/countries`
- POST `/state/list`         -> POST `/states`
- POST `/city/list`          -> POST `/cities`
- POST `/addres/add`         -> POST `/addresses/add` (fixed typo)
- POST `/address/get`        -> POST `/addresses/get`
- PUT  `/address/edit`       -> PUT  `/addresses/edit`
- POST `/address/delete`     -> POST `/addresses/delete`

### homeAbout-Customer.route.ts
- GET `/homeAndAbout/section` -> GET `/home-about/sections`

### flter-list-data.route.ts
- GET `/filter/list/diamond`  -> GET `/filters/diamond`
- GET `/filter/list/metal`    -> GET `/filters/metal`
- GET `/filter/list/category` -> GET `/filters/category`

## User-level routes

### payment.route.ts
- POST `/paymet/add`          -> POST `/payment/add`
- POST `/paymet/paypal/add`   -> POST `/payment/paypal/add`

### staticPage.route.ts
- POST `/staticPage`          -> POST `/static-page`

### companyinfo.route.ts
- GET `/companyinfo`          -> GET `/company-info`
- GET `/companyinfo/admin`    -> GET `/company-info/admin`

### attributes.route.ts
- GET `/attribute/metal-rate/logs` -> GET `/attributes/metal-rate/logs`
- GET `/attribute/brand-list`      -> GET `/attributes/brands`
- GET `/attribute/collection-list` -> GET `/attributes/collections`

### blogs.route.ts
- GET `/blogs/list`           -> GET `/blogs`
- POST `/blogs/details`       -> POST `/blogs/details` (unchanged)

### allProductAddCart.ts
- POST `/all/product/cart/add`            -> POST `/cart/products/add`
- POST `/all/product/add/order`           -> POST `/orders/add`
- POST `/all/product/add/payment/affirm`  -> POST `/orders/payment/affirm`
- POST `/all/retail/product/cart/list`    -> POST `/cart/retail/list`
- POST `/all/product/cart/merge`          -> POST `/cart/merge`

### about-us.route.ts
- GET `/about-us`             -> GET `/about-us/sections`

### filters.route.ts
- GET `/filter`               -> GET `/filters`

### coupon.route.ts
- POST `/coupon`              -> POST `/coupons/apply`
- DELETE `/coupon`            -> DELETE `/coupons/remove`

### faq-question-answer.route.ts
- GET `/faq`                  -> GET `/faqs`

### info-section.route.ts
- GET `/info-section`         -> GET `/info-sections`

### master.route.ts
- GET `/add-product/dropDown/list`   -> GET `/products/dropdown`
- GET `/config-select/dropDown/list` -> GET `/config-select/dropdown`

### loose-diamond.route.ts
- GET `/loose-diamond`                -> GET `/loose-diamonds`
- GET `/loose-diamond/:product_id`    -> GET `/loose-diamonds/:product_id`

### mega-menu.route.ts
- GET `/mega-menu`            -> GET `/mega-menus`

### meta-data.route.ts
- GET `/meta-data`            -> GET `/meta-data/list`

### order.route.ts
- POST `/order/add`           -> POST `/orders`
- GET  `/order/list`          -> GET  `/orders`
- POST `/order/details`       -> POST `/orders/details`
- POST `/order/paypal/add`    -> POST `/orders/paypal/add`

## Product routes (major changes)

The product routes were first normalized to `/products/...` and then converted so that internal `/` separators were replaced with `-` within the route string (per request). Example transformations follow.

- GET `/product/list`                         -> GET `/products-list`
- GET `/product/featured/list`                -> GET `/products-featured-list`
- GET `/product/trending/list`                -> GET `/products-trending-list`
- POST `/product/details`                     -> POST `/products-details`

- POST `/product/wishlist/add`                -> POST `/products-wishlist-add`
- POST `/product/wishlist/list`               -> POST `/products-wishlist-list`
- POST `/product/wishlist/delete`             -> POST `/products-wishlist-delete`

- POST `/product/cart/add`                    -> POST `/products-cart-add`
- POST `/product/cart/list`                   -> POST `/products-cart-list`
- POST `/product/cart/delete`                 -> POST `/products-cart-delete`
- POST `/product/cart/list/gust`              -> POST `/products-cart-list-gust`

- POST `/product/review/add`                  -> POST `/products-review-add`
- POST `/product/review/list`                 -> POST `/products-review-list`
- POST `/product/wish/cart/count`             -> POST `/products-wish-cart-count`

- GET  `/product/serach/list`                 -> GET  `/products-serach-list`

- POST `/product/variant/wishlist`            -> POST `/products-variant-wishlist`
- GET  `/product/variant/wishlist/:user_id`   -> GET  `/products-variant-wishlist-:user_id`
- GET  `/product-wishlist/:user_id`           -> GET  `/products-wishlist-:user_id`
- DELETE `/product/variant/wishlist/:user_id/:whishlist_id` -> DELETE `/products-variant-wishlist-:user_id-:whishlist_id`
- PATCH `/product/variant/wishlist-delete`    -> PATCH `/products-variant-wishlist-delete`

- GET `/product-slug`                         -> GET `/products-slug`
- GET `/similar-product/:slug`                -> GET `/similar-products-:slug`

- POST `/product-search`                      -> POST `/products-search`
- GET  `/product-search`                      -> GET  `/products-search`
- DELETE `/product-search/:ids`               -> DELETE `/products-search-:ids`

- POST `/product/wishlist/:cart_id`           -> POST `/products-wishlist-:cart_id`
- POST `/choose-setting-product/detail`       -> POST `/choose-setting-product-detail`


## subscription.route.ts
- POST `/subscription/add` -> POST `/subscription-add`

## auth.route.ts (many changes)
- POST `/customer/login`                    -> POST `/customer-login`
- POST `/registration/customer`             -> POST `/registration-customer`
- POST `/optVerified/customer`              -> POST `/optVerified-customer`
- POST `/reSend/Opt`                        -> POST `/reSend-Opt`
- PUT  `/customer/profile/edit`             -> PUT  `/customer-profile-edit`
- GET  `/user-detail/:id`                   -> GET  `/user-detail-:id`
- POST `/config/user/auth`                  -> POST `/config-user-auth`
- POST `/optVerified/config/user/auth`      -> POST `/optVerified-config-user-auth`
- POST `/customer/signup-third-party`      -> POST `/customer-signup-third-party`
- GET  `/menu-item-with-permission/:id`     -> GET  `/menu-item-with-permission-:id`
- DELETE `/menu-item-with-permission/:id`  -> DELETE `/menu-item-with-permission-:id`
- PATCH `/menu-item-with-permission/:id`   -> PATCH `/menu-item-with-permission-:id`
- POST `/otp-verified/admin/:id`           -> POST `/otp-verified-admin-:id`

Other auth endpoints were kept or normalized for hyphen style as appropriate (see `src/version-one/routes/auth.route.ts`).

---

If you want, I can:

- Commit this `ROUTE_CHANGES.md` to the repo (I can create it now). 
- Run a repo-wide search & update for the old paths in server-side code (risky for external clients — I will only update internal usages and list them). 
- Revert any specific rename.

Which next step do you want? (I recommend creating and committing `ROUTE_CHANGES.md`.)
