import models
from graphene import relay, ObjectType, Field, Schema
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        interfaces = (relay.Node,)


class Post(SQLAlchemyObjectType):
    class Meta:
        model = models.Post
        interfaces = (relay.Node,)
        exclude_fields = ["authorId"]


class Tag(SQLAlchemyObjectType):
    class Meta:
        model = models.Tag
        interfaces = (relay.Node,)


class Comment(SQLAlchemyObjectType):
    class Meta:
        model = models.Comment
        interfaces = (relay.Node,)


class Category(SQLAlchemyObjectType):
    class Meta:
        model = models.Category
        interfaces = (relay.Node,)


class Query(ObjectType):
    node = relay.Node.Field()
    users = SQLAlchemyConnectionField(User)
    posts = SQLAlchemyConnectionField(Post)
    post = Field(Post)
    tags = SQLAlchemyConnectionField(Tag)
    categories = SQLAlchemyConnectionField(Category)


schema = Schema(query=Query, types=[User, Post, Tag, Comment, Category])
