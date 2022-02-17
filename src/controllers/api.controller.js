const Book = require("../models/book.model");

exports.getBooks = async (req, res, next) => {
  const { isAdmin, isLoggedIn } = req.session;
  try {
    const books = await Book.find();
    res.json({
      books,
      isAdmin,
      isLoggedIn,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong" });
  }
};
