from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///medquery.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 30)))

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Define User model
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    hashed_password = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # doctor, researcher, patient, admin
    license_number = db.Column(db.String(50), nullable=True)
    institution = db.Column(db.String(120), nullable=True)
    specialization = db.Column(db.String(120), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'role': self.role,
            'license_number': self.license_number,
            'institution': self.institution,
            'specialization': self.specialization
        }

# Create database tables
with app.app_context():
    db.create_all()

# Helper functions
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

# Routes
@app.route('/')
def index():
    return jsonify({"message": "Welcome to MedQuery API"})

@app.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    # Create new user
    new_user = User(
        email=data['email'],
        full_name=data['full_name'],
        hashed_password=hash_password(data['password']),
        role=data['role'],
        license_number=data.get('license_number'),
        institution=data.get('institution'),
        specialization=data.get('specialization')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(new_user.to_dict()), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    # Check if user exists and password is correct
    if not user or not check_password(data['password'], user.hashed_password):
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Check if role matches
    if user.role != data['role']:
        return jsonify({"error": f"User is not registered as a {data['role']}"}), 401
    
    # Create access token
    access_token = create_access_token(
        identity=user.email,
        additional_claims={"role": user.role}
    )
    
    return jsonify({"access_token": access_token, "token_type": "bearer"}), 200

@app.route('/auth/me', methods=['GET'])
@jwt_required()
def get_user_info():
    # Get current user's email from JWT
    current_user_email = get_jwt_identity()
    
    # Find user in database
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user.to_dict()), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)