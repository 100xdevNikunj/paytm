/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning  from '../components/BottomWarning';
import axios from 'axios';

const Signin = () => {
  const [username, setusername] = useState("");
  const [ password, setpassword] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      })

      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        console.error('Error submitting form');
      }
      
    } catch (error) {
      console.error("onhandleSubmit ~ error:", error)
    }
  }

  return (
    <div className='bg-slate-300 grid place-items-center h-screen'>
      <div className='rounded-lg bg-white w-100 text-center p-2 h-max px-4'>
        <Heading title={"Sign up"} />
        <Subheading subheading={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) =>{ setusername(e.target.value) }} label={"Email"} placeholder={"abc@gmail.com"}/>
        <InputBox onChange={(e) =>{ setpassword(e.target.value) }} label={"Password"} placeholder={"******"}/>
        <Button onClick={(e) =>{handleSubmit(e)}} value={"Submit"}/>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  );
};

export default Signin;