from sqlalchemy import  Column, String, Integer

from .database import Base

# Our only model is a Book
class Book(Base):
    __tablename__ = "books"
    title = Column(String)
    description = Column(String)
    author = Column(String)
    id = Column(Integer, primary_key=True, index=True)


