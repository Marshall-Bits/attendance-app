from flask import Flask, request, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, date


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


@app.route('/attendance', methods=['POST'])
def attend():
    data = request.get_json()
    name = data['name']

    student = Student(name=name)
    db.session.add(student)
    db.session.commit()

     # Obtain today's students
    current_date = date.today()
    students = Student.query.filter(Student.date_added == current_date).all()

    # Print students and time
    for student in students:
        print(f"Student: {student.name}, Time: {student.time_added}")

    return 'Thanks {}'.format(name)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
