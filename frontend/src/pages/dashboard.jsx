import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('id');
  const name = new URLSearchParams(location.search).get('name');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (userId) {
      fetchBalance();
    }
  }, [userId]);

  return (
    <>
      <Appbar name={name} />
      <Balance value={balance}/>
      <Users />
    </>
  );
};
  
export default Dashboard;