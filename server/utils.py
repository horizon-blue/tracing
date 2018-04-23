import jwt
from flask import request
from secrets import TOKEN_SECRET
from models import User


def decode(token):
    """
    Helper function to decode token comes from user
    :param token: jwt token comes from user
    :return: the decoded object, or exception
    """
    return jwt.decode(token, TOKEN_SECRET, algorithms=['HS256'])


def get_viewer():
    token = request.headers.get('Authorization')
    try:
        return User.query.get(decode(token).sub)
    except:
        return None
