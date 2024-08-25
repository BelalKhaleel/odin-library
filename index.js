const dialog = document.querySelector('dialog');
const newBookButton = document.getElementById("new-book-btn");
const cancelButton = document.getElementById("form-cancel-btn");
const instructions = document.getElementById("instructions");
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

addBookButton.addEventListener("click", e => {
  e.preventDefault();

  if (!title.value || !author.value || !pages.value) {
    instructions.style.color = 'red';
    instructions.style.fontSize = '1.5rem';
    instructions.style.left = '-104px';
    return;
  }

  instructions.style.color = 'black';
  instructions.style.fontSize = '1rem';
  instructions.style.left = '-15px';
  
  addBookToLibrary();
  dialog.close();
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

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    instructions.style.display = "none";
  }
});