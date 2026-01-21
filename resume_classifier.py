# ==========================================
# AI MODULE: Resume Domain Classification
# ==========================================
# This module uses NLP + Machine Learning
# to classify resumes into career domains
# ==========================================

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# -------------------------------
# Training Dataset (Sample)
# -------------------------------
training_data = [
    ("Python Java C++ SQL React Node", "Software Engineer"),
    ("Machine Learning Deep Learning Python Data Analysis", "Data Scientist"),
    ("SEO Digital Marketing Branding Campaign Analytics", "Marketing"),
    ("UI UX Design Figma Wireframes Prototyping", "UI/UX Designer"),
    ("Agile Scrum Product Roadmap Stakeholder", "Product Manager"),
]

texts = [item[0] for item in training_data]
labels = [item[1] for item in training_data]

# -------------------------------
# AI Model Pipeline
# -------------------------------
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("classifier", MultinomialNB())
])

# Train the AI model
model.fit(texts, labels)

# -------------------------------
# Prediction Function
# -------------------------------
def predict_resume_domain(resume_text):
    prediction = model.predict([resume_text])
    return prediction[0]

# -------------------------------
# Test Execution
# -------------------------------
if __name__ == "__main__":
    sample_resume = """
    Developed web applications using React and Node.js.
    Worked with Python, REST APIs, and SQL databases.
    """

    result = predict_resume_domain(sample_resume)
    print("Predicted Resume Domain:", result)
