"""
Training script for the Job Recommendation ML model.
Generates synthetic resume-like training data from the role-skill mappings,
trains an SVM classifier with TF-IDF vectorization, and saves .pkl files.
"""
import pickle
import random
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report

# ─── Role → Skills mapping (aligned with mock_app.py + skills.txt) ─────────
ROLE_SKILLS = {
    "Software Developer": [
        "Java", "Python", "JavaScript", "TypeScript", "React", "Angular", "Vue.js",
        "Node.js", "Express.js", "Spring Boot", "Hibernate", "JPA", "Docker",
        "Kubernetes", "Git", "GitHub", "REST API", "GraphQL", "Microservices",
        "PHP", "Go", "Rust", "Kotlin", "Swift", "C++", "C#",
        "backend development", "frontend development", "fullstack development",
        "software engineering", "web development", "agile development",
        "object oriented programming", "data structures", "algorithms",
        "MySQL", "PostgreSQL", "MongoDB", "Redis"
    ],
    "Data Scientist": [
        "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
        "Scikit-Learn", "Pandas", "NumPy", "Data Science", "Natural Language Processing",
        "Computer Vision", "Artificial Intelligence", "statistics", "regression",
        "classification", "clustering", "neural networks", "random forest",
        "gradient boosting", "feature engineering", "model evaluation",
        "data preprocessing", "data visualization", "Jupyter", "R programming",
        "Apache Spark", "Big Data", "Hadoop"
    ],
    "Data Analyst": [
        "SQL", "Excel", "Tableau", "Power BI", "Data Analytics",
        "data visualization", "reporting", "dashboard", "data analysis",
        "statistical analysis", "business intelligence", "data mining",
        "ETL", "data warehousing", "Google Analytics", "pivot tables",
        "data cleaning", "A/B testing", "KPI tracking", "MySQL", "PostgreSQL",
        "Pandas", "NumPy", "Python"
    ],
    "DevOps Engineer": [
        "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud Platform",
        "CI/CD", "Jenkins", "Terraform", "Ansible", "Linux", "Shell Scripting",
        "cloud computing", "DevOps", "infrastructure as code", "monitoring",
        "Prometheus", "Grafana", "EC2", "S3", "Lambda", "microservices",
        "container orchestration", "load balancing", "nginx", "automation"
    ],
    "Cyber Security Analyst": [
        "Ethical Hacking", "Penetration Testing", "Cyber Security",
        "Vulnerability Assessment", "Incident Response", "SIEM", "Cryptography",
        "Network Security", "information security", "malware analysis",
        "firewall", "intrusion detection", "security audit", "compliance",
        "OWASP", "security operations", "threat analysis", "forensics",
        "risk assessment", "identity management"
    ],
    "Network Engineer": [
        "Cisco", "CCNA", "Routing", "Switching", "TCP/IP", "DNS", "DHCP",
        "Firewall", "VPN", "network administration", "LAN", "WAN",
        "network troubleshooting", "wireless networking", "network design",
        "network monitoring", "Wireshark", "subnetting", "OSI model",
        "network protocols", "SNMP"
    ],
    "Mechanical Engineer": [
        "AutoCAD", "SolidWorks", "CATIA", "ANSYS", "MATLAB",
        "PLC", "CNC", "Manufacturing", "Lean Manufacturing", "Six Sigma",
        "Quality Control", "mechanical design", "thermodynamics",
        "fluid mechanics", "material science", "3D modeling", "GD&T",
        "product development", "CAD/CAM", "FEA analysis"
    ],
    "Civil Engineer": [
        "AutoCAD Civil 3D", "STAAD Pro", "ETABS", "Revit", "Surveying",
        "Quantity Estimation", "Construction Management", "Structural Analysis",
        "site supervision", "blueprint reading", "concrete technology",
        "soil mechanics", "project planning", "building codes",
        "cost estimation", "foundation design"
    ],
    "Electrical Engineer": [
        "Power Systems", "PLC", "SCADA", "Embedded Systems", "VLSI",
        "Circuit Design", "MATLAB", "Electrical Maintenance",
        "power distribution", "transformer", "motor control",
        "electrical wiring", "relay protection", "switchgear",
        "power electronics", "renewable energy"
    ],
    "Electronics Engineer": [
        "Arduino", "Raspberry Pi", "Embedded C", "Microcontrollers",
        "PCB Design", "IoT", "FPGA", "sensor integration",
        "signal processing", "digital electronics", "analog electronics",
        "VHDL", "Verilog", "wireless communication", "RF design"
    ],
    "UI/UX Designer": [
        "Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe XD",
        "UI Design", "UX Design", "Canva", "Graphic Design",
        "wireframing", "prototyping", "user research", "usability testing",
        "interaction design", "visual design", "design thinking",
        "color theory", "typography", "responsive design", "Sketch"
    ],
    "Digital Marketing Specialist": [
        "Digital Marketing", "SEO", "SEM", "Google Ads",
        "Social Media Marketing", "Content Marketing", "Email Marketing",
        "Lead Generation", "CRM", "analytics", "brand management",
        "campaign management", "PPC", "conversion optimization",
        "marketing automation", "copywriting", "influencer marketing"
    ],
    "Project Manager": [
        "Project Management", "Agile", "Scrum", "Kanban",
        "Business Analysis", "Strategic Planning", "Operations Management",
        "Risk Management", "stakeholder management", "JIRA",
        "project planning", "resource allocation", "budgeting",
        "team leadership", "PMP", "Prince2", "Gantt charts"
    ],
    "HR Manager": [
        "Recruitment", "Talent Acquisition", "Payroll Management",
        "Employee Relations", "Performance Management", "HR Analytics",
        "Onboarding", "talent management", "compensation benefits",
        "labor laws", "organizational development", "HRIS",
        "workforce planning", "diversity inclusion", "exit interviews"
    ],
    "Financial Analyst": [
        "Financial Analysis", "Tally", "GST", "Taxation", "Auditing",
        "Bookkeeping", "QuickBooks", "SAP FICO", "Investment Analysis",
        "financial modeling", "budgeting", "forecasting",
        "balance sheet", "profit loss", "cash flow", "accounting",
        "cost accounting", "variance analysis", "financial reporting"
    ],
    "Content Writer": [
        "Content Writing", "Copywriting", "Technical Writing",
        "Blog Writing", "Proofreading", "Journalism", "Public Relations",
        "SEO writing", "article writing", "editing", "storytelling",
        "creative writing", "social media content", "content strategy",
        "grammar", "research writing"
    ],
    "Teacher": [
        "Teaching", "Curriculum Development", "Classroom Management",
        "Lesson Planning", "Student Assessment", "education",
        "pedagogy", "instructional design", "e-learning",
        "student engagement", "academic counseling", "evaluation",
        "special education", "tutoring", "mentoring"
    ],
    "Healthcare Professional": [
        "Patient Care", "Clinical Research", "Medical Coding",
        "Phlebotomy", "Nursing", "Electronic Health Records",
        "Healthcare Management", "pharmacology", "medical terminology",
        "vital signs", "patient assessment", "HIPAA", "clinical trials",
        "healthcare administration", "medical billing"
    ],
    "Legal Professional": [
        "Legal Research", "Contract Drafting", "Corporate Law",
        "Compliance", "Litigation", "legal writing", "case analysis",
        "intellectual property", "dispute resolution", "regulatory affairs",
        "court procedures", "legal documentation", "arbitration"
    ],
    "Supply Chain Manager": [
        "Inventory Management", "Warehouse Management", "Procurement",
        "Logistics", "Supply Chain Management", "Demand Forecasting",
        "vendor management", "distribution", "transportation",
        "materials planning", "ERP", "SAP", "lean supply chain",
        "order fulfillment", "sourcing"
    ],
}

# ─── Templates for synthetic resume text ──────────────────────────────────────
TEMPLATES = [
    "Experienced professional with expertise in {skills}. Worked on projects involving {s1} and {s2}.",
    "Skilled in {skills}. Strong background in {s1}, {s2}, and {s3}.",
    "Proficient in {skills}. Delivered solutions using {s1} and {s2} in production environments.",
    "{s1} expert with hands-on experience in {skills}. Passionate about {s2}.",
    "Background in {skills}. Key competencies include {s1}, {s2}, {s3}.",
    "Seeking opportunities in {role_hint}. Skills include {skills}.",
    "Professional with {exp} years experience in {s1}, {s2}, and related technologies like {s3}.",
    "Resume: {skills}. Proven track record in {s1} and {s2} across multiple projects.",
    "Core competencies: {skills}. Additional experience with {s1} and {s2}.",
    "Worked extensively with {s1}, {s2}, {s3}. Also familiar with {skills}.",
    "Summary: {exp} years in the industry. Technical skills: {skills}.",
    "Objective: To leverage my skills in {s1}, {s2} and {skills} to contribute to organizational growth.",
    "Education and skills in {skills}. Certifications in {s1} and {s2}.",
    "Handled projects in {s1} and {s2}. Proficiency in {skills}.",
    "Skills: {skills}\nExperience: {exp} years\nKey areas: {s1}, {s2}",
]

def generate_training_data(samples_per_role=150, seed=42):
    """Generate synthetic resume snippets for each role."""
    random.seed(seed)
    np.random.seed(seed)

    texts = []
    labels = []

    for role, skills in ROLE_SKILLS.items():
        for _ in range(samples_per_role):
            # Pick a random subset of skills (3 to min(8, len(skills)))
            n_skills = random.randint(3, min(8, len(skills)))
            chosen = random.sample(skills, n_skills)

            # Fill template
            template = random.choice(TEMPLATES)
            s_list = chosen + chosen  # ensure we have enough to pick from
            text = template.format(
                skills=", ".join(chosen),
                s1=s_list[0],
                s2=s_list[1],
                s3=s_list[2],
                role_hint=role.lower(),
                exp=random.randint(1, 15),
            )
            texts.append(text)
            labels.append(role)

    return texts, labels


def main():
    print("=" * 60)
    print("  Job Recommendation ML Model Training")
    print("=" * 60)

    # 1. Generate data
    print("\n[1/5] Generating synthetic training data...")
    texts, labels = generate_training_data(samples_per_role=200)
    print(f"      Generated {len(texts)} samples across {len(set(labels))} roles")

    # 2. Encode labels
    print("[2/5] Encoding labels...")
    encoder = LabelEncoder()
    y = encoder.fit_transform(labels)
    print(f"      Classes: {list(encoder.classes_)}")

    # 3. TF-IDF vectorization
    print("[3/5] Building TF-IDF vectors...")
    tfidf = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        stop_words='english',
        sublinear_tf=True,
    )
    X = tfidf.fit_transform(texts)
    print(f"      Feature matrix shape: {X.shape}")

    # 4. Train SVM classifier
    print("[4/5] Training LinearSVC classifier...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    clf = LinearSVC(
        C=1.0,
        max_iter=5000,
        class_weight='balanced',
        random_state=42,
    )
    clf.fit(X_train, y_train)

    # Evaluation
    train_acc = clf.score(X_train, y_train)
    test_acc = clf.score(X_test, y_test)
    print(f"\n      Train accuracy: {train_acc:.4f}")
    print(f"      Test accuracy:  {test_acc:.4f}")

    # Cross-validation
    print("\n      Running 5-fold cross-validation...")
    cv_scores = cross_val_score(clf, X, y, cv=5, scoring='accuracy')
    print(f"      CV scores: {cv_scores}")
    print(f"      CV mean:   {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")

    # Classification report
    y_pred = clf.predict(X_test)
    print("\n      Classification Report:")
    print(classification_report(
        y_test, y_pred,
        target_names=encoder.classes_,
        digits=3
    ))

    # 5. Save models
    print("[5/5] Saving model files...")
    pickle.dump(clf, open("clf.pkl", "wb"))
    pickle.dump(tfidf, open("tfidf.pkl", "wb"))
    pickle.dump(encoder, open("encoder.pkl", "wb"))
    print("      Saved: clf.pkl, tfidf.pkl, encoder.pkl")

    print("\n" + "=" * 60)
    print("  Training complete! Model files ready for app.py")
    print("=" * 60)


if __name__ == "__main__":
    main()
