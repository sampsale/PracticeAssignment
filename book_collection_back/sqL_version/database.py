from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
# Importl local postgres server info, this is not in git
from sql_version.postgreSQL_server_info import POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_SERVER, POSTGRES_USER

# USE YOUR OWN INFO HERE! 
# DB name = books
DATABASE_URL = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}'

# url for database
SQLALCHEMY_DATABASE_URL = DATABASE_URL

# database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

# database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()