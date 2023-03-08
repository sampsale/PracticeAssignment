from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from pydantic import BaseModel

# Init app
app = FastAPI()

# Allow all origins, headers and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# For now, books is a list of dictionaries with few examples
books = [{"title": "The Hobbit", "author": "J.R.R. Tolkien", "description": "A hobbit goes on an adventure part 1", "id": str(uuid4()) }, {"title": "The Two Towers", "author": "J.R.R. Tolkien", "description": "A hobbit goes on an adventure part 3", "id": str(uuid4()) }]

# Create a class to use as a model for the book object
class Book(BaseModel):
    title: str
    author: str
    description: str

# Info site
@app.get("/")
async def root():
    return {"message": "Welcome to Book Collection API. Current endpoints = /get_books/, add_book/, edit_book/[book_id], delete_book/[book_id] "}

# Get all books
@app.get("/get_books/")
async def serve_books():
    return books

# Create a new book
@app.post("/add_book/")
async def create_book(book: Book):
    books.append({"title": book.title, "author": book.author, "description": book.description, "id": str(uuid4())})
    return {"message": "Post request received"}, books

@app.put("/edit_book/{book_id}")
async def edit_book(book_id: str, edited_book: Book):
    # If book_id matches an id in books, edit that book
    for book in books:
        if book["id"] == book_id:
            print('found match')
            book["title"] = edited_book.title
            book["author"] = edited_book.author
            book["description"] = edited_book.description
    return {"message": "Put request received"}, books


@app.delete("/delete_book/{book_id}")
async def delete_book(book_id: str):
    # If book_id matches an id in books, remove that book from books
    print(book_id)
    for book in books:
        print(book)
        if book["id"] == book_id:
            books.remove(book)
    return {"message": "Delete request received"}, books
