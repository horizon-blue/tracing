import jwt
from flask_graphql import GraphQLView
from secrets import TOKEN_SECRET
from models import User


def decode(token):
    """
    Helper function to decode token comes from user
    :param token: jwt token comes from user
    :return: the decoded object, or exception
    """
    return jwt.decode(token, TOKEN_SECRET, algorithms=['HS256'])


class GraphQL(GraphQLView):
    def get_root_value(self, request):
        token = request.headers.get('Authorization')
        viewer = None
        try:
            viewer = User.query.get(decode(token.encode()).get("sub"))
        except:
            pass

        return {"viewer": viewer}
