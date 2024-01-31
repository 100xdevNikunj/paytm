import { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/bulk', {
                    params: { filter: searchQuery }
                });
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="p-6">
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-gray-300" onChange={handleSearchChange} />
            </div>
            <div>
                {users.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div>
    );
}

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-gray-300 flex justify-center items-center text-xl">
                    {user.firstName[0]}
                </div>
                <div className="ml-2">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex items-center">
                <Button onClick={(e) => {
                    navigate("/send?id="+ user._id +"&name="+user.firstName)
                }} value="Send Money" />
            </div>
        </div>
    );
}

export default Users;