//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
//UI Constructor
function UI() {

}

//Add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  //create tr eleent
  const row = document.createElement('tr');
  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

//show alert
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div = document.createElement('div');
  //addd class name
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //Insert Alert
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  },3000);
}

//Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

//Book Constructor
function Store() {
  
}

Store.getBooks = function() {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
}

Store.displayBooks = function() {
  const books = Store.getBooks();
  books.forEach(function(book) {
    const ui = new UI;
    ui.addBookToList(book);
  });
  
}

Store.addBooks = function(book) {
  const books = Store.getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

Store.deleteBooks = function(isbn) {
  const books = Store.getBooks();
  books.forEach(function(book, index) {
    if(book.isbn === isbn) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  //get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  //Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();

  //Validate
  if(title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    //Add Book to list
    ui.addBookToList(book);

    //add books to ls
    Store.addBooks(book);

    //show alert
    ui.showAlert('Book Added!', 'success')

    //claer fields
    ui.clearFields();
  }

  e.preventDefault();
});

//DISPALY ALL BOOKS ON RELOAD 
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target);

  //delete books from ls
  Store.deleteBooks(e.target.parentElement.previousElementSibling.textContent);

  //show Message
  ui.showAlert('Book removed', 'success');

  e.preventDefault();
})