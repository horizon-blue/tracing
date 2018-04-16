import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from secrets import DATABASE_ADDRESS

# http://flask.pocoo.org/docs/0.12/patterns/sqlalchemy/

database_address = "sqlite:///:memory:" if os.environ.get("__TEST__") else DATABASE_ADDRESS

engine = create_engine(database_address, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


# for quick setup
def init_db(reset=False):
    # noinspection PyUnresolvedReferences
    import models
    if reset:
        Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
