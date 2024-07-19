from flask import request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt

from app.models.user_model import UserModel
from app import mongo

class AuthControllers:
    @staticmethod
    def signup():
        data = request.get_json()
        user = UserModel(**data)

        if mongo.db.users.find_one({'username': user.username}):
            return jsonify({"msg": "Username already exists"}), 400

        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        user.password = hashed_password

        user_id = mongo.db.users.insert_one(user.dict(by_alias=True)).inserted_id

        return jsonify({"msg": "User created successfully", "id": str(user_id)}), 201

    @staticmethod
    def signin():
        data = request.get_json()
        user = UserModel(**data)

        user_in_db = mongo.db.users.find_one({'username': user.username})
        if user_in_db and bcrypt.checkpw(user.password.encode('utf-8'), user_in_db['password']):
            access_token = create_access_token(identity=user.username)
            return jsonify(access_token=access_token), 200

        return jsonify({"msg": "Invalid username or password"}), 401
