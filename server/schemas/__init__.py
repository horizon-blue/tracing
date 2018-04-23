from graphene import ObjectType, Schema, Field
from graphene.relay import Node
from graphene_sqlalchemy import SQLAlchemyConnectionField
from .objectTypes import *
from .mutations import Mutations


class Query(ObjectType):
    node = Node.Field()
    users = SQLAlchemyConnectionField(User)
    posts = SQLAlchemyConnectionField(Post)
    tags = SQLAlchemyConnectionField(Tag)
    categories = SQLAlchemyConnectionField(Category)
    viewer = Field(User)
    post = Node.Field(Post)

    def resolve_viewer(self, info):
        return info.context.get("viewer")


schema = Schema(query=Query, mutation=Mutations,
                types=[User, Post, Tag, Comment, Category])
