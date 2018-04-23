from flask import Flask
from database import db_session, init_db
from schemas import schema
from flask_graphql import GraphQLView
from flask_cors import CORS
from middlewares import middlewares

app = Flask(__name__)
CORS(app, resources=r'/')

# Add graphql endpoint
app.add_url_rule('/', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True,
                                                    context={}, middleware=middlewares))


@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


if __name__ == "__main__":
    init_db()
    app.run(port=2333, debug=True)
