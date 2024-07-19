import React, { useState } from "react";
import { Blog } from "../../types";
import { deleteBlog, shareBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";

interface BlogItemProps {
  blog: Blog;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  const navigate = useNavigate();
  const [shareUsername, setShareUsername] = useState("");

  const handleDelete = async () => {
    try {
      await deleteBlog(blog.id!);
      navigate(0); // Refresh the page
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      await shareBlog(blog.id!, shareUsername);
      setShareUsername("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border p-4 mb-4">
      <h3 className="text-xl">{blog.title}</h3>
      <p>{blog.content}</p>
      <p className="text-sm">By: {blog.author}</p>
      <button
        onClick={() => navigate(`/edit/${blog.id}`)}
        className="bg-yellow-500 text-white p-2 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white p-2 rounded mr-2"
      >
        Delete
      </button>
      <div className="mt-4">
        <input
          type="text"
          value={shareUsername}
          onChange={(e) => setShareUsername(e.target.value)}
          placeholder="Share with (username)"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
