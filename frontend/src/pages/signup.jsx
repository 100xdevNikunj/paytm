import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [firstName , setfirstname] = useState("");
  const [lastName , setlastname] = useState("");
  const [username , setusername] = useState("");
  const [password , setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        username,
        firstName,
        lastName,
        password,
      });
  
      if (response.status === 200) {
        toast.success('Successfully logged in!', {
          position: 'top-right',
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate("/signin");
        }, 2000);
      } else {
        toast.error('Error while signing up!', {
          position: 'top-right',
        });
        console.error('Error submitting form');
      }
    } catch (error) {
      toast.error(error.message || 'Error!', {
        position: 'top-right',
      });
      setIsLoading(false);
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className='bg-slate-300 grid place-items-center h-screen '>
      <div className='rounded-lg bg-white w-100 text-center p-2 h-max px-4 '>
        <Heading title={"Sign up"} />
        <Subheading subheading={"Enter your information to create account"} />
        <InputBox onChange={(e) =>{ setfirstname(e.target.value) }} label={"First Name"} placeholder={"Nikunj"}/>
        <InputBox onChange={(e) =>{ setlastname(e.target.value) }} label={"Last Name"} placeholder={"Rohit"}/>
        <InputBox onChange={(e) =>{ setusername(e.target.value) }} label={"Email"} placeholder={"abc@gmail.com"}/>
        <InputBox onChange={(e) =>{ setpassword(e.target.value) }} label={"Password"} placeholder={"******"}/>
        <Button onClick={handleSubmit} value={"Submit"}/>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
      {isLoading && <div>Loading...</div>}
      <ToastContainer />
    </div>
  );
};

export default Signup;