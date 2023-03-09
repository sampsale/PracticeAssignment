import { useState, useEffect } from "react";
import './App.css';
import { Post, Delete, Put, Get } from './HTTPSMethods.js';



function App() {

  // All books
  const [books, setBooks] = useState([]);
  // Book to add or edit
  let [newBook, setNewBook] = useState({ title: "", author: "", description: "", id: null });


  // Get books from backend
  useEffect(() => {
    Get(setBooks)
  }, []);

  
  // Display the selected book on form
  function DisplayBook(id) {
    setNewBook(books.find((book) => book.id === id));

  }


  // Save new book or update existing book
  function SaveBook() {

    // If the book doesnt exist, show button to add new book
    let buttontext = 'Save new'
    // If book already exists, show button to update existing book
    if (books.find((book) => book.id === newBook.id)) {
      buttontext = 'Save'
    }

    // If book already exists, show button to update
    if (newBook.id !== null || newBook.author !== "" || newBook.title !== "" || newBook.description !== "") {
      return (<button onClick={() => {
        // If book already exists, update it
        if (books.find((book) => book.id === newBook.id)) {
          Put(newBook, setBooks)
          ResetForm()
        }
        // If book doesn't exist, add it to list of books
        else {
          Post(newBook, setBooks)
          ResetForm()
        };
      }}>{buttontext}</button>)
    }
  }


  // Delete existing book
  function DeleteExistingBook() {
    // If book exists, show delete button
    if (books.find((book) => book.id === newBook.id)) {
      return <button onClick={() => {
        let answer = window.confirm("Are you sure you want to delete " + newBook.title + "?");
        if (answer) {
          Delete(newBook.id, setBooks)
          ResetForm()
        }
      }}>Delete this book</button>
    }

  }


  // Reset form
  function ResetForm() {
    setNewBook({ title: "", author: "", description: "", id: null })
  }


  // Display reset form button only if there is something to reset
  function ResetButton() {
    if (newBook.id !== null || newBook.author !== "" || newBook.title !== "" || newBook.description !== "") {
      return <button onClick={() => ResetForm()}>Reset form</button>
    }
  }

  // Get book title by id
  function getTitleById(id) {
    const book = books.find(book => book.id === id);
    return book.title;
  }

  // Show whatever book is being edited or deleted
  function ShowSelectedBook() {
    if (newBook.id !== null) {
      return (<p>Editing: <b>{getTitleById(newBook.id)}</b> ID: <b>{newBook.id}</b></p>)
    } else {
      return (<p><b>Creating new book</b></p>)
    }
  }


  // Form to add or edit book
  function Form() {
    return (
      <form>
        {/* If book being edited, display  */}
        {ShowSelectedBook()}
        <label><b>Title: </b></label><br></br>
        <input type="text" name="title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} /><br></br>
        <label><b>Author: </b></label><br></br>
        <input type="text" name="author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} /><br></br>
        <label><b>Description: </b></label><br></br>
        <textarea type="text" name="description" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} />
      </form>
    )
  }

  return (
    <div className='Container'>
      <div className="BookList">
        <h2>Books! </h2>
        <p>Click to edit or delete</p>
        <ul>
          {/* Map through books and display them */}
          {books.map((book) => (
            <li key={book.id} className='Book' onClick={() => DisplayBook(book.id)}>
              <p><b>{book.title}</b> || <b>{book.author}</b></p>
            </li>
          ))}
        </ul>
      </div>
      <div className="BookForm">
        <h2>Edit existing book or create new</h2>
        {Form()}
        {/* buttons (if to be shown) */}
        <div className='Buttons'>
          {ResetButton()}
          {SaveBook()}
          {DeleteExistingBook()}
        </div>
      </div>
    </div>
  );
}

export default App;
