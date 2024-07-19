import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBlog, updateBlog, getBlogs } from "../../services/blogService";
import { Blog } from "../../types";

const BlogForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await getBlogs();
          const blog = response.data.find((b: Blog) => b.id === id);
          if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blog = { title, content, author: "" };
    try {
      if (id) {
        await updateBlog(id, blog);
      } else {
        await createBlog(blog);
      }
      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">{id ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border p-2 w-full"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
