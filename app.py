from flask import Flask, render_template, request, jsonify,redirect, url_for,flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = "secret_key"

@app.route('/pre')
def home():
    return render_template('Home.html')

@app.route('/')
def index():
    return render_template('index.html')

# ✅ Flask-Mail Configuration (Update with your SMTP settings)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Replace with your mail server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'anjalypriya7@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'kiod yhth lecq xaau' 

mail = Mail(app)

@app.route('/submit1', methods=["POST"])
def submit():
    if request.method== "POST":
        print(request.form)  # Debug: Print form data
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_contact = request.form.get('contact_number')
        user_location = request.form.get('location')
        
        print(user_name)
        # ✅ Validate Form Data
        if not user_name or not user_email or not user_contact or not user_location:
            return "All fields are required!", 400  # Bad Request

        
        # Send email to the client
        client_email =app.config['MAIL_USERNAME']   # Replace with the website's client email
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nlocation: {user_location}"

        try:
            msg = Message(subject, recipients=[client_email], body=body,sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success") 

        except Exception as e:
            
            print(f"Error: {e}")
            flash("Email sending failed!", "error") 

        return redirect(url_for('home1'))



@app.route('/submit2', methods=["POST"])
def submit2():
    if request.method== "POST":
        print(request.form)  # Debug: Print form data
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_message = request.form.get('message')
        user_location = request.form.get('location')
        
        print(user_name)
        # ✅ Validate Form Data
        if not user_name or not user_email or not user_message or not user_location:
            return "All fields are required!", 400  # Bad Request

        
        # Send email to the client
        client_email =app.config['MAIL_USERNAME']   # Replace with the website's client email
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_message}\nlocation: {user_location}"

        try:
            msg = Message(subject, recipients=[client_email], body=body,sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success") 

        except Exception as e:
            
            print(f"Error: {e}")
            flash("Email sending failed!", "error") 

        return redirect(url_for('home1'))
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
def news():
    return render_template("News.html")

@app.route("/News-desc")
def newsDesc():
    return render_template("News-desc.html")

@app.route("/404")
def e404():
    return render_template("404.html")

@app.route("/contact")
def contact():
    return render_template("contact-us.html")


@app.route("/blogs")
def blogs():
    return render_template("blogs.html")



if __name__ == '__main__':
    # app.run(debug=True)
    app.run(debug=True, host='0.0.0.0', port='8080')

@app.route("/faq")
def faq():
    return render_template("Faq.html")
 
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='80')

