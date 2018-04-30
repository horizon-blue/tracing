from graphene import ObjectType, Schema, Field, String, Int
from graphene.relay import Node
from graphene_sqlalchemy import SQLAlchemyConnectionField
from sqlalchemy import or_
from .objectTypes import *
from .mutations import Mutations


class Query(ObjectType):
    node = Node.Field()
    users = SQLAlchemyConnectionField(User)
    tags = SQLAlchemyConnectionField(Tag)
    categories = SQLAlchemyConnectionField(Category)
    viewer = Field(User)

    post = Node.Field(Post)
    posts = SQLAlchemyConnectionField(Post, args={"query": String()})

    @staticmethod
    def resolve_viewer(root, _):
        """
        Return the current viewer, if existed
        :param root: the root object
        :return: object represents current viewer, or None
        """
        return root.get("viewer")

    @staticmethod
    def resolve_posts(_, info, **kwargs):
        """
        Return the search based on query (or show them all)
        :param info: the info (context, etc.) on query
        :param kwargs: rest of the query
        :return: a list of post
        """
        query = "%{}%".format(kwargs.get("query", ""))
        model = Post._meta.model
        return Post.get_query(info).filter(
            or_(model.title.like(query), model.content.like(query), model.excerpt.like(query))).all()


schema = Schema(query=Query, mutation=Mutations,
                types=[User, Post, Tag, Comment, Category])
