import datetime
from database import db_session
from graphene import Mutation, String, Field
from graphql import GraphQLError
from graphene import relay
from ..objectTypes import User


class SetUser(Mutation):
    """
    The mutation that, when triggered, set the information for the current viewer
    """

    class Arguments:
        name = String(required=True)
        email = String()
        avatar = String()
        password = String()

    user = Field(User)

    @staticmethod
    def mutate(root, info, name, email, avatar, password):
        """
        Create the new post
        :param root: the root information
        :param info: information about the request
        :param name: name of the user
        :param email: email of the user
        :param avatar: avatar of the user
        :param password: new password of the user
        :return: the new post, or None
        """
        viewer = root.get("viewer")
        if not viewer:
            raise GraphQLError("Permission denied")
        else:
            if name != viewer.name and User.get_query(info).filter_by(name=name).exists():
                raise GraphQLError("{} is unavailable.".format(name))
            viewer.name = name
            viewer.email = email
            viewer.avatar = avatar
            if password:
                viewer.password = password
            db_session.commit()
            return SetUser(user=viewer)
