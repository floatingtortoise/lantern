# prompt engineering and processing response into formated quiz questions
from flask import Blueprint, request, jsonify, current_app
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
    # message = request.form.get('message', '')  # Extract text message from form data
    # files = request.files.getlist('files')  # Allows for multiple files

    # # @todo: currently message and files are simply concatenated together, implement more nuanced ways of handling
    # extracted_texts = [message]

    # for file in files:
    #     if file and allowed_file(file.filename):
    #         filename = secure_filename(file.filename)
    #         filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    #         file.save(filepath)
    #         extracted_text = extract_text(filepath)
    #         extracted_texts.append(extracted_text)

    # combined_text = " ".join(extracted_texts) # concatenation separated by a space char

    # # @todo: prompt engineering
    # prompt = f"Based on the following information, generate a list of quiz questions: {combined_text}"
    # gpt3_response = ask_gpt3(prompt)
    # # @todo: further process and format the response from gpt3
    # return jsonify({'quiz_question': gpt3_response})
    
    message = request.form.get('message', '')  # Extract text message from form data

    files = request.files.getlist('files')  # Allows for multiple files
    material = []
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            extracted_text = extract_text(filepath)
            material.append(extracted_text)
    materials = "\n".join(material) # concatenation separated by \n

    # @todo: prompt engineering
    prompt = f"Instructions: {message} \n Materials: {materials}"
    gpt3_response = ask_gpt3(prompt)
    # @todo: further process and format the response from gpt3
    print("hi")
    return jsonify({'quiz_question(s)': gpt3_response})

@quiz_bp.route('/follow_up', methods=['POST'])
def follow_up():
    message = request.form.get('message', '')  # Extract text message from form data

    files = request.files.getlist('files')  # Allows for multiple files
    material = []
    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            extracted_text = extract_text(filepath)
            material.append(extracted_text)
    materials = "\n".join(material) # concatenation separated by \n

    question = request.form.get('question', '')  # Extract text message from form data

    answer = request.form.get('answer', '')  # Extract text message from form data

    # @todo: prompt engineering
    prompt = f"Instructions: {message} \n Materials: {materials} \n Question: {question} \n Answer: {answer}"
    gpt3_response = ask_gpt3_follow(prompt)
    # @todo: further process and format the response from gpt3
    return jsonify({'follow_up_question': gpt3_response})
