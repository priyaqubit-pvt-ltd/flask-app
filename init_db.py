from app import app, db
from models import Admin, BlogPost, create_sample_data

# Create database and sample data
with app.app_context():
    db.create_all()
    
    # Check if admin user exists
    if not Admin.query.first():
        create_sample_data()
        print("Database initialized with sample data!")
        print("Admin login: admin / admin123")
    else:
        print("Database already initialized.")
        
    # Print blog posts
    posts = BlogPost.query.all()
    print(f"Total blog posts: {len(posts)}")
    for post in posts:
        print(f"- {post.title} ({'Published' if post.is_published else 'Draft'})")

print("Database setup complete!")