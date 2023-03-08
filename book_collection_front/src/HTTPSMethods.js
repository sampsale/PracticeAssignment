
// Method to add
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
            console.log(data[0])
            setBooks(data[1])
        })
        .catch((err) => {
            console.log(err.message);
        });
}


// Method to delete
function Delete(id, setBooks) {
    console.log(id)
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    };
    fetch(`http://127.0.0.1:8000/delete_book/` + id, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            // Handle data
            console.log(data[0])
            setBooks(data[1])
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
            console.log(data[0])
            setBooks(data[1])
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
            setBooks(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}


export { Post, Delete, Put, Get }