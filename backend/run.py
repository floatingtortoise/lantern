from dotenv import load_dotenv
load_dotenv()

import os
from flask_sqlalchemy import SQLAlchemy
from app import create_app

# Load the appropriate configuration from environment variable
config_name = os.getenv('FLASK_ENV', 'development').lower()
config_mapping = {
    'production': 'config.ProductionConfig',
    'testing': 'config.TestingConfig',
    'development': 'config.DevelopmentConfig'
}

config_class = config_mapping.get(config_name, 'config.DevelopmentConfig')

app = create_app(config_class)

if __name__ == "__main__":
    app.run(debug=app.config['DEBUG'], port=8080)