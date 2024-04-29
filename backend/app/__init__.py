from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import DevelopmentConfig, ProductionConfig, TestingConfig

db = SQLAlchemy()

def create_app(config_class='config.DevelopmentConfig'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    # Importing blueprints
    from app.routes.user_routes import user_bp
    from app.routes.quiz_routes_and_services import quiz_bp
    from app.routes.document_routes import doc_bp

    # Registering blueprints
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(quiz_bp, url_prefix='/quiz')
    app.register_blueprint(doc_bp, url_prefix='/document')

    return app