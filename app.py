



from flask import Flask, render_template, request, redirect, url_for
 
app = Flask(__name__)
 
@app.route("/self-storage")
def hello_world():
    return render_template("self-storage.html")
 
@app.route("/corporate-storage")
def corporate():
    return render_template("corporate-storage.html")

@app.route("/platinum-storage")
def platinum():
    return render_template("platinum-class.html")
 
if __name__ == "__main__":
    app.run(debug=True)