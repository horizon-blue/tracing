from sqlalchemy import Column, Integer, Text, ForeignKey, Table, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from database import Base

# many to many relationship
tagIdentifier = Table('tagIdentifier', Base.metadata,
                      Column('postId', Integer, ForeignKey('post.id')),
                      Column('tagId', Integer, ForeignKey('tag.id')),
                      PrimaryKeyConstraint('postId', 'tagId'),
                      )


class Tag(Base):
    """
    The SQLAlchemy model for Tag class
    """
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    posts = relationship(
        "Post", secondary=tagIdentifier, back_populates="tags")

    def __repr__(self):
        return '<Tag %r>' % self.name
