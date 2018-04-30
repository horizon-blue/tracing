from .Login import Login
from graphene import ObjectType
from .SetPost import SetPost
from .SetUser import SetUser


class Mutations(ObjectType):
    login = Login.Field()
    setPost = SetPost.Field()
    setUser = SetUser.Field()
