import GenerationMechanics
import CipherAnalyzer
import importlib as imp
import contextlib
from flask import url_for, render_template, Flask, request, jsonify
from flask_cors import CORS
with contextlib.redirect_stdout(None):
    imp.reload(GenerationMechanics)
    imp.reload(CipherAnalyzer)

CipherAnalyzer.init()

app = Flask(__name__)
CORS(app)

flag1 = 0
flag2 = 0
password_length = 0

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/config', methods= ["POST"])
def config():
    global flag1, flag2, password_length
    if(request.method == "POST"):
        data = request.get_json()
        flag1 = data['flag1']
        flag2 = data['flag2']
        password_length = data['password_length']
    
    return {"message": "success"}

@app.route("/password", methods= ["GET"])
def generate():
    global flag1, flag2, password_length
    password = GenerationMechanics.gen_pass(int(flag1), int(flag2), int(password_length))
    strength = CipherAnalyzer.analyze(password)
    if(request.method == "GET"):
        return jsonify({"password": password, "strength": strength})
        

if __name__ == '__main__':
    app.run(debug=False)
