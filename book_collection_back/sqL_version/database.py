from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker




POSTGRES_USER='postgres'
POSTGRES_PASSWORD='admin'
POSTGRES_SERVER='localhost'
POSTGRES_PORT=5432
POSTGRES_DB='books'
DATABASE_URL = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}'

# url for database
#SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
SQLALCHEMY_DATABASE_URL = DATABASE_URL

# database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
# database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()