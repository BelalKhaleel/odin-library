const myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  //take user’s input
  let isRead = document.querySelector('input[type=radio][name=isRead]:checked');
  
  const book = new Book(author.value, title.value, pages.value, isRead.value);

  //store the new book objects into an array
  myLibrary.push(book);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const booksContainer = document.getElementById("books-container");
    const newBook = document.createElement('div');
    newBook.classList.add("book");
    booksContainer.appendChild(newBook);
    
    const bookTitle = document.createElement("h2");
    bookTitle.setAttribute("id", "book-title");
    bookTitle.innerText = title.value;
    newBook.appendChild(bookTitle);
    
    const bookAuthor = document.createElement("span");
    bookAuthor.setAttribute("id", "book-author");
    bookAuthor.innerText = author.value;
    newBook.appendChild(bookAuthor);
    
    const numberOfPages = document.createElement("span");
    numberOfPages.setAttribute("id", "nb-of-pages");
    numberOfPages.innerText = pages.value;
    newBook.appendChild(numberOfPages);
    
  }
}

function displayForm () {
    form.classList.remove("d-none");
    form.classList.add("d-flex");
    instructions.style.display = "block";
    booksContainer.classList.remove("d-flex");
    booksContainer.classList.add("d-none");
}

function hideForm () {
  if (form.className == "d-flex" && instructions.style.display == "block" && booksContainer.className == "d-none") {
    form.classList.remove("d-flex");
    form.classList.add("d-none");
    instructions.style.display = "none";
    booksContainer.classList.remove("d-none");
    booksContainer.classList.add("d-flex");
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

newBookButton.addEventListener("click", displayForm);

cancelButton.addEventListener("click", hideForm);

formAddButton.addEventListener("click", () => {
  hideForm();
  addBookToLibrary();
});

