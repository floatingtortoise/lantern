from flask import Blueprint, request, jsonify, current_app, Flask
from werkzeug.utils import secure_filename
from ..services.text_extraction import extract_text
from ..services.gpt3_service import ask_gpt3, ask_gpt3_follow
import os


quiz_bp = Blueprint('quiz', __name__)
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@quiz_bp.route('/create_quiz', methods=['GET'])

def create_quiz():
    # TODO: extract instructions from frontend
    #message = request.form.get('message', '')
    message = 'Generate quiz questions for my astronomy midterm revision.' # dummy

    material = []
    # TODO: extract documents uploaded  from frontend
    #files = request.files.getlist('files')
    files = [] # dummy
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            extracted_text = extract_text(filepath)
            material.append(extracted_text)
    # materials = "\n".join(material)

    # prompt = f"Instructions: {message} \n Materials: {materials}"
    # gpt3_response = ask_gpt3(prompt)
    # return jsonify(gpt3_response)
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
# @app.route('/follow_up', methods=['GET'])
def follow_up():
    message = request.form.get('message', '')  # TODO: extract instructions from frontend
    
    material = []
    files = request.files.getlist('files')  # TODO: extract documents uploaded  from frontend
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            extracted_text = extract_text(filepath)
            material.append(extracted_text)
    materials = "\n".join(material) # concatenation separated by \n

    question = request.form.get('question', '')  # TODO: extract corresponding quiz question from cashed (?) data

    answer = request.form.get('answer', '')  # TODO: extract user's response from frontend

    prompt = f"Instructions: {message} \n Materials: {materials} \n Question: {question} \n Answer: {answer}"
    gpt3_response = ask_gpt3_follow(prompt)
    return jsonify({gpt3_response})
