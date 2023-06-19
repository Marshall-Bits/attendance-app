from flask import Flask, request, render_template, jsonify, Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, date
from io import StringIO
import csv


app = Flask(__name__)

CORS(app)

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Model


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    date_added = db.Column(db.Date, nullable=False,
                           default=datetime.now().date())
    time_added = db.Column(db.Time, nullable=False,
                           default=datetime.now().time())

current_date = date.today()

@app.route('/attendance', methods=['POST'])
def attend():
    data = request.get_json()
    name = data['name']

    student = Student(name=name)
    db.session.add(student)
    db.session.commit()

    # Obtain today's students
    students = Student.query.filter(Student.date_added == current_date).all()

    # Print students and time
    for student in students:
        print(f"Student: {student.name}, Time: {student.time_added}")

    return f'Thanks {name}, your entry is registered at {datetime.now().strftime("%H:%M")}'


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/list', methods=['GET'])
def list():
    students = Student.query.filter(Student.date_added == current_date).all()
    return render_template('list.html', students=students)


@app.route('/download/students', methods=['GET'])
def download_students():
    # Get the students from the database
    students = Student.query.filter(Student.date_added == current_date).all()

    # Create a CSV file
    csv_data = StringIO()
    csv_writer = csv.writer(csv_data)
    csv_writer.writerow(['Name'])
    for student in students:
        csv_writer.writerow([student.name])

    # Set the appropriate headers for the response
    headers = {
        'Content-Disposition': 'attachment; filename=student_list.csv',
        'Content-Type': 'text/csv'
    }

    # Create the response with CSV data
    response = Response(csv_data.getvalue(),
                        headers=headers, mimetype='text/csv')

    return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
