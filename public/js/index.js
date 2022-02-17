const main = async () => {
  const data = await fetch("http://localhost:3000/api/books");
  const { books, isAdmin, isLoggedIn } = await data.json();

  const search = document.getElementById("search");
  const booksList = document.getElementById("books-list");

  let searchTerm = "";

  const createBookCard = (book) => {
    const bookItemDiv = document.createElement("div");
    bookItemDiv.classList.add("book-item");

    const bookImg = document.createElement("img");
    bookImg.src = book.imageUrl;
    bookImg.alt = book.title;
    bookImg.width = 100;
    bookImg.height = 200;

    const bookTitleSpan = document.createElement("span");
    bookTitleSpan.id = "book-title";
    bookTitleSpan.innerText = book.title;

    const bookPriceSpan = document.createElement("span");
    bookPriceSpan.id = "book-price";
    bookPriceSpan.innerText = `${book.price}$`;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("book-actions");

    const addToCartForm = document.createElement("form");
    addToCartForm.id = "add-to-cart-btn";

    if (isLoggedIn) {
      addToCartForm.method = "POST";
      addToCartForm.action = "/cart";
    } else {
      addToCartForm.addEventListener("submit", addToCart);
    }

    const addToCartInput = document.createElement("input");
    addToCartInput.type = "hidden";
    addToCartInput.name = "bookId";
    addToCartInput.value = book._id;

    if (!isLoggedIn) {
      const addToCartData = document.createElement("input");
      addToCartData.type = "hidden";
      addToCartData.name = "bookId";
      addToCartData.value = JSON.stringify(book);
      addToCartForm.appendChild(addToCartData);
    }

    const addToCartButton = document.createElement("button");
    addToCartButton.type = "submit";
    addToCartButton.innerText = "add to cart";

    addToCartForm.appendChild(addToCartInput);
    addToCartForm.appendChild(addToCartButton);

    const detailsForm = document.createElement("form");
    detailsForm.id = "details-btn";
    detailsForm.method = "GET";
    detailsForm.action = `/book/${book._id}`;

    const detailsButton = document.createElement("button");
    detailsButton.type = "submit";
    detailsButton.innerText = "details";

    detailsForm.appendChild(detailsButton);

    const editForm = document.createElement("form");
    editForm.id = "edit-btn";
    editForm.method = "GET";
    editForm.action = `/admin/edit-book/${book._id}`;

    const editButton = document.createElement("button");
    editButton.type = "submit";
    editButton.innerText = "edit";

    editForm.appendChild(editButton);

    const deleteForm = document.createElement("form");
    deleteForm.id = "delete-btn";
    deleteForm.method = "GET";
    deleteForm.action = `/admin/delete-book/${book._id}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "submit";
    deleteButton.innerText = "delete";

    deleteForm.appendChild(deleteButton);

    if (!isAdmin) {
      actionsDiv.appendChild(addToCartForm);
    }

    actionsDiv.appendChild(detailsForm);

    if (isAdmin) {
      actionsDiv.appendChild(editForm);
      actionsDiv.appendChild(deleteForm);
    }

    bookItemDiv.appendChild(bookImg);
    bookItemDiv.appendChild(bookTitleSpan);
    bookItemDiv.appendChild(bookPriceSpan);
    bookItemDiv.appendChild(actionsDiv);
    return bookItemDiv;
  };

  const showBooks = () => {
    booksList.innerHTML = "";
    const filteredBooks = books.filter((book) => {
      return book.title.toLowerCase().includes(searchTerm);
    });

    if (filteredBooks.length === 0) {
      booksList.innerHTML = "<h1>No Books To Show!</h1>";
    }

    filteredBooks.forEach((book) => {
      const bookItemDiv = createBookCard(book);
      booksList.appendChild(bookItemDiv);
    });
  };

  showBooks();

  search.addEventListener("input", (event) => {
    searchTerm = event.target.value.toLowerCase();
    showBooks();
  });
};

main();

function addToCart(e) {
  e.preventDefault();
  const book = JSON.parse(e.target[0].value);
  const localData = localStorage.getItem("USER_CART");
  if (!localData) {
    const data = [
      {
        _id: book._id,
        title: book.title,
        price: book.price,
        quantity: 1,
      },
    ];
    localStorage.setItem("USER_CART", JSON.stringify(data));
    return (location.href = "http://localhost:3000/cart");
  }

  const cartItems = JSON.parse(localData);

  const cartBookIndex = cartItems.findIndex((b) => {
    return b._id.toString() === book._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...cartItems];

  if (cartBookIndex >= 0) {
    newQuantity = cartItems[cartBookIndex].quantity + 1;
    updatedCartItems[cartBookIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      _id: book._id,
      title: book.title,
      price: book.price,
      quantity: newQuantity,
    });
  }

  localStorage.setItem("USER_CART", JSON.stringify(updatedCartItems));
  location.href = "http://localhost:3000/cart";
}
