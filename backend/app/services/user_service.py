# app/services/user_service.py
from ..models.models import User, ChatHistory, db

def create_user(username, email):
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_user_by_username(username):
    return User.query.filter_by(username=username).first()

def add_chat_history(user_id, message):
    new_chat = ChatHistory(user_id=user_id, message=message)
    db.session.add(new_chat)
    db.session.commit()

def get_chat_history(user_id):
    return ChatHistory.query.filter_by(user_id=user_id).all()