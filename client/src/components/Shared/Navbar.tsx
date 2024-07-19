import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/blogs" className="mr-4">
            Blogs
          </Link>
        </div>
        <div>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 p-2 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-500 p-2 rounded">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
