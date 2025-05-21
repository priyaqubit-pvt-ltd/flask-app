from flask import Flask, render_template, request, jsonify,redirect, url_for,flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = "secret_key"

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/')
def home():
    """Route for the home page with animation"""
    return render_template('Home.html')

@app.route('/index')
def index():
    """Route for the main index page"""
    return render_template('index.html')

# ✅ Flask-Mail Configuration (Update with your SMTP settings)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Replace with your mail server
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'anjalypriya7@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'kiod yhth lecq xaau' 

mail = Mail(app)

@app.route('/contact-page-submit', methods=["POST"])
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

        return redirect(url_for('contact'))



@app.route('/contact-popup-submit', methods=["POST"])
def submit2():
    if request.method== "POST":
        print(request.form)  # Debug: Print form dat
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_contact = request.form.get('contact_number')
        user_message = request.form.get('message')
        user_location = request.form.get('location')
        
        print(user_name)
        # ✅ Validate Form Data
        if not user_name or not user_email or not user_message or not user_location or not user_contact:
            return "All fields are required!", 400  # Bad Request

        
        # Send email to the client
        client_email =app.config['MAIL_USERNAME']   # Replace with the website's client email
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nMessage: {user_message}\nlocation: {user_location}"

        try:
            msg = Message(subject, recipients=[client_email], body=body,sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success") 

        except Exception as e:
            
            print(f"Error: {e}")
            flash("Email sending failed!", "error") 

        return redirect(url_for('index'))
    
@app.route('/blog-page-submit', methods=["POST"])
def blog_page():
    if request.method== "POST":
        print(request.form)  # Debug: Print form data
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_contact = request.form.get('contact_number')
        user_question = request.form.get('question')
       
        print(user_name)
        # ✅ Validate Form Data
        if not user_name or not user_email or not user_contact or not user_question:
            flash("All fields are required!", "error")
            return redirect(url_for('blog'))  # Bad Request
 
       
        # Send email to the client
        client_email =app.config['MAIL_USERNAME']   # Replace with the website's client email
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nQuestion: {user_question}"
 
        try:
            msg = Message(subject, recipients=[client_email], body=body,sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success")
 
        except Exception as e:
           
            print(f"Error: {e}")
            flash("Email sending failed!", "error")
 
        return redirect(url_for('blog'))
    
@app.route('/faq-page-submit', methods=["POST"])
def faq_page():
    if request.method== "POST":
        print(request.form)  # Debug: Print form data
        user_name = request.form.get('fullName')
        user_email = request.form.get('email')
        user_contact = request.form.get('phone')
        user_question = request.form.get('question')
       
        print(user_name)
        # ✅ Validate Form Data
        if not user_name or not user_email or not user_contact or not user_question:
            flash("All fields are required!", "error")
            return redirect(url_for('blog'))  # Bad Request
 
       
        # Send email to the client
        client_email =app.config['MAIL_USERNAME']   # Replace with the website's client email
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nQuestion: {user_question}"
 
        try:
            msg = Message(subject, recipients=["client_email"], body=body,sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success")
 
        except Exception as e:
           
            print(f"Error: {e}")
            flash("Email sending failed!", "error")
 
        return redirect(url_for('faq'))

@app.route("/storage/self-storage")
def self():
    return render_template("self-storage.html")
 
@app.route("/storage/commercial-storage")
def corporate():
    return render_template("corporate-storage.html")

@app.route("/storage/platinum-storage")
def platinum():
    return render_template("platinum-class.html")

@app.route("/storage/business-storage")
def business():
    return render_template("business-storage.html")
 
@app.route("/storage/warehouse-storage")
def warehouse():
    return render_template("warehouse-storage.html")

@app.route("/storage/3pl-storage")
def storage3pl():
    return render_template("3pl-storage.html")

@app.route("/storage/bonded-storage")
def bonded():
    return render_template("bonded-storage.html")
 
@app.route("/storage/vehicle-storage")
def vehicle():
    return render_template("vehicle-storage.html")

@app.route("/storage/enterprises-storage")
def enterprise():
    return render_template("enterprises-storage.html")

@app.route("/news")
def news():
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

@app.route("/faq")
def faq():
    return render_template("Faq.html")

@app.route("/blogs")
def blogs():
    return render_template("blogs.html")

@app.route("/blog")
def blog():
    return render_template("blog.html")


@app.route("/about-us")
def about():
    return render_template("about-us.html")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='80')

