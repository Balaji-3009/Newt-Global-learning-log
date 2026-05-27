import React, { useEffect, useState } from 'react';

import { getUsers } from '../services/api';

import AddUser from './AddUser';

function UsersPage() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        const response = await getUsers();

        setUsers(response.data);
    };

    return (

        <div className='container mt-4'>

            <AddUser />

            <div className='card p-4'>

                <h3>Users</h3>

                <table className='table table-bordered'>

                    <thead>

                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            users.map(user => (

                                <tr key={user.id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default UsersPage;