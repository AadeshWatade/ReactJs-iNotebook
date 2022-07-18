import React, { useState } from 'react';
import { IoLogoAppleAr } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../common/InputField';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('loginToken', json.authToken);
      toast.success('Logged in successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/');
    } else {
      toast.error('Enter correct details');
    }
  };

  return (
    <div className="h-screen bg-background text-gray-300">
      <p className="flex flex-row pt-12 px-32 text-3xl align-middle space-x-1 text-primary">
        <IoLogoAppleAr className="mt-1 align-middle" />
        <p className="">iNotebook</p>
      </p>
      <h1 className=" text-center text-3xl mt-8">Welcome Back!</h1>
      <div
        className={`flex my-8 mx-auto bg-[#1A2226] rounded-lg shadow-lg shadow-primary p-4 w-3/4 md:w-1/2 lg:w-1/3`}>
        <form onSubmit={handleSubmit} className="flex flex-col w-full p-8">
          <div className="flex flex-col w-full">
            <InputField
              className="inputField"
              value={credentials.email}
              onChange={handleOnChange}
              type="email"
              name="email"
              id="email"
              placeholder=""
              label="Email"
              htmlFor="email"
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              value={credentials.password}
              onChange={handleOnChange}
              type="password"
              name="password"
              id="password"
              placeholder=""
              htmlFor="password"
              label="Password"
            />
          </div>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="bg-primary hover:opacity-95 text-black my-4 flex place-self-end justify-center w-24  p-1">
            Login
          </button>
          <p className="text-sm mt-4 text-center">
            New to iNotebook?
            <Link
              to="/signup"
              className="font-medium text-primary underline pl-1">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
