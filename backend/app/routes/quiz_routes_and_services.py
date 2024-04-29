# prompt engineering and processing response into formated quiz questions
from flask import Blueprint, request, jsonify, current_app, make_response
from werkzeug.utils import secure_filename
from ..services.text_extraction import extract_text
# from ..services.gpt3_service import ask_gpt3
from ..services.gpt3_service import ask_gpt3, ask_gpt3_follow
import os

quiz_bp = Blueprint('quiz', __name__)

# @todo: update file type restrictions
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@quiz_bp.route('/create_quiz', methods=['POST'])
def create_quiz():
    message = request.form.get('message', '')  # Extract text message from form data
    # files = request.files.getlist('files')
    files = []
    material = []
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            extracted_text = extract_text(filepath)
            material.append(extracted_text)
    materials = "\n".join(material)  # concatenation separated by \n

    prompt = ""
    if (len(files), len(message)) == (0, 0):
        return make_response('Internal Server Error', 500)
    elif len(files) == 0:  # no materials, only topic description
        prompt = f"They want to learn about the topic: {message}."
    elif len(message) == 0:  # no topic description, only materials
        prompt = f"Here are some materials they want to learn about: {materials}"
    else:  # both materials and topic descriptions are provided
        prompt = f"They want to focus the quiz on the topic: {message}. " \
                f"Please restrict the scope of the quiz to information in this material: {materials}"

    gpt3_response = ask_gpt3(prompt)
    return jsonify({'quiz_question(s)': gpt3_response, 'prompt': prompt})

@quiz_bp.route('/follow_up', methods=['POST'])
def follow_up():
    question = request.form.get('question', '')  # previous question
    answer = request.form.get('answer', '')  # user answer
    message = request.form.get('message', '')  # previous user message
    previous_questions = request.form.get('previousQuestions', '')

    prompt = f'{message} ' \
             f'The previous question they got wrong is "{question}", to which the user chose "{answer}". ' \
             f'Other questions you have previously asked: "{previous_questions}"'

    gpt3_response = ask_gpt3_follow(prompt)
    return jsonify({'follow_up_question': gpt3_response})
