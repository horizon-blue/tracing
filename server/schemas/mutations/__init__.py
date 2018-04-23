from .Login import Login
from graphene import ObjectType
from .CreateNewPost import CreateNewPost


class Mutations(ObjectType):
    login = Login.Field()
    createNewPost = CreateNewPost.Field()
