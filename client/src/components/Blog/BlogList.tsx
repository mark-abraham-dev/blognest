import React, { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogService";
import BlogItem from "./BlogItem";
import { Blog } from "../../types";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Blogs</h2>
      <a
        href="/create"
        className="bg-blue-500 text-white p-2 rounded mb-4 inline-block"
      >
        Create Blog
      </a>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
