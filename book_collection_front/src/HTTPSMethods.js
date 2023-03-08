
// Method to add

const dataBaseEnabled = false


function Post(newBook, setBooks) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newBook.title, author: newBook.author, description: newBook.description })
    };
    fetch(`http://127.0.0.1:8000/add_book/`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            if (dataBaseEnabled) {
                setBooks(data)
            } else {
                console.log(data[0])
                setBooks(data[1])
            }

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
    fetch(`http://127.0.0.1:8000/delete_book/` + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            if (dataBaseEnabled) {
                setBooks(data)
            } else {
                console.log(data[0])
                setBooks(data[1])
            }
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
    fetch(`http://127.0.0.1:8000/edit_book/` + book.id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            if (dataBaseEnabled) {
                setBooks(data)
            } else {
                console.log(data[0])
                setBooks(data[1])
            }

        })
        .catch((err) => {
            console.log(err.message);
        });

}

// Method to get
function Get(setBooks) {
    fetch("http://127.0.0.1:8000/get_books/")
        .then((res) => res.json())
        .then((data) => {
            // If there are no books, add the Lord of the Rings
            if (data.length === 0) {
                Post({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", description: "The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien." }, setBooks)
            }
            setBooks(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}


export { Post, Delete, Put, Get }