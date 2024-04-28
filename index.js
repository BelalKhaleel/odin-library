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

function displayBook() {
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
  
  const bookButtons = document.createElement('div');
  bookButtons.classList.add("book-btns");
  newBook.appendChild(bookButtons);
  
  const readStatusButton = document.createElement('button');
  readStatusButton.setAttribute("type", "button");
  readStatusButton.classList.add("status");
  let isRead = document.querySelector('input[type=radio][name=isRead]:checked');
  readStatusButton.innerText = 'Read: ' + isRead.value;
  bookButtons.appendChild(readStatusButton);
  
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute("type", "button");
  deleteButton.classList.add("delete");
  deleteButton.innerText = 'Delete';
  bookButtons.appendChild(deleteButton);

  const numberOfPages = document.createElement("span");
  numberOfPages.setAttribute("id", "nb-of-pages");
  numberOfPages.innerText = pages.value;
  newBook.appendChild(numberOfPages);
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

const booksContainer = document.getElementById("books-container");

newBookButton.addEventListener("click", displayForm);

cancelButton.addEventListener("click", hideForm);

formAddButton.addEventListener("click", () => {
  hideForm();
  addBookToLibrary();
  displayBook();

  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
});

function toggleReadStatus(e) {
  if(e.target.classList.contains("status")) {
    const book = e.target.closest(".book");
    if (book) {
      const bookIndex = Array.from(booksContainer.children).indexOf(book);
      const choosenBook = myLibrary[bookIndex];
      const readStatusButton = e.target.closest(".status");
      if (choosenBook['isRead'] == 'no') {
        choosenBook['isRead'] = 'yes';
        readStatusButton.innerText = 'Read: ' + 'yes';
      } else {
        choosenBook['isRead'] = 'no';
        readStatusButton.innerText = 'Read: ' + 'no';
      }
    }
  }
}

function deleteBook(e) {
  if(e.target.classList.contains("delete")) {
    const book = e.target.closest(".book");
    if (book) {
      const bookIndex = Array.from(booksContainer.children).indexOf(book);
      const choosenBook = myLibrary[bookIndex];
      const deleteButton = e.target.closest(".delete");
        myLibrary.splice(bookIndex, 1);
        book.remove();
    }
  }
}

booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    toggleReadStatus(e);
  } else if (e.target.classList.contains("delete")) {
    deleteBook(e);
  }
});