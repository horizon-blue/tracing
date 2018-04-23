import models
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        interfaces = (relay.Node,)
        exclude_fields = ["password"]


class Post(SQLAlchemyObjectType):
    class Meta:
        model = models.Post
        interfaces = (relay.Node,)
        exclude_fields = ["authorId", "categoryId"]


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
