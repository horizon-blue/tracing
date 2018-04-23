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
    if not info.context.session.get("viewer"):
        token = info.context.headers.get('Authorization')
        try:
            info.context.session['viewer'] = User.get_query(info).get(decode(token).sub)
        except:
            info.context.session['viewer'] = None

    return next(root, info, **args)
