# 🥘 Right-Over – Smart Recipe Finder Based on Ingredients

**Right-Over** is a web application that helps users find recipes based on the ingredients they already have at home. By entering available ingredients, kitchen equipment, and nutritional preferences, users get personalized recipe suggestions.

The project combines a **React frontend** with a **Django REST API backend** and includes a sample dataset for demonstration purposes.

---

## 🚀 Features

- Input ingredients, equipment, and nutrition filters
- Get only recipes you can actually cook
- Responsive and user-friendly interface
- REST API for backend data handling
- Pre-loaded demo data (SQLite)

---

## 🛠 Technologies Used

- **Frontend:** React, JavaScript
- **Backend:** Django, Django REST Framework
- **Database:** SQLite
- **Other:** WhiteNoise, CORS, Docker (for internal dev)

---

## ⚙️ Installation & Run Guide

### Backend – Django

```bash
# Install dependencies
pip install django
pip install django-cors-headers
pip install djangorestframework
pip install whitenoise

# Setup and run
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
