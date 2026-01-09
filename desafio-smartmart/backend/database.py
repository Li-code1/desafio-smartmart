from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Pega o caminho da pasta onde este arquivo (database.py) está
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Define o caminho completo para o banco de dados
DATABASE_PATH = os.path.join(BASE_DIR, "smartmart.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()