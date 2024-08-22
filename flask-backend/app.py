from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Flask Mock Backend"

mock_predictions = {
    "AA123": {"prediction": "On Time", "probability": 85},
    "DL456": {"prediction": "Delayed", "probability": 75},
    "UA789": {"prediction": "Delayed", "probability": 65}
}

mock_accuracy = [
    {"model": "Model A", "accuracy": 90},
    {"model": "Model B", "accuracy": 85},
    {"model": "Model C", "accuracy": 80}
]

# Mock prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    flight_number = data.get('flight_number')
    
    if flight_number in mock_predictions:
        response = mock_predictions[flight_number]
    else:
        response = {"prediction": "Unknown", "probability": 0}
    
    return jsonify(response)

# Mock accuracy endpoint
@app.route('/accuracy', methods=['GET'])
def accuracy():
    return jsonify(mock_accuracy)

if __name__ == '__main__':
    app.run(debug=True)
