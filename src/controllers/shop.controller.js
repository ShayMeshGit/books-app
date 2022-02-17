const Book = require("../models/book.model");

exports.getIndex = async (req, res, next) => {
  const { isLoggedIn } = req.session;
  const { isAdmin } = req.session;
  try {
    const books = await Book.find();
    res.render("./shop", {
      path: "/",
      isLoggedIn,
      books,
      isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.getBook = async (req, res, next) => {
  const { isAdmin, isLoggedIn } = req.session;
  const { bookId } = req.params;
  try {
    const book = await Book.findById(bookId);
    console.log(book);
    if (!book) {
      return res.redirect("/");
    }
    res.render("shop/book-details", {
      path: "/",
      title: book.title,
      book,
      isAdmin,
      isLoggedIn,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.getCart = async (req, res, next) => {
  const { isLoggedIn, isAdmin } = req.session;
  let cartBooks = [];
  try {
    if (isLoggedIn) {
      const user = await req.user.populate("cart.items.bookId");
      cartBooks = [...user.cart.items];
    }
    res.render("shop/cart", {
      path: "/cart",
      isLoggedIn,
      isAdmin,
      cartBooks,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.postCart = async (req, res, next) => {
  const { isLoggedIn } = req.session;
  const { bookId } = req.body;
  try {
    if (isLoggedIn) {
      const book = await Book.findById(bookId);
      await req.user.addToCart(book);
    }
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.deleteCartItem = async (req, res, next) => {
  const { bookId } = req.body;
  try {
    await req.user.removeFromCart(bookId);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

exports.postClearCart = async (req, res, next) => {
  const { isAdmin, isLoggedIn } = req.session;
  try {
    await req.user.clearCart();
    res.render("shop/checkout", {
      path: "/cart",
      isAdmin,
      isLoggedIn,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
