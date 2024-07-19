from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_pymongo import PyMongo

from app.config import Config

bcrypt = Bcrypt()
jwt = JWTManager()
mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    bcrypt.init_app(app)
    jwt.init_app(app)
    mongo.init_app(app)

    @app.route('/')
    def home():
        return 'Blognest Server'

    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from app.routes.blog_routes import blog_bp
    app.register_blueprint(blog_bp, url_prefix='/blog')

    return app
