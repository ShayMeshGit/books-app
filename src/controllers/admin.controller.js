const Book = require("../models/book.model");

exports.getAddBook = (req, res, next) => {
  res.render("admin/edit-book", {
    path: "/add-book",
    isLoggedIn: true,
    isAdmin: true,
    isEditing: false,
  });
};

exports.postAddBook = async (req, res, next) => {
  const {
    title,
    description,
    price,
    author,
    publishDate,
    pagesNumber,
    imageUrl,
  } = req.body;
  const newBook = new Book({
    title,
    description,
    price,
    author,
    publishDate: new Date(publishDate),
    pagesNumber,
    imageUrl,
  });
  try {
    await newBook.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.getEditBook = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    res.render("admin/edit-book", {
      path: "/edit-book",
      isLoggedIn: true,
      isAdmin: true,
      isEditing: true,
      book,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.postEditBook = async (req, res, next) => {
  const { bookId } = req.params;
  const {
    title,
    description,
    price,
    author,
    publishDate,
    pagesNumber,
    imageUrl,
  } = req.body;
  try {
    const book = await Book.findById(bookId);
    book.title = title;
    book.description = description;
    book.price = price;
    book.author = author;
    book.publishDate = new Date(publishDate);
    book.pagesNumber = pagesNumber;
    book.imageUrl = imageUrl;
    await book.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.deleteBook = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    await Book.findByIdAndDelete(bookId);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
