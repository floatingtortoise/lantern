from flask import Flask, request, jsonify
from flask_cors import CORS

# app instance
app = Flask(__name__)
# enable CORS, cross-origin resource sharing
CORS(app)

@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({
        'question': 'What are examples of cleaning and transforming data?',
        'choices': ['Removing missing values, converting data types', 'Creating new columns, filtering data', 'All of the above', 'None of the above']
    })

# run the app
# if __name__=="__main__":
#     app.run(debug=True, port=8080)