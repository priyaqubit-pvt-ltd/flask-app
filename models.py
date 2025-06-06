from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Admin(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

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

# Sample data creation function
def create_sample_data():
    """Create sample blog posts and admin user"""
    try:
        # ✅ Check if admin already exists
        existing_admin = Admin.query.filter_by(email='admin@lozy.in').first()
        if not existing_admin:
            # Create admin user
            admin = Admin(
                username='admin',
                email='admin@lozy.in'
            )
            admin.set_password('admin123')  # Change this password!
            db.session.add(admin)
            print("Admin created.")
        else:
            print("Admin already exists. Skipping admin creation.")

            # Sample blog posts
        # sample_posts = [
        #         {
        #             'title': 'The Ultimate Guide to Choosing the Right Storage Unit',
        #             'content': '''<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    
        #             <h3>Why Choose the Right Storage Unit?</h3>
        #             <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    
        #             <h3>Key Factors to Consider</h3>
        #             <ul>
        #                 <li>Size requirements</li>
        #                 <li>Security features</li>
        #                 <li>Location accessibility</li>
        #                 <li>Climate control</li>
        #                 <li>Pricing and contracts</li>
        #             </ul>''',
        #             'excerpt': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        #             'image_url': '/static/images/blog_hero_section.webp',
        #             'is_featured': True
        #         },
        #         {
        #             'title': 'Designing for Tomorrow: Trends Shaping the User Experience in 2025',
        #             'content': '''<p>As technology continues to evolve, so does its impact on the environment. At the intersection of innovation and responsibility lies the need for sustainable practices in the tech industry.</p>
                    
        #             <h3>Emerging Trends</h3>
        #             <p>The future of user experience design is being shaped by several key trends that prioritize both functionality and sustainability.</p>''',
        #             'excerpt': 'As technology continues to evolve, so does its impact on the environment. At the intersection of innovation and responsibility lies the need for sustainable practices in the tech industry',
        #             'image_url': '/static/images/blog_image_1.webp',
        #             'is_featured': False
        #         },
        #         {
        #             'title': 'Sustainability in Tech: Steps Toward a Greener Future',
        #             'content': '''<p>As technology continues to evolve, so does its impact on the environment. At the intersection of innovation and responsibility lies the need for sustainable practices in the tech industry.</p>
                    
        #             <h3>Green Technology Initiatives</h3>
        #             <p>Companies are increasingly adopting sustainable practices to reduce their environmental footprint.</p>''',
        #             'excerpt': 'As technology continues to evolve, so does its impact on the environment. At the intersection of innovation and responsibility lies the need for sustainable practices in the tech industry',
        #             'image_url': '/static/images/blog_image_2.webp',
        #             'is_featured': False
        #         }
        # ]
            
           
                
        # for post_data in sample_posts:
        #     post = BlogPost(**post_data)
        #     db.session.add(post) 
                
            db.session.commit()
            print("Sample data created successfully!")
            print("Admin login: admin / admin123")
                
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.session.rollback()


