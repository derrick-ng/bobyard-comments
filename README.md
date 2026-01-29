# Bobyard Comments Take Home - Derrick Ng

## Prerequisites
 - Python 3.12+
 - Node.js 18+ and npm
 - Docker
 - Git

## Setup Instructions
1. git clone https://github.com/derrick-ng/bobyard-comments.git

### DB
Option 1. docker-compose up --build -d  

Option 2. CREATE DATABASE bobyard_comments_derrick;
CREATE USER bobyard_derrick WITH PASSWORD 'bobyard_derrick';
GRANT ALL PRIVILEGES ON DATABASE bobyard_comments_derrick TO bobyard_derrick;

### Backend
1. cd backend
2. python -m venv venv
3. source venv/bin/activate
4. pip install -r requirements.txt
5. python manage.py migrate
6. python manage.py load_comments ../comments.json
7. python manage.py runserver

### Frontend
1. Open a new terminal
2. cd frontend
3. npm install
4. npm run dev
5. go to http://localhost:5173