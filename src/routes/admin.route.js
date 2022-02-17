const express = require("express");
const router = express.Router();

const isAdmin = require("../middlewares/isAdmin");
const adminController = require("../controllers/admin.controller");

router.get("/add-book", isAdmin, adminController.getAddBook);

router.post("/add-book", isAdmin, adminController.postAddBook);

router.get("/edit-book/:bookId", isAdmin, adminController.getEditBook);

router.post("/edit-book/:bookId", isAdmin, adminController.postEditBook);

router.get("/delete-book/:bookId", isAdmin, adminController.deleteBook);

module.exports = router;
