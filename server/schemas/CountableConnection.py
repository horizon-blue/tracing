import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType


class CountableConnection(graphene.relay.Connection):
    """
    The custom connection type that gives count to the number of edges
    in the connection.
    Reference: https://github.com/graphql-python/graphene-sqlalchemy/issues/58#issuecomment-349050744
    """

    class Meta:
        abstract = True

    total_count = graphene.Int()

    @staticmethod
    def resolve_total_count(root, info, *args, **kwargs):
        return root.length


class CountableSQLAlchemyObjectType(SQLAlchemyObjectType):
    """
    The custom object type that uses countable connection
    Reference: https://github.com/graphql-python/graphene-sqlalchemy/issues/58#issuecomment-349050744
    """

    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, model=None, registry=None, skip_registry=False,
                                    only_fields=(), exclude_fields=(), connection=None,
                                    use_connection=None, interfaces=(), id=None, **options):
        # Force it to use the countable connection
        countable_conn = connection or CountableConnection.create_type(
            "{}Connection".format(model.__name__),
            node=cls)

        super(CountableSQLAlchemyObjectType, cls).__init_subclass_with_meta__(
            model,
            registry,
            skip_registry,
            only_fields,
            exclude_fields,
            countable_conn,
            use_connection,
            interfaces,
            id,
            **options)
