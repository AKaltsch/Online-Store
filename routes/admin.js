const path = require("path");

const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// isAuth makes sure that a user is logged in before they can reach admin routes
// requests are read from left to right so isAuth will be looked at before any controller actions
router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.post(
  "/add-product",
  [
    body("title", "Please enter a valid title.")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl", "Please enter a valid URL.").isURL(),
    body("price", "Please enter a valid price").isFloat(),
    body("description", "Please enter a valid description.")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Please enter a valid title.")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl", "Please enter a valid URL.").isURL(),
    body("price", "Please enter a valid price").isFloat(),
    body("description", "Please enter a valid description.")
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
