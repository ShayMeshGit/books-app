const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");

router.get("/", shopController.getIndex);

router.get("/book/:bookId", shopController.getBook);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete", shopController.deleteCartItem);

router.post("/cart-buy", shopController.postClearCart);

module.exports = router;
