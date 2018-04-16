import datetime
from sqlalchemy import Column, Integer, Text, DateTime, Boolean, String
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    """
    The SQLAlchemy model for User class
    """
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    createdDate = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    isAdmin = Column(Boolean, nullable=False, default=False)
    avatar = Column(String)

    # relationships
    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")

    def __repr__(self):
        return '<User %r>' % self.name
