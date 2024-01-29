/* eslint-disable no-unused-vars */
import React from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning  from '../components/BottomWarning';

const Signup = () => {
  return (
    <div className='bg-slate-300 grid place-items-center h-screen '>
      <div className='rounded-lg bg-white w-100 text-center p-2 h-max px-4 '>
        <Heading title={"Sign up"} />
        <Subheading subheading={"Enter your information to create account"} />
        <InputBox label={"First Name"} placeholder={"Nikunj"}/>
        <InputBox label={"Last Name"} placeholder={"Rohit"}/>
        <InputBox label={"Email"} placeholder={"abc@gmail.com"}/>
        <InputBox label={"Password"} placeholder={"******"}/>
        <Button value={"Submit"}/>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  );
};

export default Signup;