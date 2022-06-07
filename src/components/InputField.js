import React from 'react';
const InputField = ({
  value,
  onChange,
  type,
  name,
  id,
  placeholder,
  label,
  htmlFor,
}) => {
  return (
    <>
      <input
        required
        minLength={5}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className=" border-primary border-b py-2 pl-3 my-6 placeholder-primary focus:outline-none bg-transparent"
        // className=" block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      />
      <label
        className=" transition-all hover:cursor-auto absolute place-self-start "
        // className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        htmlFor={htmlFor}>
        {label}
      </label>
    </>
  );
};

export default InputField;
