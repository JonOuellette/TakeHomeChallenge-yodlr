import React, { useState, useEffect } from 'react';
import BackendApi from '../../../api';

function AdminPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await BackendApi.getUsers();
                console.log(result);  // Check what is being logged here
                setUsers(result);  // Change this line
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Users list</h2>
            <div>
                {users && users.map(user => (  
                    <div key={user.id}>
                        <p>Email: {user.email}</p>
                        <p>First Name: {user.firstName}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Status: {user.state}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
