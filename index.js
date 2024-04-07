const myLibrary = [];

function Book(author, title, pages) {
  this.author = author;
  this.title = title;
  this.pages = pages;
}

function addBookToLibrary() {
  const book = new Book(author.value, title.value, pages.value);
  myLibrary.push(book);
}

function displayForm () {
    form.style.display = "flex";
    instructions.style.display = "block";
}

function hideForm () {
  if (form.style.display == "flex" && instructions.style.display == "block") {
    form.style.display = "none";
    instructions.style.display = "none";
  }
}

const newBookButton = document.getElementById("new-book-btn");

const cancelButton = document.getElementById("form-cancel-btn");

const instructions = document.getElementById("instructions");

const form = document.getElementById("form");

const author = document.getElementById("author");

const title = document.getElementById("title");

const pages = document.getElementById("pages");

const formAddButton = document.getElementById("form-add-btn");

const bookCard = document.createElement('div');

bookCard.setAttribute("style", "color: blue; background: white;");

newBookButton.addEventListener("click", displayForm);

cancelButton.addEventListener("click", hideForm);

