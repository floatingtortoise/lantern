import pytesseract
from PIL import Image
import fitz
# @todo: text extraction service: PyMuPDF

def extract_text_from_image(image_path):
    return pytesseract.image_to_string(Image.open(image_path))

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# @todo: more file types than just pdf or OCR
def extract_text(filepath):
    if filepath.endswith('.pdf'):
        return extract_text_from_pdf(filepath)
    else:
        return extract_text_from_image(filepath)
