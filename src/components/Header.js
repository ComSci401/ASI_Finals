import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import "./Header.css"

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");  
  const location = useLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(location.pathname === "/") {
        setActiveTab("Home")
    } else if(location.pathname === "/add") {
        setActiveTab("Add")
    } else if (location.pathname === "/about") {
        setActiveTab("About")
    }
  }, [location]);
  

  return (
    <div className='header'>
        <p className='logo'>Class List</p>
        <div className='header-right'>
            <Link to="/">
                <p 
                className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
                >
                    Home
                </p>
            </Link>
            <Link to="/add">
                <p 
                className={`${activeTab === "Add" ? "active" : ""}`}
                onClick={() => setActiveTab("Add")}
                >
                    Add Student
                </p>
            </Link>
            <Link to="/about">
                <p 
                className={`${activeTab === "About" ? "active" : ""}`}
                onClick={() => setActiveTab("About")}
                >
                    About
                </p>
            </Link>
        </div>
    </div>
  ); 
};

export default Header