import React from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  }
  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>React Note's</h1>
      <button style={{ backgroundColor: "#f87171", color: "#fff", border: 'none', width: '100px', borderRadius: '10px', hover: "#b91c1c" }} className="button-logout" onClick={() => handleLogout()}>Logout</button>
    </header>
  );
}

export default Header;
