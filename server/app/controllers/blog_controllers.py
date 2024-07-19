from bson import ObjectId
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.blog_model import BlogModel
from app import mongo

class BlogControllers:
    @staticmethod
    @jwt_required()
    def create_blog():
        data = request.get_json()
        blog = BlogModel(**data)
        blog.author = get_jwt_identity()

        blog_id = mongo.db.blogs.insert_one(blog.dict(by_alias=True)).inserted_id

        return jsonify({'msg': 'Blog created', 'id': str(blog_id)}), 201

    @staticmethod
    @jwt_required()
    def get_blogs():
        current_user = get_jwt_identity()

        user = mongo.db.users.find_one({'username': current_user})
        user_shared_blogs = user.get('shared_blogs', [])

        blogs = mongo.db.blogs.find({
            '$or': [
                {'author': current_user},
                {'_id': {'$in': [ObjectId(blog_id) for blog_id in user_shared_blogs]}}
            ]
        })

        blog_list = [blog for blog in blogs]
        for blog in blog_list:
            blog["id"] = str(blog["_id"])

        return jsonify([BlogModel(**blog).dict(by_alias=True) for blog in blog_list]), 200

    @staticmethod
    @jwt_required()
    def update_blog(id):
        data = request.get_json()
        blog = BlogModel(**data)
        blog.author = get_jwt_identity()

        blog_in_db = mongo.db.blogs.find_one({'_id': ObjectId(id)})
        if blog_in_db['author'] != blog.author:
            return jsonify({"msg": "Permission denied"}), 403

        mongo.db.blogs.update_one({'_id': ObjectId(id)}, {'$set': blog.dict(by_alias=True)})

        return jsonify({'msg': 'Blog updated'}), 200

    @staticmethod
    @jwt_required()
    def delete_blog(id):
        author = get_jwt_identity()

        blog_in_db = mongo.db.blogs.find_one({'_id': ObjectId(id)})
        if blog_in_db['author'] != author:
            return jsonify({"msg": "Permission denied"}), 403

        mongo.db.blogs.delete_one({'_id': ObjectId(id)})

        return jsonify({'msg': 'Blog deleted'}), 200

    @staticmethod
    @jwt_required()
    def share_blog(id):
        data = request.get_json()
        shared_with = data.get('shared_with')
        current_user = get_jwt_identity()

        blog = mongo.db.blogs.find_one({'_id': ObjectId(id)})
        if blog['author'] != current_user:
            return jsonify({"msg": "Permission denied"}), 403

        user = mongo.db.users.find_one({'username': shared_with})
        if not user:
            return jsonify({"msg": "User to share with not found"}), 404

        mongo.db.users.update_one({'username': shared_with}, {'$addToSet': {'shared_blogs': str(id)}})

        return jsonify({'msg': 'Blog shared successfully'}), 200
