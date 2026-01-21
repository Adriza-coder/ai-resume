from flask import Flask, request, jsonify, send_from_directory
from ai_module.resume_classifier import predict_resume_domain

app = Flask(__name__)

# Serve frontend files
@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/style.css")
def style():
    return send_from_directory(".", "style.css")

@app.route("/script.js")
def script():
    return send_from_directory(".", "script.js")

# AI endpoint
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    resume_text = data.get("resume_text", "")
    if not resume_text.strip():
        return jsonify({"error": "No resume text provided"}), 400

    prediction = predict_resume_domain(resume_text)
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(debug=True)
