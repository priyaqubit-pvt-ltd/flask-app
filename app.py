from flask import Flask, render_template, request, jsonify,redirect, url_for,flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = "secret_key"

@app.route('/')
def index():
    return render_template('setup.html')

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port='80')