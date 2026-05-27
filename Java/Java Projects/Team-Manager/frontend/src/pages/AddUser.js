import React, { useState } from 'react';
import { createUser } from '../services/api';

function AddUser() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER'
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await createUser(user);

        window.location.reload();
    };

    return (

        <div className='card p-4 mb-4'>

            <h4>Add User</h4>

            <form onSubmit={handleSubmit}>

                <input
                    className='form-control mb-3'
                    placeholder='Name'
                    name='name'
                    onChange={handleChange}
                />

                <input
                    className='form-control mb-3'
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />

                <input
                    className='form-control mb-3'
                    placeholder='Password'
                    name='password'
                    onChange={handleChange}
                />

                <select
                    className='form-control mb-3'
                    name='role'
                    onChange={handleChange}
                >
                    <option>USER</option>
                    <option>ADMIN</option>
                </select>

                <button className='btn btn-primary'>
                    Add User
                </button>

            </form>

        </div>
    );
}

export default AddUser;