import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [signInAttempts, setSignInAttempts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username,
        password,
      });

      if (response.status === 200) {
        toast.success('Successfully logged in!', {
          position: 'top-right',
        });
        localStorage.setItem("token", response.data.token)
        const userId = response.data.user._id;
        const firstName = response.data.user.firstName;
        navigate("/dashboard?id="+ userId +"&name="+firstName);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('onhandleSubmit ~ error:', error);
      toast.error('Error while logging in!', {
        position: 'top-right',
      });

      // Increment sign-in attempts if the response status is not 200
      setSignInAttempts(signInAttempts + 1);
      if (signInAttempts >= 3) {
        // Redirect to signup if sign-in attempts exceed 3
        navigate('/signup');
      }
    }
  };

  return (
    <div className='bg-slate-300 grid place-items-center h-screen'>
      <div className='rounded-lg bg-white w-100 text-center p-2 h-max px-4'>
        <Heading title={"Sign in"} />
        <Subheading subheading={"Enter your credentials to access your account"} />
        <InputBox onChange={(e) =>{ setusername(e.target.value) }} label={"Email"} placeholder={"abc@gmail.com"}/>
        <InputBox onChange={(e) =>{ setpassword(e.target.value) }} label={"Password"} placeholder={"******"}/>
        <Button onClick={(e) =>{handleSubmit(e)}} value={"Submit"}/>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
      {isLoading && <div>Loading...</div>}
      <ToastContainer />
    </div>
  );
};

export default Signin;