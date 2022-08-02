import React, { useEffect, useState } from 'react';
import { IoLogoAppleAr } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../common/InputField';

const Signup = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createUser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    if (json.success === true) {
      localStorage.setItem('token', json.authtoken);
      navigate('/login');
      toast.success('Signed in successfully!');
    } else {
      toast.error('Incorrect Credentials');
    }
  };
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = `iNotebook - Signup`
    // eslint-disable-next-line
  }, [])
  return (
    <div className="bg-background flex flex-col h-screen justify-start text-gray-300">
      <p className="flex flex-row pt-12 pl-32 text-3xl align-middle space-x-1 text-primary">
        <IoLogoAppleAr className="mt-1 align-middle" />
        <p className="">iNotebook</p>
      </p>
      <h1 className=" text-center text-3xl mt-8">Create a New Account!</h1>
      <div
        className={`flex mt-4 mb-8 mx-auto bg-[#1A2226] rounded-lg shadow-lg shadow-primary p-4 w-3/4 md:w-1/2 lg:w-1/3`}>
        <form onSubmit={handleSubmit} className="flex flex-col w-full p-8">
          <div className="flex flex-col w-full">
            <InputField
              className="inputField"
              onChange={handleOnChange}
              type="text"
              name="name"
              id="name"
              placeholder=""
              label="Name"
              htmlFor="name"
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              className="inputField"
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
              className="inputField"
              onChange={handleOnChange}
              type="password"
              name="password"
              id="password"
              placeholder=""
              label="Password"
              htmlFor="password"
            />
          </div>
          <div className="flex flex-col w-full">
            <InputField
              className="inputField"
              onChange={handleOnChange}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder=""
              label="Confirm Password"
              htmlFor="confirmPassword"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:opacity-95 text-black my-4 flex place-self-end justify-center w-24 p-1">
            Signup
          </button>
          <p className="text-sm mt-4 text-center">
            Already have an account?
            <Link
              to="/login"
              className="font-medium underline pl-1 text-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
