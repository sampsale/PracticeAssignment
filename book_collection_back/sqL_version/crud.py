from sqlalchemy.orm import Session

from . import models, schemas


def get_books(db: Session):
    return db.query(models.Book).all()

def create_book(db: Session, book: schemas.BookCreate):
    db_book = models.Book(title=book.title, author=book.author, description=book.description)
    print(db_book)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db.query(models.Book).all()


def delete_book(db: Session, book_id: int):
    db.query(models.Book).filter(models.Book.id == book_id).delete()
    db.commit()
    return db.query(models.Book).all()


def edit_book(db: Session, book_id: int, book: schemas.Book):
    db.query(models.Book).filter(models.Book.id == book_id).update(dict(book))
    db.commit()
    return db.query(models.Book).all()