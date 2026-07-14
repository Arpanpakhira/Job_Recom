import os
import logging
from flask import Flask, request, jsonify
import pickle
import numpy as np

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Load model files from configurable path
MODEL_DIR = os.environ.get("MODEL_DIR", ".")
clf = pickle.load(open(os.path.join(MODEL_DIR, "clf.pkl"), "rb"))
tfidf = pickle.load(open(os.path.join(MODEL_DIR, "tfidf.pkl"), "rb"))
encoder = pickle.load(open(os.path.join(MODEL_DIR, "encoder.pkl"), "rb"))

logger.info("ML models loaded successfully")


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "ml-recommendation"}), 200


@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Prediction request received")
    data = request.get_json()

    text = data.get("text", "")
    if not text:
        return jsonify({"error": "text is required"}), 400

    vector = tfidf.transform([text])
    dense_vector = vector.toarray()
    scores = clf.decision_function(dense_vector)[0]
    
    # Scale SVM decision scores to [0, 1] range using Sigmoid function
    probabilities = 1 / (1 + np.exp(-scores))
    
    top3_idx = np.argsort(scores)[-3:][::-1]
    top3_roles = []
    prediction = clf.predict(dense_vector)

    role = encoder.inverse_transform(prediction)[0]

    for idx in top3_idx:
        top3_roles.append({
            "role": encoder.classes_[idx],
            "score": round(float(probabilities[idx]), 4)
        })

    logger.info("Top 3 roles predicted: %s", [r["role"] for r in top3_roles])
    return jsonify({
        "role": role,
        "recommendedRoles": top3_roles,
        "skills": [],
        "version": "v1.0"
    })


if __name__ == '__main__':
    # For local development only — production uses gunicorn
    app.run(host='0.0.0.0', port=8000, debug=False)