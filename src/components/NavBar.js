import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        {isAuthenticated && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mr-4 hover:underline ${isActive ? 'font-bold' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/helpcenter"
              className={({ isActive }) =>
                `mr-4 hover:underline ${isActive ? 'font-bold' : ''}`
              }
            >
              Help Center
            </NavLink>
          </>
        )}
      </div>
      <div>
        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:underline ${isActive ? 'font-bold' : ''}`
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
