import datetime
from database import db_session
from graphene import Mutation, String, List, NonNull, Field
from graphql import GraphQLError
from models import Tag as TagModel, Category as CategoryModel, Post as PostModel
from ..objectTypes import Post, Category, Tag


class CreateNewPost(Mutation):
    """
    The mutation that, when triggered, create a new post for the current
    viewer (if viewer is admin)
    """

    class Arguments:
        title = String(required=True)
        content = String(required=True)
        category = String(required=True)
        tags = List(NonNull(String))
        excerpt = String()

    post = Field(Post)

    def mutate(self, info, title, content, category, tags, excerpt):
        """
        Create the new post
        :param info: information about the request
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
            tags = set(tags)  # remove duplicate tags
            if title == "" or content == "" or category == "" or "" in tags:
                raise GraphQLError("Missing required fields")
            category_model = Category.get_query(info).filter_by(name=category).first()
            if not category_model:
                category_model = CategoryModel(name=category)
            tag_models = [Tag.get_query(info).filter_by(name=tag).first() or TagModel(name=tag) for tag in tags]

            post = PostModel(title=title, content=content, category=category_model, tags=tag_models,
                             publishDate=datetime.datetime.utcnow(), author=viewer, excerpt=excerpt)

            db_session.add_all([post, category_model, *tag_models])
            db_session.commit()
            return CreateNewPost(post=post)
