import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
    return <>
      <Appbar />
      <Balance value={"10,00,000"}/>
      <Users />
    </>;
  };
  
  export default Dashboard;