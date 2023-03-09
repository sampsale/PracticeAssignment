const backendurl = 'http://127.0.0.1:8000'

// Method to post
function Post(newBook, setBooks) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newBook.title, author: newBook.author, description: newBook.description })
    };
    fetch(backendurl + `/add_book/`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            setBooks(data)
        })
        .catch((err) => {
            console.log(err.message);
        });
}


// Method to delete
function Delete(id, setBooks) {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    };
    fetch(backendurl + `/delete_book/` + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            setBooks(data)
        })
        .catch((err) => {
            console.log(err.message);
        });
}

// Method to edit 
function Put(book, setBooks) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: book.title, author: book.author, description: book.description })
    };
    fetch(backendurl + `/edit_book/` + book.id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            setBooks(data)

        })
        .catch((err) => {
            console.log(err.message);
        });

}

// Method to get
function Get(setBooks) {
    fetch(backendurl + "/get_books/")
        .then((res) => res.json())
        .then((data) => {
            // If there are no books, add few books to database
            if (data.length === 0) {
                Post({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", description: "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien." }, setBooks)
                Post({ title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', description: 'Harry Potter and the Philosopher\'s Stone is a fantasy novel written by British author J. K. Rowling.' }, setBooks)
            }
            setBooks(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}


export { Post, Delete, Put, Get }