from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from flask_mail import Mail, Message
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import db, Admin, BlogPost, create_sample_data
from forms import LoginForm, BlogPostForm
import os
from sqlalchemy import inspect
app = Flask(__name__)
app.secret_key = "your-secret-key-change-this"  # Change this!

# Database Configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "blog.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'admin_login'
print("Using DB:", app.config['SQLALCHEMY_DATABASE_URI'])

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



with app.app_context():
      db.create_all()
      print("Tables created:", inspect(db.engine).get_table_names())
      try:
          create_sample_data()
      except Exception as e:
          print("Error creating sample data:", e)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/blog-desc')
def blogDesc():
    return render_template('blog.html')

# ===== BLOG ROUTES =====
@app.route("/blogs")
def blogs():
    # Try to get a featured post
    featured_post = BlogPost.query.filter_by(is_featured=True, is_published=True).first()

    # Fallback to latest published post if no featured post
    if not featured_post:
        featured_post = BlogPost.query.filter_by(is_published=True).order_by(BlogPost.created_at.desc()).first()

    # Get all other posts excluding the one shown in hero section
    if featured_post:
        blog_posts = BlogPost.query.filter(
            BlogPost.is_published == True,
            BlogPost.id != featured_post.id
        ).order_by(BlogPost.created_at.desc()).all()
    else:
        blog_posts = []

    return render_template("blogs.html", featured_post=featured_post, blog_posts=blog_posts)

@app.route("/blog/<int:post_id>")
def blog_detail(post_id):
    post = BlogPost.query.get_or_404(post_id)
    if not post.is_published:
        return redirect(url_for('blogs'))
    
    # Get related posts (3 latest posts excluding current)
    related_posts = BlogPost.query.filter_by(is_published=True).filter(BlogPost.id != post_id).order_by(BlogPost.created_at.desc()).limit(10).all()
    
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
        # Check if admin exists
        admin = Admin.query.filter_by(username=form.username.data).first()

         # Validate password
        if admin and admin.check_password(form.password.data):
            login_user(admin)

            return redirect(url_for('admin_dashboard'))
        flash('Invalid username or password', 'error')
    
    return render_template('admin/login.html', form=form)

@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    return redirect(url_for('blogs'))

@app.route('/admin')
@login_required
def admin_dashboard():
     # Fetch blog stats
    total_posts = BlogPost.query.count()
    published_posts = BlogPost.query.filter_by(is_published=True).count()
    featured_posts = BlogPost.query.filter_by(is_featured=True).count()
    recent_posts = BlogPost.query.order_by(BlogPost.created_at.desc()).limit(10).all()
    
    return render_template('admin/dashboard.html', 
                         total_posts=total_posts,
                         published_posts=published_posts,
                         featured_posts=featured_posts,
                         recent_posts=recent_posts)  


# Admin: List all blog posts

@app.route('/admin/posts')
@login_required
def admin_posts():
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return render_template('admin/posts.html', posts=posts)


# Admin: Create a new blog post

@app.route('/admin/posts/new', methods=['GET', 'POST'])
@login_required
def admin_new_post():
   
    form = BlogPostForm()
    
     # ✅ Check blog count before allowing creation
    post_count = BlogPost.query.count()
    if post_count >= 10:
        flash('You can only create up to 10 blog posts. Please delete one to add a new post.', 'warning')
        return redirect(url_for('admin_posts'))



   
    if form.validate_on_submit():
        # If this post is set as featured, remove featured from other posts
       
        if form.is_featured.data:
            BlogPost.query.filter_by(is_featured=True).update({'is_featured': False})
        
        # 📝 Create new blog post object
        post = BlogPost(
            title=form.title.data,
            content=form.content.data,
            excerpt=form.excerpt.data,
            image_url=form.image_url.data,
            is_featured=form.is_featured.data,
            is_published=form.is_published.data,
            
        )
        try:
            db.session.add(post)
            db.session.commit()
            # print("✅ Post saved to DB")
            
        except Exception as e:
            db.session.rollback()
            # print("❌ Error saving post:", e)
        flash('Post created successfully!', 'success')
        return redirect(url_for('admin_posts'))
    
   
    return render_template('admin/post_form.html', form=form, title='New Post')

@app.route('/admin/posts/<int:post_id>/edit', methods=['GET', 'POST'])
@login_required
def admin_edit_post(post_id):
    
    post = BlogPost.query.get_or_404(post_id)
    form = BlogPostForm(obj=post)
    
    if form.validate_on_submit():
        # If this post is set as featured, remove featured from other posts
        if form.is_featured.data and not post.is_featured:
            BlogPost.query.filter_by(is_featured=True).update({'is_featured': False})
        
        form.populate_obj(post)
        db.session.commit()
        flash('Post updated successfully!', 'success')
        return redirect(url_for('admin_posts'))
    
    return render_template('admin/post_form.html', form=form, title='Edit Post', post=post)

@app.route('/admin/posts/<int:post_id>/delete', methods=['POST'])
@login_required
def admin_delete_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    flash('Post deleted successfully!', 'success')
    return redirect(url_for('admin_posts'))

# ===== EXISTING ROUTES (keeping all your original routes) =====
@app.route('/contact-page-submit', methods=["POST"])
def submit():
    if request.method == "POST":
        print(request.form)
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
            print(f"Error: {e}")
            flash("Email sending failed!", "error")

        return redirect(url_for('contact'))

@app.route('/home-page-submit', methods=["POST"])
def home_submit():
    if request.method == "POST":
        print(request.form)
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
            print(f"Error: {e}")
            flash("Email sending failed!", "error")

        return redirect(url_for('index'))

@app.route('/contact-popup-submit', methods=["POST"])
def submit2():
    if request.method == "POST":
        print(request.form)
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
            print(f"Error: {e}")
            flash("Email sending failed!", "error")

        return redirect(url_for('index'))

@app.route('/blog-faq-page-submit', methods=["POST"])
def blog_faq_page():
    if request.method == "POST":
        print(request.form)
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
            print(f"Error: {e}")
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

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='80')

