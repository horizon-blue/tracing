from graphene import relay, ObjectType, Schema
from graphene_sqlalchemy import SQLAlchemyConnectionField
from .objectTypes import *
from .mutations import Mutations


class Query(ObjectType):
    node = relay.Node.Field()
    users = SQLAlchemyConnectionField(User)
    posts = SQLAlchemyConnectionField(Post)
    tags = SQLAlchemyConnectionField(Tag)
    categories = SQLAlchemyConnectionField(Category)

    post = relay.Node.Field(Post)


schema = Schema(query=Query, mutation=Mutations,
                types=[User, Post, Tag, Comment, Category])
