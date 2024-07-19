from flask import Blueprint

from app.controllers.auth_controllers import AuthControllers

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/signup', methods=['POST'])(AuthControllers.signup)
auth_bp.route('/signin', methods=['POST'])(AuthControllers.signin)
