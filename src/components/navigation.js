import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from './authServices';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const hideDropdownTimer = useRef(null);
  const navigate=useNavigate();

  const handlelogout =()=>{
    authService.logout();
    navigate('/');
    

    console.log("logout");
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCoursesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleMouseEnter = () => {
    setActiveTab('courses');
    setShowCoursesDropdown(true);
    clearTimeout(hideDropdownTimer.current);
  };

  const handleMouseLeave = () => {
    hideDropdownTimer.current = setTimeout(() => {
      setShowCoursesDropdown(false);
    }, 5000); // Adjust the delay as needed
  };



  return (
    <div className="flex flex-col h-screen">
      {/* Navigation bar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <span className="text-xl font-bold">SkillForge</span>
        <div className="flex space-x-4 mr-20">
          <button
            onClick={() => {
              setActiveTab('home');
              setShowCoursesDropdown(false);
            }}
            className={`text-white focus:outline-none ${
              activeTab === 'home' ? 'border-b-2 border-white' : ''
            }`}
          >
            Home
          </button>
          {/* Courses dropdown */}
          <div
            className="relative inline-block text-left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <button
              className={`text-white focus:outline-none ${
                activeTab === 'courses' ? 'border-b-2 border-white' : ''
              }`}
            >
              Courses

            </button>

            

            {showCoursesDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 courses-container">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link to="/createcourse">
                    <button
                      onClick={() => setActiveTab('createCourse')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Create Course
                    </button>
                  </Link>
                  <Link to="/courses">
                    <button
                      onClick={() => setActiveTab('viewCourse')}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      View Course
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setActiveTab('logout');
              
            
              setShowCoursesDropdown(false);
              handlelogout();


            }}
            className={`text-white focus:outline-none ${
              activeTab === 'logout' ? 'border-b-2 border-white' : ''
            }`}
          >
            Logout
          </button>
        </div>
      </nav>

      
      
    </div>
  );
};

export default Home;
