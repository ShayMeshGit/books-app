const express = require("express");
const router = express.Router();

const apiController = require("../controllers/api.controller");

router.get("/books", apiController.getBooks);

module.exports = router;
