from .Login import Login
from graphene import ObjectType


class Mutations(ObjectType):
    login = Login.Field()
