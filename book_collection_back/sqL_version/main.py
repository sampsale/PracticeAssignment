from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow all origins, headers and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# Database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get all books
@app.get("/get_books/", response_model=list[schemas.Book])
def get_books(db: Session = Depends(get_db)):
    books = crud.get_books(db)
    return books

# Post a new book
@app.post("/add_book/", response_model=list[schemas.Book])
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db, book)

# Delete a book
@app.delete("/delete_book/{book_id}", response_model=list[schemas.Book])
def delete_book(book_id: int, db: Session = Depends(get_db)):
    return crud.delete_book(db, book_id)

# Update a book
@app.put("/edit_book/{book_id}", response_model=list[schemas.Book])
def edit_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.edit_book(db, book_id, book)
