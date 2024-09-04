const dialog = document.querySelector("dialog");
const newBookButton = document.getElementById("new-book-btn");
const cancelButton = document.getElementById("form-cancel-btn");
const form = document.getElementById("form");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const addBookButton = document.getElementById("form-add-btn");
const booksContainer = document.getElementById("books-container");
const myLibrary = [];

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = this.isRead === "yes" ? "no" : "yes";
  }

  deleteBook() {
    const bookIndex = myLibrary.indexOf(this);
    if (bookIndex > -1) {
      myLibrary.splice(bookIndex, 1);
    }
  }
}

function addBookToLibrary() {
  let isRead = document.querySelector("input[type=radio][name=isRead]:checked");
  const book = new Book(author.value, title.value, pages.value, isRead.value);
  myLibrary.push(book);

  const newBook = document.createElement("div");
  newBook.classList.add("book");
  booksContainer.appendChild(newBook);

  const bookTitle = document.createElement("h2");
  bookTitle.setAttribute("class", "book-title");
  bookTitle.innerText = book.title;

  const bookAuthor = document.createElement("span");
  bookAuthor.setAttribute("class", "book-author");
  bookAuthor.innerText = book.author;

  const bookButtons = document.createElement("div");
  bookButtons.classList.add("book-btns");

  const readStatusButton = document.createElement("button");
  readStatusButton.setAttribute("type", "button");
  readStatusButton.classList.add("status");
  readStatusButton.innerText = "Read: " + book.isRead;
  readStatusButton.addEventListener("click", () => {
    book.toggleReadStatus();
    readStatusButton.innerText = "Read: " + book.isRead;
  });

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    book.deleteBook();
    newBook.remove();
  });
  bookButtons.append(readStatusButton, deleteButton);

  const numberOfPages = document.createElement("span");
  numberOfPages.setAttribute("class", "nb-of-pages");
  numberOfPages.innerText = pages.value;
  newBook.append(bookTitle, bookAuthor, bookButtons, numberOfPages);

  newBook.dataset.bookIndex = myLibrary.indexOf(book);
  return newBook;
}

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

title.addEventListener("input", () => {
  if (title.validity.valueMissing) {
    title.setCustomValidity("Please enter a valid title.");
  } else {
    title.setCustomValidity("");
  }
});

author.addEventListener("input", () => {
  if (author.validity.valueMissing) {
    author.setCustomValidity("Please enter a valid author's name.");
  } else {
    author.setCustomValidity("");
  }
});

pages.addEventListener("input", () => {
  if (pages.validity.valueMissing) {
    pages.setCustomValidity("Please provide the number of pages of the book.");
  } else if (pages.validity.rangeOverflow) {
    pages.setCustomValidity("Number of pages cannot be more than 4,290.");
  } else if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("Number of pages cannot be less than 1.");
  } else {
    pages.setCustomValidity("");
  }
});

addBookButton.addEventListener("click", (e) => {
  let isValid = true;

  if (pages.validity.valueMissing) {
    pages.setCustomValidity("Please provide the number of pages of the book.");
    pages.reportValidity();
    isValid = false;
  } else if (pages.validity.rangeOverflow) {
    pages.setCustomValidity("Number of pages cannot be more than 4,290.");
    pages.reportValidity();
    isValid = false;
  } else if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("Number of pages cannot be less than 1.");
    pages.reportValidity();
    isValid = false;
  } else {
    pages.setCustomValidity("");
  }

  if (author.validity.valueMissing) {
    author.setCustomValidity("Please provide the name of the author's book.");
    author.reportValidity();
    isValid = false;
  } else {
    author.setCustomValidity("");
  }

  if (title.validity.valueMissing) {
    title.setCustomValidity("Please enter a title for the book.");
    title.reportValidity();
    isValid = false;
  } else {
    title.setCustomValidity("");
  }

  console.log(isValid);
  if (!isValid) {
    e.preventDefault();
  } else {
    addBookToLibrary();
    form.reset();
  }
});
