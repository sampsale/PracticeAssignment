import { useState, useEffect } from "react";
import './App.css';
import {Post, Delete, Put, Get} from './HTTPSMethods.js';

function App() {


  // const [books, setBooks] = useState([
  //   { title: "The Hobbit", author: "J.R.R. Tolkien", description: "A hobbit goes on an adventure part 1", id: 1670000000000 },
  //   { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", description: "A hobbit goes on an adventure part 2", id: 160000000001 },
  //   { title: "The Two Towers", author: "J.R.R. Tolkien", description: "A hobbit goes on an adventure part 3", id: 1670000000002 }
  // ]);

  // Set initial states
  const [books, setBooks] = useState([]);

  // Get books from backend
  useEffect(() => {
    Get(setBooks)
  }, []);


  // Book to add or edit
  let [newBook, setNewBook] = useState({ title: "", author: "", description: "", id: null });

  // Display the selected book on form
  function DisplayBook(id) {
    setNewBook(books.find((book) => book.id === id));
  }

  // Save new book or update existing book
  function SaveBook() {
    // If book already exists, show buttons to update or delete
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
      }}>Save/Add</button>)
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


  // Show whatever book is being edited or deleted
  function ShowSelectedBook() {
    if (newBook.id !== null) {
      return (<p>Editing: <b>{newBook.title}</b> ID: <b>{newBook.id}</b></p>)
    } else {
      return (<p><b>Creating new book</b></p>)
  }
  }

  return (
    <div className='Container'>
      <div className="BookList">
        <h2>Books! </h2>
        <ul>
          {/* Map through books and display them */}
          {books.map((book) => (
            <li key={book.id}>
              <p onClick={() => DisplayBook(book.id)}>{book.title} || <b>{book.author}</b></p>
            </li>
          ))}
        </ul>

      </div>
      <div className="BookForm">
        <h2>Edit existing book or create new</h2>

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
        {/* buttons (if to be shown) */}
        {ResetButton()}<br></br>
        {SaveBook()}<br></br>
        {DeleteExistingBook()}
      </div>
    </div>
  );
}

export default App;
