import axios from "axios";
import { Blog } from "../types";

const API_URL = `${process.env.REACT_APP_BASE_URL}/blog`;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const createBlog = (blog: Blog) => {
  return axios.post(`${API_URL}/`, blog, getAuthHeader());
};

export const getBlogs = () => {
  return axios.get<Blog[]>(`${API_URL}/`, getAuthHeader());
};

export const updateBlog = (id: string, blog: Blog) => {
  return axios.put(`${API_URL}/${id}`, blog, getAuthHeader());
};

export const deleteBlog = (id: string) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeader());
};

export const shareBlog = (id: string, username: string) => {
  return axios.post(
    `${API_URL}/share/${id}`,
    { shared_with: username },
    getAuthHeader()
  );
};
