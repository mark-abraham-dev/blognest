from flask import Blueprint

from app.controllers.blog_controllers import BlogControllers

blog_bp = Blueprint('blog_bp', __name__)

blog_bp.route('/', methods=['POST'])(BlogControllers.create_blog)
blog_bp.route('/', methods=['GET'])(BlogControllers.get_blogs)
blog_bp.route('/<id>', methods=['PUT'])(BlogControllers.update_blog)
blog_bp.route('/<id>', methods=['DELETE'])(BlogControllers.delete_blog)
blog_bp.route('/share/<id>', methods=['POST'])(BlogControllers.share_blog)
