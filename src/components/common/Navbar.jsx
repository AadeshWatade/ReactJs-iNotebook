import React, { Fragment, useEffect, useState } from 'react';
import { IoChevronDown, IoLogoAppleAr } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, Transition } from '@headlessui/react';

const Navbar = () => {
  const userInitial = []
  const [user, setUser] = useState(userInitial)
  const getUser = async () => {
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('loginToken'),
      },
    })
    const json = await response.json();
    setUser(json);
  }
  useEffect(() => {
    if (localStorage.getItem('loginToken')) {
      getUser();
    }
    // eslint-disable-next-line
  }, []);




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
              className={`flex flex-row font-bold hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-white'
                }`}>
              <IoLogoAppleAr className=" mx-1 flex mt-1" />
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
            <Menu as="div" className="relative inline-block text-left my-auto">
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-2 py-1 space-x-2 font-medium text-white hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 border border-gray-300">
                <FaUserCircle className='m-auto text-lg' /> <p> {user.name}</p>
                <IoChevronDown className='m-auto text-lg' />
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
                      className="flex flex-row space-x-1 py-1 text-lg mx-4 ">
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
