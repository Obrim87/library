class Book {
  constructor(title,author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
};

let myLibrary = [];
let submitInput = document.getElementById('submitForm');
let myForm = document.getElementById('myForm');
let booksGrid = document.getElementById('booksGrid');
let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');
let titleError = document.querySelector('#title + span.titleError.error');
let authorError = document.querySelector('#author + span.authorError.error');
let pagesError = document.querySelector('#pages + span.pagesError.error');

// function Book(title, author, pages, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.isRead = isRead;
// }

submitInput.addEventListener('click', (e) => {
  if (title.validity.valid) {
    titleError.textContent = '';
    titleError.classList.remove('active');
  } else {
    displayError(title, titleError, 'a title')
    e.preventDefault()
  }

  if (author.validity.valid) {
    authorError.textContent = '';
    authorError.classList.remove('active');
  } else {
    displayError(author, authorError, 'an author')
    e.preventDefault()
  }

  if (pages.validity.valid) {
    pagesError.textContent = '';
    pagesError.classList.remove('active');
  } else {
    displayError(pages, pagesError, 'the number of pages')
    e.preventDefault()
  }
})

let displayError = (input, span, type) => {
  if (input.validity.valueMissing === true) {
    span.textContent = `Please enter ${type}`;
  }
  span.classList.add('active');
}

function addBookToLibrary() {
  titleInput = title.value;
  authorInput = author.value;
  pagesInput = pages.value;
  readInput = read.checked;
  let book = new Book(titleInput, authorInput, pagesInput, readInput);
  checkForDuplicate(titleInput, book);
}

function checkForDuplicate(title, book) {
  if (myLibrary.find(c => c.title === title)) {
    alert(`You already have "${title}" in the Library.`);
  } else {
  myLibrary.push(book);
  updateBooksGrid();
  }
}

function resetBooksGrid() {
  booksGrid.innerHTML = '';
}

function updateBooksGrid() {
  resetBooksGrid();
  for (let book of myLibrary) {
    addBookToGrid(book);
    }
}

function addBookToGrid(book) {
  let bookCard = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p');
  let pages = document.createElement('p');
  let btnGroup = document.createElement('div');
  let readBtn = document.createElement('button');
  let removeBtn = document.createElement('button');

  bookCard.classList.add('book-card');
  btnGroup.classList.add('btn-group');
  readBtn.classList.add('btn');
  removeBtn.classList.add('btn', 'removeBtn');

  title.textContent = `"${book.title}"`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = 'Remove';

  if (book.isRead) {
    readBtn.classList.add('readYes');
    readBtn.textContent = 'Read';
  } else {
    readBtn.classList.add('readNo');
    readBtn.textContent = 'Not Read';
  }

  booksGrid.appendChild(bookCard);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(btnGroup);
  btnGroup.appendChild(readBtn);
  btnGroup.appendChild(removeBtn);

  readBtn.addEventListener('click', toggleRead);
  removeBtn.addEventListener('click', removeBook);

  myForm.reset();
}

function removeBook(e) {
  let title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');
  let book = getBook(title);
  let indexPosition = myLibrary.findIndex(c => c.title === book.title);
  myLibrary.splice(indexPosition, 1);
  updateBooksGrid();
}

function toggleRead(e) {
  let title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');
  let book = getBook(title);
  if (book.isRead) {
    book.isRead = false;
  } else {
    book.isRead = true;
  }
  updateBooksGrid();
}

function getBook(title) {
  return myLibrary.find((book) => book.title === title)
}

myForm.addEventListener('submit', (e) => {
  if (!title.validity.valid) {
    displayError();
    e.preventDefault
  } else {
    addBookToLibrary()
  }
}); 