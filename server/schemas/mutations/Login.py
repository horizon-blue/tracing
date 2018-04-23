from graphene import Mutation, String
from graphql import GraphQLError
import jwt
import datetime
from secrets import TOKEN_SECRET
from ..objectTypes import User


def get_tomorrow():
    """
    Helper function to get tomorrow
    :return: datetime represents tomorrow
    """
    return datetime.datetime.now() + datetime.timedelta(days=1)


def generate_token(user):
    """
    Helper function to generate jwt token
    :param user:
    :return:
    """
    return jwt.encode({
        'sub': user.id,
        'exp': get_tomorrow(),
    },
        TOKEN_SECRET, algorithm='HS256').decode()


class Login(Mutation):
    class Arguments:
        name = String(required=True)
        password = String(required=True)

    token = String()

    def mutate(self, info, name, password):
        """
        Generate the token for the specific user, if exist
        :param info: context object
        :param name: name of user
        :param password: password of user
        :return: token string, if found, or raise error
        """
        user = User.get_query(info).filter_by(name=name).first()
        if user and user.password == password:
            token = generate_token(user)
            return Login(token=token)
        else:
            raise GraphQLError("Incorrect credentials")
