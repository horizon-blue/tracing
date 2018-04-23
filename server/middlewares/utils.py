import jwt
from secrets import TOKEN_SECRET


def decode(token):
    """
    Helper function to decode token comes from user
    :param token: jwt token comes from user
    :return: the decoded object, or exception
    """
    return jwt.decode(token, TOKEN_SECRET, algorithms=['HS256'])
