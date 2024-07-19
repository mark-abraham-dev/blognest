import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import BlogList from "./components/Blog/BlogList";
import BlogForm from "./components/Blog/BlogForm";
import PrivateRoute from "./components/Shared/PrivateRoute";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/blogs" element={<PrivateRoute element={<BlogList />} />} />
    <Route path="/create" element={<PrivateRoute element={<BlogForm />} />} />
    <Route path="/edit/:id" element={<PrivateRoute element={<BlogForm />} />} />
  </Routes>
);

export default AppRoutes;
