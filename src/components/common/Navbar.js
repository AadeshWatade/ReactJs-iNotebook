import React, { Fragment, useContext } from 'react';
import { IoChevronDown, IoLogoAppleAr } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import noteContext from '../../context/notes/noteContext';
import { Menu, Transition } from '@headlessui/react';

const Navbar = () => {
  const context = useContext(noteContext);
  const current_theme = context;

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
  const setTheme = async (theme) => {
    let res = await current_theme(theme);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
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
          <div className="flex flex-row">
            {/* <Menu as="div" className="relative inline-block text-left my-auto">
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:text-primary">
                Themes
                <IoChevronDown className="h-5 w-5 my-auto" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 w-40 origin-top-right rounded-md bg-navbar shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-500 space-y-2 p-2">
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setTheme('theme-blue');
                      }}
                      className="flex flex-row">
                      <div className="h-5 w-5 bg-[#0d8bde] rounded-full ml-1 mr-3 my-auto"></div>
                      Theme Blue
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setTheme('theme-violet');
                      }}
                      className="flex flex-row">
                      <div className="h-5 w-5 bg-[#7a12c9] rounded-full ml-1 mr-3 my-auto"></div>
                      Theme Violet
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setTheme('theme-green');
                      }}
                      className="flex flex-row">
                      <div className="h-5 w-5 bg-[#0dde61] rounded-full ml-1 mr-3 my-auto"></div>
                      Theme Green
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> */}
            <Link
              onClick={handleLogout}
              to="/login"
              className="flex flex-row space-x-1 p-4 text-lg mx-4 hover:text-primary">
              <FiLogOut className="mt-1" />
              <p className="justify-self-end">Logout</p>
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Navbar;
