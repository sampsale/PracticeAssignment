
# Full stack task

## Assignment

Implement a simple single-page web application which manages a collection of books. Your
web application should have a UI consisting of a single HTML web page, and a simple
backend. The backend provides a REST API with which the UI communicates. We want the
application to have the following features:

1. When the web page is loaded, it fetches all the books to a list. The title and the
author of each book are displayed in the list.
2. When a book in the list is clicked, it is selected and its author, title and description are
displayed in a form next to the list.
3. By inputting data to the form and pressing a button labelled “save new”, the user can
add new books to the collection.
4. By editing the form data of an existing book and pressing a button labelled “save”,
the user can update the data of the book in the collection.
5. There is also a delete button that can be used to delete a selected book from the
collection.
6. All the changes that user has made to the collection must be preserved on a page
reload.
7. The application (front and backend) can be started with a single command in terminal


## About

Frontend in **React** as asked. Backend made with Python; **FastAPI** for REST, **PostgreSQL** for database. 

This app has both SQL database version, running with PostgreSQL, and a version with an in-memory list serving as the "database". Since there is no PostgreSQL server provided, default version is the databaseless one, but if you can run PostgreSQL locally, it's possible; just change the settings of book_collection_back\sql_version\database.py to match yours. 

## How to start (default version)

1. Install packages for both back- and frontend
    - cd book_collection_front ; npm install 
    - cd book_collection_back/no_sql_version ; pip install -r requirements.txt
2. Run either of these in main directory to start both ends
    - py runfrontandback_python.py
    - runfrontandback_powershell.ps1

## How to start (SQL)

1. Install packages for both back- and frontend
    - cd book_collection_front ; npm install 
    - cd book_collection_back/sql_version ; pip install -r requirements.txt
2. Change 'DATABASE_URL' on book_collection_back\sql_version\database.py to match your own database
3. Run either of these in main directory to start both ends. You will also have to change 'py_version' on these to the SQL version (instructions in comments)
    - py runfrontandback_python.py
    - runfrontandback_powershell.ps1
