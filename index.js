const newBookButton = document.getElementById("new-book-btn");
const cancelButton = document.getElementById("form-cancel-btn");
const instructions = document.getElementById("instructions");
const form = document.getElementById("form");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const formAddButton = document.getElementById("form-add-btn");
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
  displayBook(book);
}

function displayBook(bookObject) {
  const newBook = document.createElement("div");
  newBook.classList.add("book");
  booksContainer.appendChild(newBook);

  const bookTitle = document.createElement("h2");
  bookTitle.setAttribute("id", "book-title");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("span");
  bookAuthor.setAttribute("id", "book-author");
  bookAuthor.innerText = bookObject.author;

  const bookButtons = document.createElement("div");
  bookButtons.classList.add("book-btns");

  const readStatusButton = document.createElement("button");
  readStatusButton.setAttribute("type", "button");
  readStatusButton.classList.add("status");
  readStatusButton.innerText = "Read: " + bookObject.isRead;
  readStatusButton.addEventListener("click", () => {
    bookObject.toggleReadStatus();
    readStatusButton.innerText = "Read: " + bookObject.isRead;
  });

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    bookObject.deleteBook();
    newBook.remove();
  });
  bookButtons.append(readStatusButton, deleteButton);

  const numberOfPages = document.createElement("span");
  numberOfPages.setAttribute("id", "nb-of-pages");
  numberOfPages.innerText = pages.value;
  newBook.append(bookTitle, bookAuthor, bookButtons, numberOfPages);

  newBook.dataset.bookIndex = myLibrary.indexOf(bookObject);
  return newBook;
}

function hideForm() {
  if (
    form.className == "d-flex" &&
    instructions.style.display == "block" &&
    booksContainer.className == "d-none"
  ) {
    form.classList.remove("d-flex");
    form.classList.add("d-none");
    instructions.style.display = "none";
    booksContainer.classList.remove("d-none");
    booksContainer.classList.add("d-flex");
  }
}

newBookButton.addEventListener("click", () => {
  form.classList.remove("d-none");
  form.classList.add("d-flex");
  instructions.style.display = "block";
  booksContainer.classList.remove("d-flex");
  booksContainer.classList.add("d-none");
});

cancelButton.addEventListener("click", hideForm);

formAddButton.addEventListener("click", () => {
  hideForm();
  addBookToLibrary();
  author.value = "";
  title.value = "";
  pages.value = "";

  const radioButtons = document.querySelectorAll(
    "input[type=radio][name=isRead]"
  );
  radioButtons.forEach((button) => {
    button.checked = false;
  });
});
