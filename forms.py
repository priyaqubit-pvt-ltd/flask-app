from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, PasswordField
from wtforms.validators import DataRequired, Length, Optional

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

print("Forms module loaded successfully!")