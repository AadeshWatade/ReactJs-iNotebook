import React from 'react';
import { IoLogoAppleAr } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const location = useLocation();
  return (
    <>
      {localStorage.getItem('loginToken') ? (
        <div
          className={`flex justify-between px-6 bg-navbar text-white border-b-0 border-b-primary`}>
          <div className="flex flex-row space-x-6 p-4 text-lg ">
            <Link
              to="/"
              className={`flex flex-row font-bold hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-white'
              }`}>
              <IoLogoAppleAr className=" mx-1 flex mt-1" />
              <p className="font-bold text-xl">iNotebook</p>
            </Link>

            <Link
              className={`${
                location.pathname === '/about' ? 'text-primary font-bold' : ''
              }hover:text-primary`}
              to="/about">
              About
            </Link>
          </div>
          {!localStorage.getItem('loginToken') ? (
            <div className="flex flex-row space-x-6 p-4 text-lg">
              <Link
                className={`justify-self-end${
                  location.pathname === '/login' ? 'font-bold' : ''
                }`}
                to="/login">
                Login
              </Link>
              <Link
                className={`justify-self-end${
                  location.pathname === '/signup' ? 'font-bold' : ''
                }`}
                to="/signup">
                Signup
              </Link>
            </div>
          ) : (
            <Link
              onClick={handleLogout}
              to="/login"
              className="flex flex-row space-x-1 p-4 text-lg mx-4 hover:text-primary">
              <FiLogOut className="mt-1" />
              <p className="justify-self-end">Logout</p>
            </Link>
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Navbar;
