from sqlalchemy import Column, Integer, Text, ForeignKey, Table, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from database import Base

# many to many relationship
tagIdentifier = Table('tagIdentifier', Base.metadata,
                      Column('postId', Integer, ForeignKey('posts.id')),
                      Column('tagId', Integer, ForeignKey('tags.id')),
                      PrimaryKeyConstraint('postId', 'tagId'),
                      )


class Tag(Base):
    __tablename__ = 'tags'
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False, unique=True)
    description = Column(Text)

    # relationships
    posts = relationship(
        "Post", secondary=tagIdentifier, back_populates="tags")

    def __repr__(self):
        return '<Tag %r>' % self.name
