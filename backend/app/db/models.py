from sqlalchemy import Column, Integer, String

from sqlalchemy.orm import declarative_base

Base = declarative_base()
class UploadedFile(Base):
    __tablename__ = "uploaded_files"
    id = Column(
        Integer,
        primary_key=True,
        index=True
        )
    filename = Column(String)
    filetype = Column(String)
    rows = Column(Integer)
    columns = Column(Integer)
