import datetime
from database import db_session
from graphene import Mutation, String, List, NonNull, Field, ID
from graphql import GraphQLError
from graphene import relay
from models import Tag as TagModel, Category as CategoryModel, Post as PostModel
from ..objectTypes import Post, Category, Tag


class SetPost(Mutation):
    """
    The mutation that, when triggered, create a new post for the current
    viewer (if viewer is admin), or, if ID is supplied, update the given post
    """

    class Arguments:
        id = ID()
        title = String(required=True)
        content = String(required=True)
        category = String(required=True)
        tags = List(NonNull(String))
        excerpt = String()

    post = Field(Post)

    def mutate(self, info, id, title, content, category, tags, excerpt):
        """
        Create the new post
        :param info: information about the request
        :param id: the id corresponds to the post
        :param title: title of the post
        :param content: content of the post (in Markdown format)
        :param category: category of the post
        :param tags: a list of tags of the post
        :param excerpt: brief description about the post.
        :return: the new post, or None
        """
        viewer = self.get("viewer")
        if not viewer or not viewer.isAdmin:
            raise GraphQLError("Permission denied")
        else:
            if id is None:
                post = PostModel()
            else:
                print("id", relay.Node.get_node_from_global_id(info, id))
                post = relay.Node.get_node_from_global_id(info, id)

            tags = set(tags)  # remove duplicate tags
            if title == "" or content == "" or category == "" or "" in tags:
                raise GraphQLError("Missing required fields")
            post.category = Category.get_query(info).filter_by(name=category).first() or CategoryModel(name=category)
            post.tags = [Tag.get_query(info).filter_by(name=tag).first() or TagModel(name=tag) for tag in tags]
            post.title = title
            post.content = content
            post.publishDate = post.publishDate or datetime.datetime.utcnow()
            post.lastUpdateDate = datetime.datetime.utcnow()
            post.author = viewer
            post.excerpt = excerpt

            db_session.add(post)
            db_session.commit()
            return SetPost(post=post)
