# handle document upload and initiate the text extraction process
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from ..services.text_extraction import extract_text
import os

doc_bp = Blueprint('document', __name__)


@doc_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'document' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['document']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join('/path/to/upload/directory', filename)
        file.save(filepath)

        # Extract text from the uploaded document
        extracted_text = extract_text(filepath)

        # @todo: further process the text, prompt engineering
        return jsonify({'message': 'File uploaded successfully', 'extracted_text': extracted_text}), 200
