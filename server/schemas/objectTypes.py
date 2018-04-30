import models
from graphene import relay
from .CountableConnection import CountableSQLAlchemyObjectType


class User(CountableSQLAlchemyObjectType):
    class Meta:
        model = models.User
        interfaces = (relay.Node,)
        exclude_fields = ["password"]


class Post(CountableSQLAlchemyObjectType):
    class Meta:
        model = models.Post
        interfaces = (relay.Node,)
        exclude_fields = ["authorId", "categoryId"]


class Tag(CountableSQLAlchemyObjectType):
    class Meta:
        model = models.Tag
        interfaces = (relay.Node,)


class Comment(CountableSQLAlchemyObjectType):
    class Meta:
        model = models.Comment
        interfaces = (relay.Node,)


class Category(CountableSQLAlchemyObjectType):
    class Meta:
        model = models.Category
        interfaces = (relay.Node,)
