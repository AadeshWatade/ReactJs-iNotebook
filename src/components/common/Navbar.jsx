import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IoChevronDown, IoLogoAppleAr } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { BsFillSunFill } from 'react-icons/bs';
import { HiOutlineMoon } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, Transition } from '@headlessui/react';
import noteContext from '../../context/notes/noteContext';
import { themeContext } from '../../context/theme/theme';
import ToolTip from './ToolTip';

const Navbar = () => {
  const context = useContext(noteContext);
  const { user, getUser } = context;

  useEffect(() => {
    if (localStorage.getItem('loginToken')) {
      getUser();
    }
  }, []);

  const theme = useContext(themeContext)
  const { currentTheme, onThemeChange } = theme
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
          className={`flex justify-between sticky top-0 px-6 ${currentTheme === 'dark' ? 'bg-navbar text-white' : 'bg-[#d5e7ff] text-black'} border-b-0 border-b-primary`}>
          <div className="flex flex-row space-x-6 p-4 text-lg ">
            <Link
              to="/"
              className={`flex flex-row font-bold hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-white'
                }`}>
              <IoLogoAppleAr className=" mx-1 flex mt-1 text-primary" />
              <p className="font-bold text-xl">iNotebook</p>
            </Link>
            <Link
              className={`${location.pathname === '/about' ? 'text-primary font-bold' : ''
                }hover:text-primary`}
              to="/about">
              About
            </Link>
          </div>
          <div className="flex flex-row">
            {currentTheme === 'dark' ?
              (<><button data-tip data-for="lightmode" className='my-auto' onClick={() => onThemeChange('light')}><BsFillSunFill className='mx-4 text-lg' /> </button> <ToolTip id="lightmode" place="bottom" title="Light mode" /></>) :
              (<><button data-tip data-for="darkmode" className='my-auto' onClick={() => onThemeChange('dark')}><HiOutlineMoon className='mx-4 text-lg' /></button> <ToolTip id="darkmode" place="bottom" title="Dark mode" /></>)
            }


            <Menu as="div" className="relative inline-block text-left my-auto">
              <Menu.Button className="inline-flex group w-full justify-center rounded-md bg-opacity-20 px-2 py-1 space-x-2 font-medium hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 border border-gray-500">
                <FaUserCircle className='m-auto text-lg' /> <p> {user.name}</p>
                <IoChevronDown className='hidden md:inline 
                m-auto text-lg group-hover:text-primary' />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 w-40 origin-top-right rounded-md bg-navbar shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-500 mt-1 text-gray-300 hover:text-white hover:border-gray-400">
                  <Menu.Item>
                    <Link
                      onClick={handleLogout}
                      to="/login"
                      className="flex flex-row space-x-1 py-1 text-lg mx-4 hover:text-primary">
                      <FiLogOut className="mt-1" />
                      <p className="justify-self-end">Logout</p>
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Navbar;
