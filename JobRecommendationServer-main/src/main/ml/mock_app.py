"""
Mock ML service for development/testing when real .pkl model files are unavailable.
Returns realistic-looking predictions based on keyword matching.
"""
"""
import os
import logging
import random
from flask import Flask, request, jsonify

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Role definitions with associated keywords
ROLE_KEYWORDS = {
    "Software Developer": ["java", "python", "javascript", "react", "spring", "node", "angular", "vue", "typescript", "git", "docker", "api", "backend", "frontend", "fullstack"],
    "Data Scientist": ["machine learning", "deep learning", "tensorflow", "pytorch", "pandas", "numpy", "data science", "nlp", "computer vision", "statistics", "scikit"],
    "Data Analyst": ["sql", "excel", "tableau", "power bi", "data analytics", "visualization", "reporting", "dashboard", "data analysis"],
    "DevOps Engineer": ["docker", "kubernetes", "aws", "azure", "ci/cd", "jenkins", "terraform", "ansible", "linux", "cloud", "devops"],
    "Cyber Security Analyst": ["security", "penetration", "ethical hacking", "vulnerability", "firewall", "siem", "cryptography", "incident response"],
    "Network Engineer": ["cisco", "ccna", "routing", "switching", "tcp/ip", "dns", "dhcp", "firewall", "vpn", "network"],
    "Mechanical Engineer": ["autocad", "solidworks", "catia", "ansys", "matlab", "manufacturing", "cnc", "plc", "mechanical"],
    "Civil Engineer": ["autocad", "staad", "etabs", "revit", "surveying", "construction", "structural"],
    "UI/UX Designer": ["figma", "adobe", "photoshop", "illustrator", "ui design", "ux design", "wireframe", "prototype"],
    "Digital Marketing Specialist": ["seo", "sem", "google ads", "social media", "content marketing", "email marketing", "digital marketing"],
    "Project Manager": ["agile", "scrum", "kanban", "project management", "jira", "stakeholder", "risk management"],
    "HR Manager": ["recruitment", "talent", "payroll", "onboarding", "hr analytics", "employee relations"],
    "Financial Analyst": ["financial analysis", "accounting", "taxation", "auditing", "investment", "tally", "gst"],
    "Content Writer": ["content writing", "copywriting", "blog", "technical writing", "seo", "proofreading"],
    "Teacher": ["teaching", "curriculum", "lesson planning", "classroom", "student assessment", "education"],
}


def predict_role(text: str):
    
    text_lower = text.lower()
    scores = {}

    for role, keywords in ROLE_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in text_lower)
        if score > 0:
            scores[role] = score

    if not scores:
        scores = {"Software Developer": 1}

    # Sort by score descending
    sorted_roles = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    # Normalize scores to look like decision function values
    max_score = sorted_roles[0][1]
    top3 = []
    for role, score in sorted_roles[:3]:
        normalized = round(score / max(max_score, 1) * random.uniform(0.7, 1.0), 4)
        top3.append({"role": role, "score": normalized})

    return sorted_roles[0][0], top3


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "ml-recommendation-mock", "mode": "mock"}), 200


@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Prediction request received (MOCK MODE)")
    data = request.get_json()

    text = data.get("text", "")
    if not text:
        return jsonify({"error": "text is required"}), 400

    role, top3_roles = predict_role(text)

    logger.info("Predicted role: %s (mock)", role)
    logger.info("Top 3: %s", [r["role"] for r in top3_roles])

    return jsonify({
        "role": role,
        "recommendedRoles": top3_roles,
        "skills": [],
        "version": "MOCK_v1.0"
    })


if __name__ == '__main__':
    logger.info("Starting MOCK ML service (no .pkl files needed)")
    app.run(host='0.0.0.0', port=8000, debug=False)

"""