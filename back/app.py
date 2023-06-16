from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/attendance', methods=['POST'])
def attend():
    data = request.get_json()
    name = data['name']
    
    return 'Hello {}'.format(name)

if __name__ == "__main__":
    app.run(debug=True)
