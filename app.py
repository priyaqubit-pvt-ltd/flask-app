from flask import Flask, render_template, request, jsonify,redirect, url_for,flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = "secret_key"
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/navbar')
def navbar():
    return render_template('navbar.html')


 
@app.route("/self-storage")
def hello_world():
    return render_template("self-storage.html")
 
@app.route("/corporate-storage")
def corporate():
    return render_template("corporate-storage.html")

@app.route("/platinum-storage")
def platinum():
    return render_template("platinum-class.html")


@app.route("/News")
def News():
    return render_template("News.html")

@app.route("/footer")
def footer():
    return render_template("footer.html")

@app.route("/news-desc")
def newsDesc():
    return render_template("news-desc.html")

@app.route("/404")
def e404():
    return render_template("404.html")

@app.route("/contact-us")
def contact():
    return render_template("contact-us.html")

@app.route("/blogs")
def blogs():
    return render_template("blogs.html")



if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port='8080')
