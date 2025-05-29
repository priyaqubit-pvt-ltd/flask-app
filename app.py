from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Length, Optional
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = "8f2e9d1c6b5a4e3f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3"

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "blog.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'admin_login'

# Models
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def get_id(self):
        return str(self.id)
    
    def is_authenticated(self):
        return True
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    excerpt = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(200), nullable=True)
    is_featured = db.Column(db.Boolean, default=False)
    is_published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<BlogPost {self.title}>'

# Forms
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class BlogPostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=1, max=200)])
    excerpt = TextAreaField('Excerpt', validators=[Optional(), Length(max=500)])
    content = TextAreaField('Content', validators=[DataRequired()])
    image_url = StringField('Image URL', validators=[Optional(), Length(max=200)])
    is_featured = BooleanField('Featured Post', default=False)
    is_published = BooleanField('Published', default=True)

@login_manager.user_loader
def load_user(user_id):
    return Admin.query.get(int(user_id))

# Flask-Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'anjalypriya7@gmail.com'
app.config['MAIL_PASSWORD'] = 'kiod yhth lecq xaau'

mail = Mail(app)

# Create database tables and sample data
def create_sample_data():
    """Create sample blog posts and admin user"""
    
    # Create admin user
    admin = Admin(
        username='admin',
        email='admin@lozy.in'
    )
    admin.set_password('admin123')
    
    # Sample blog posts
    sample_posts = [
        {
            'title': 'The Ultimate Guide to Choosing the Right Storage Unit',
            'content': '''<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <h3>Why Choose the Right Storage Unit?</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            
            <h3>Key Factors to Consider</h3>
            <ul>
                <li>Size requirements</li>
                <li>Security features</li>
                <li>Location accessibility</li>
                <li>Climate control</li>
                <li>Pricing and contracts</li>
            </ul>''',
            'excerpt': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'image_url': '/static/images/blog_hero_section.webp',
            'is_featured': True
        },
        {
            'title': 'Designing for Tomorrow: Trends Shaping the User Experience in 2025',
            'content': '''<p>As technology continues to evolve, so does its impact on the environment. At the intersection of innovation and responsibility lies the need for sustainable practices in the tech industry.</p>
            
            <h3>Emerging Trends</h3>
            <p>The future of user experience design is being shaped by several key trends that prioritize both functionality and sustainability.</p>''',
            'excerpt': 'As technology continues to evolve, so does its impact on the environment. At the intersection of innovation and responsibility lies the need for sustainable practices in the tech industry',
            'image_url': '/static/images/blog_image_1.webp',
            'is_featured': False
        }
    ]
    
    try:
        db.session.add(admin)
        
        for post_data in sample_posts:
            post = BlogPost(**post_data)
            db.session.add(post)
        
        db.session.commit()
        print("Sample data created successfully!")
        print("Admin login: admin / admin123")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.session.rollback()

# Create database tables
with app.app_context():
    db.create_all()
    
    # Create sample data if no admin exists
    if not Admin.query.first():
        create_sample_data()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/index')
def index():
    return render_template('index.html')

# ===== BLOG ROUTES =====
@app.route("/blogs")
def blogs():
    # Get featured post
    featured_post = BlogPost.query.filter_by(is_featured=True, is_published=True).first()
    
    # Get all published posts (excluding featured)
    if featured_post:
        blog_posts = BlogPost.query.filter_by(is_published=True).filter(BlogPost.id != featured_post.id).order_by(BlogPost.created_at.desc()).all()
    else:
        blog_posts = BlogPost.query.filter_by(is_published=True).order_by(BlogPost.created_at.desc()).all()
    
    return render_template("blogs.html", featured_post=featured_post, blog_posts=blog_posts)

@app.route("/blog/<int:post_id>")
def blog_detail(post_id):
    post = BlogPost.query.get_or_404(post_id)
    if not post.is_published and not current_user.is_authenticated:
        return redirect(url_for('blogs'))
    
    # Get related posts (3 latest posts excluding current)
    related_posts = BlogPost.query.filter_by(is_published=True).filter(BlogPost.id != post_id).order_by(BlogPost.created_at.desc()).limit(3).all()
    
    return render_template("blog-detail.html", post=post, related_posts=related_posts)

@app.route("/blog")  # Keep this for backward compatibility
def blog():
    # Redirect to the first published post or blogs page
    first_post = BlogPost.query.filter_by(is_published=True).order_by(BlogPost.created_at.desc()).first()
    if first_post:
        return redirect(url_for('blog_detail', post_id=first_post.id))
    return redirect(url_for('blogs'))

# ===== ADMIN ROUTES =====
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if current_user.is_authenticated:
        return redirect(url_for('admin_dashboard'))
    
    form = LoginForm()
    if form.validate_on_submit():
        admin = Admin.query.filter_by(username=form.username.data).first()
        if admin and admin.check_password(form.password.data):
            login_user(admin)
            flash('Login successful!', 'success')
            return redirect(url_for('admin_dashboard'))
        flash('Invalid username or password', 'error')
    
    return render_template('admin/login.html', form=form)

@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    flash('You have been logged out', 'success')
    return redirect(url_for('admin_login'))

@app.route('/admin')
@login_required
def admin_dashboard():
    total_posts = BlogPost.query.count()
    published_posts = BlogPost.query.filter_by(is_published=True).count()
    featured_posts = BlogPost.query.filter_by(is_featured=True).count()
    recent_posts = BlogPost.query.order_by(BlogPost.created_at.desc()).limit(5).all()
    
    return render_template('admin/dashboard.html', 
                         total_posts=total_posts,
                         published_posts=published_posts,
                         featured_posts=featured_posts,
                         recent_posts=recent_posts)

@app.route('/admin/posts')
@login_required
def admin_posts():
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return render_template('admin/posts.html', posts=posts)

@app.route('/admin/posts/new', methods=['GET', 'POST'])
@login_required
def admin_new_post():
    form = BlogPostForm()
    
    if request.method == 'POST':
        print("Form submitted!")
        print("Form data:", request.form)
        
        if form.validate_on_submit():
            print("Form validation passed!")
            
            # If this post is set as featured, remove featured from other posts
            if form.is_featured.data:
                BlogPost.query.filter_by(is_featured=True).update({'is_featured': False})
                db.session.commit()
            
            post = BlogPost(
                title=form.title.data,
                content=form.content.data,
                excerpt=form.excerpt.data,
                image_url=form.image_url.data or '/static/images/blog_image_1.webp',
                is_featured=form.is_featured.data,
                is_published=form.is_published.data,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            
            try:
                db.session.add(post)
                db.session.commit()
                flash('Post created successfully!', 'success')
                print(f"Post created: {post.title}")
                return redirect(url_for('admin_posts'))
            except Exception as e:
                db.session.rollback()
                flash(f'Error creating post: {str(e)}', 'error')
                print(f"Error creating post: {e}")
        else:
            print("Form validation failed!")
            print("Form errors:", form.errors)
            for field, errors in form.errors.items():
                for error in errors:
                    flash(f'{field}: {error}', 'error')
    
    return render_template('admin/post_form.html', form=form, title='New Post')

@app.route('/admin/posts/<int:post_id>/edit', methods=['GET', 'POST'])
@login_required
def admin_edit_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    form = BlogPostForm(obj=post)
    
    if request.method == 'POST':
        if form.validate_on_submit():
            # If this post is set as featured, remove featured from other posts
            if form.is_featured.data and not post.is_featured:
                BlogPost.query.filter_by(is_featured=True).update({'is_featured': False})
                db.session.commit()
            
            post.title = form.title.data
            post.content = form.content.data
            post.excerpt = form.excerpt.data
            post.image_url = form.image_url.data
            post.is_featured = form.is_featured.data
            post.is_published = form.is_published.data
            post.updated_at = datetime.utcnow()
            
            try:
                db.session.commit()
                flash('Post updated successfully!', 'success')
                return redirect(url_for('admin_posts'))
            except Exception as e:
                db.session.rollback()
                flash(f'Error updating post: {str(e)}', 'error')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    flash(f'{field}: {error}', 'error')
    
    return render_template('admin/post_form.html', form=form, title='Edit Post', post=post)

@app.route('/admin/posts/<int:post_id>/delete', methods=['POST'])
@login_required
def admin_delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    
    try:
        db.session.delete(post)
        db.session.commit()
        flash('Post deleted successfully!', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error deleting post: {str(e)}', 'error')
    
    return redirect(url_for('admin_posts'))

# ===== ALL YOUR EXISTING ROUTES =====
@app.route('/contact-page-submit', methods=["POST"])
def submit():
    if request.method == "POST":
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_contact = request.form.get('contact_number')
        user_location = request.form.get('location')
        
        if not user_name or not user_email or not user_contact or not user_location:
            return "All fields are required!", 400

        client_email = app.config['MAIL_USERNAME']
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nlocation: {user_location}"

        try:
            msg = Message(subject, recipients=[client_email], body=body, sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success")
        except Exception as e:
            flash("Email sending failed!", "error")

        return redirect(url_for('contact'))

@app.route('/home-page-submit', methods=["POST"])
def home_submit():
    if request.method == "POST":
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_message = request.form.get('question')
        user_location = request.form.get('location')
        
        if not user_name or not user_email or not user_message or not user_location:
            return "All fields are required!", 400

        client_email = app.config['MAIL_USERNAME']
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nMessage: {user_message}\nlocation: {user_location}"

        try:
            msg = Message(subject, recipients=[client_email], body=body, sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success")
        except Exception as e:
            flash("Email sending failed!", "error")

        return redirect(url_for('index'))

@app.route('/contact-popup-submit', methods=["POST"])
def submit2():
    if request.method == "POST":
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_contact = request.form.get('contact_number')
        user_message = request.form.get('message')
        user_location = request.form.get('location')
        
        if not user_name or not user_email or not user_message or not user_location or not user_contact:
            return "All fields are required!", 400

        client_email = app.config['MAIL_USERNAME']
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nMessage: {user_message}\nlocation: {user_location}"

        try:
            msg = Message(subject, recipients=[client_email], body=body, sender=user_email)
            mail.send(msg)
            flash("Your form has been submitted successfully!", "success")
        except Exception as e:
            flash("Email sending failed!", "error")

        return redirect(url_for('index'))

@app.route('/blog-faq-page-submit', methods=["POST"])
def blog_faq_page():
    if request.method == "POST":
        user_name = request.form.get('name')
        user_email = request.form.get('email')
        user_contact = request.form.get('contact_number')
        user_question = request.form.get('question')
       
        if not user_name or not user_email or not user_contact or not user_question:
            return "All fields are required!", 400

        client_email = app.config['MAIL_USERNAME']
        subject = f"New Request from {user_name}"
        body = f"Name: {user_name}\nEmail: {user_email}\nContact: {user_contact}\nQuestion: {user_question}"

        try:
            msg = Message(subject, recipients=[client_email], body=body, sender=user_email)
            mail.send(msg)
            return "Your form has been submitted successfully!", 200
        except Exception as e:
            flash("Email sending failed!", "error")

        return "Error", 400

# All your existing routes
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

@app.route("/about-us")
def about():
    return render_template("about-us.html")

@app.route("/blog-desc")
def blogDesc():
    return render_template("blog-desc.html")
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='80')