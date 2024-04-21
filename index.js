const myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

// const book = new Book('J.K. Rowling', 'Harry Potter', 600, true);
// console.log(book);

function addBookToLibrary() {
  //take user’s input
  const book = new Book(author.value, title.value, pages.value, isRead.value);
  // bookTitle = document.getElementById("book-title");
  // bookTitle.innerText = title.value;
  // bookAuthor.innerText = author.value;
  // numberOfPages.innerText = pages.value;
  
  //store the new book objects into an array
  myLibrary.push(book);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    
  }
}

function displayForm () {
    form.style.display = "flex";
    instructions.style.display = "block";
    booksContainer.style.display = "none";
}

function hideForm () {
  if (form.style.display == "flex" && instructions.style.display == "block" && booksContainer.style.display == "none") {
    form.style.display = "none";
    instructions.style.display = "none";
    booksContainer.style.display = "flex";
  }
}

const newBookButton = document.getElementById("new-book-btn");

const cancelButton = document.getElementById("form-cancel-btn");

const instructions = document.getElementById("instructions");

const form = document.getElementById("form");

const author = document.getElementById("author");

const title = document.getElementById("title");

const pages = document.getElementById("pages");

// let isRead = document.getElementsByName("isRead").checked;
let isRead = document.querySelector('input[type=radio][name=isRead]:checked');

// if (document.getElementById("yes").checked) {
//   isRead = document.getElementById("yes");
// } else {
//   isRead = document.getElementById("no");
// }

const formAddButton = document.getElementById("form-add-btn");

newBookButton.addEventListener("click", displayForm);

cancelButton.addEventListener("click", hideForm);

formAddButton.addEventListener("click", () => {
  hideForm();
  addBookToLibrary();
});


const booksContainer = document.getElementById("books-container");
const newBook = document.createElement('div');
newBook.classList.add("book");
booksContainer.appendChild(newBook);

const bookTitle = document.createElement("h2");
bookTitle.setAttribute("id", "book-title");
newBook.appendChild(bookTitle);

const bookAuthor = document.createElement("span");
bookAuthor.setAttribute("id", "book-author");
newBook.appendChild(bookAuthor);

const numberOfPages = document.createElement("span");
numberOfPages.setAttribute("id", "nb-of-pages");
newBook.appendChild(numberOfPages);