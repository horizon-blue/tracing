from flask import request
from .utils import decode
from schemas.objectTypes import User


def auth_middleware(next, root, info, **args):
    """
    Decode the token and supply the user identity in the context
    :param next: when execute, return the next result
    :param root: query root
    :param info: information about the request
    :param args: rest of arguments
    :return: the execution result
    """
    if not info.context.get("viewer"):
        token = request.headers.get('Authorization')
        try:
            info.context['viewer'] = User.get_query(info).get(decode(token).sub)
            root = 'foo'
        except:
            info.context['viewer'] = None

    return next(root, info, **args)
