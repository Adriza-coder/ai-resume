CareerGenie – AI-Powered Resume Builder

CareerGenie is an intelligent resume builder for students and professionals that leverages AI and Machine Learning to create professional, tailored resumes. The project predicts the candidate’s domain and generates a clean, formatted resume automatically based on input data.

🌟 Features

AI-Powered Resume Classification:
Uses a machine learning model to predict the candidate’s domain (e.g., Software Engineer, Data Scientist, Product Manager).

Customizable Resume Templates:
Generates a structured HTML/CSS resume with sections for personal info, education, experience, projects, skills, and extracurricular activities.

Interactive Frontend:
User-friendly interface to enter details and generate resumes instantly.

Download & Copy Options:

Print resumes as PDF.

Copy HTML & CSS files for further customization.

Mock AI Module:
Supports AI functionality without requiring paid API keys, ensuring full offline functionality.

🛠 Tools & Technologies Used

Frontend: HTML, CSS, JavaScript

Backend / AI Module: Python, scikit-learn, pandas

Framework: Flask (for AI integration and serving predictions)

Machine Learning: Resume domain classification using ML models

Project Structure
CareerGenie/

├── index.html            # Frontend interface

├── style.css             # Frontend styling

├── script.js             # Resume generation logic

├── ai_module/            # ML model & prediction scripts
│   └── resume_classifier.py

├── app.py                # Flask server for AI integration


AI & ML Details

Resume Classification:
The ML model predicts the user’s domain based on their input data.

Data Handling:
Uses pandas to process user input and scikit-learn for model prediction.

Offline Support:
Does not require paid API keys; fully functional AI module for demo purposes.



Access your app in the browser

Open any browser and go to:

http://127.0.0.1:5000


You should see your index.html page if you set up Flask to serve it.
