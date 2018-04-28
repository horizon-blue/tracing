from .Login import Login
from graphene import ObjectType
from .SetPost import SetPost


class Mutations(ObjectType):
    login = Login.Field()
    setPost = SetPost.Field()
