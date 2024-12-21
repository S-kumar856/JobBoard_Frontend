import React, { useState, useEffect } from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import logo from "../images/image.png";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('name');
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('name');
    toast.success('Logged out successfully');
    setIsLoggedIn(false); // Update login status
    setUsername(''); // Clear username
    navigate('/');
  }

  return (
    <div className='header'>
      <div className="name">
        Job Finder
      </div>
      <div className="logout_name">
        {/* Show Login and Register buttons when not logged in */}
        {!isLoggedIn && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
        {/* Show Logout, username, and logo when logged in */}
        {isLoggedIn && (
          <>
            <button onClick={handleLogout}>Logout</button>
            <div className="userN">{username}</div>
            <div className="image">
              <img src={logo} alt="User Logo" />
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Header