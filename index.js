const myLibrary = [];
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const formBtn = document.querySelector("form button");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }
  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  if (!title || !author || !pages) {
    throw new Error("Missing data");
  }
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof pages !== "number"
  ) {
    throw new Error("Incorrect data type");
  }
  read = !!read;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks(library) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  library.forEach((book) => {
    const row = document.createElement("tr");
    const title = document.createElement("td");
    title.textContent = book.title;
    const author = document.createElement("td");
    author.textContent = book.author;
    const pages = document.createElement("td");
    pages.textContent = book.pages;
    const read = document.createElement("td");
    read.textContent = book.read ? "Yes" : "No";
    row.dataset.id = book.id;
    const actions = document.createElement("td");
    actions.classList.add("actions");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => {
      const index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
      displayBooks(myLibrary);
    });
    const markRead = document.createElement("button");
    markRead.textContent = "Change read status";
    markRead.classList.add("read-status-btn");
    markRead.addEventListener("click", () => {
      book.toggleReadStatus();
      read.textContent = book.read ? "Yes" : "No";
    });
    actions.append(markRead, deleteButton);
    row.append(title, author, pages, read, actions);
    tableBody.appendChild(row);
  });
}

titleInput.addEventListener("input", () => {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("The title field must be filled!");
  } else if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(
      "The title must be at least 3 characters long!",
    );
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity("The title must not exceed 50 characters!");
  } else {
    titleInput.setCustomValidity("");
  }
});

authorInput.addEventListener("input", () => {
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("The author name must be filled!");
  } else if (authorInput.validity.tooShort) {
    authorInput.setCustomValidity(
      "The author's name must be at least 3 characters long!",
    );
  } else if (authorInput.validity.tooLong) {
    authorInput.setCustomValidity(
      "The author's name must not exceed 50 characters!",
    );
  } else {
    authorInput.setCustomValidity("");
  }
});

pagesInput.addEventListener("input", () => {
  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity("Please insert the number of pages!");
  } else if (pagesInput.validity.rangeUnderflow) {
    pagesInput.setCustomValidity("Minimum number of pages should be 1!");
  } else if (pagesInput.validity.rangeOverflow) {
    pagesInput.setCustomValidity("Page number should not exceed 50!");
  } else {
    pagesInput.setCustomValidity("");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const title = data.get("title").trim();
  const author = data.get("author").trim();
  const pages = parseInt(data.get("pages").trim());
  const read = data.get("read");
  addBookToLibrary(title, author, pages, read);
  displayBooks(myLibrary);
  form.reset();
});
