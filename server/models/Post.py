import datetime
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from .Tag import tagIdentifier


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    publishDate = Column(DateTime)
    lastUpdateDate = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

    # generate hyper-ref using title by default
    href = Column(Text, unique=True, nullable=False,
                  default=lambda context: context.current_parameters.get('title').replace(' ', '-'))
    title = Column(Text, nullable=False)
    excerpt = Column(Text)
    content = Column(Text, nullable=False)

    # relationships
    authorId = Column(Integer, ForeignKey('users.id'))
    author = relationship("User", back_populates="posts")
    tags = relationship(
        "Tag", secondary=tagIdentifier, back_populates="posts")

    def __repr__(self):
        return '<Post %r by %r>' % (self.title, self.author)
