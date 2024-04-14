# app/routes/user_routes.py
from flask import Blueprint, request, jsonify
from ..services.user_service import create_user, get_user_by_username, add_chat_history, get_chat_history

user_bp = Blueprint('user', __name__)

@user_bp.route('/user', methods=['POST'])
def create_user_route():
    data = request.get_json()
    user = create_user(data['username'], data['email'])
    return jsonify({'id': user.id, 'username': user.username, 'email': user.email}), 201

@user_bp.route('/user/<username>', methods=['GET'])
def get_user_route(username):
    user = get_user_by_username(username)
    if user:
        return jsonify({'id': user.id, 'username': user.username, 'email': user.email})
    else:
        return jsonify({'message': 'User not found'}), 404

@user_bp.route('/chat', methods=['POST'])
def add_chat_route():
    data = request.get_json()
    add_chat_history(data['user_id'], data['message'])
    return jsonify({'message': 'Chat history added successfully'}), 201

@user_bp.route('/chat/<int:user_id>', methods=['GET'])
def get_chat_route(user_id):
    chats = get_chat_history(user_id)
    chat_list = [{'message': chat.message, 'created_at': chat.created_at} for chat in chats]
    return jsonify(chat_list)
