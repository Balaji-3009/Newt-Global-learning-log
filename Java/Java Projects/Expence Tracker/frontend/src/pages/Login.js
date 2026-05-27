import React,
{
    useState
}
from 'react';

import {
    loginUser
}
from '../services/api';

import {
    useNavigate
}
from 'react-router-dom';

function Login() {

    const navigate =
        useNavigate();

    const [user,
        setUser] =
        useState({

        email: '',

        password: ''
    });

    const handleChange =
        (e) => {

        setUser({

            ...user,

            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            const response =
                await loginUser(user);

            localStorage.setItem(
                'token',
                response.data.token
            );

            navigate('/');

        } catch (error) {

            alert('Invalid credentials');
        }
    };

    return (

        <div className='container mt-5'>

            <div className='card p-4'>

                <h2>Login</h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        className=
                        'form-control mb-3'

                        placeholder='Email'

                        name='email'

                        onChange=
                        {handleChange}
                    />

                    <input

                        type='password'

                        className=
                        'form-control mb-3'

                        placeholder='Password'

                        name='password'

                        onChange=
                        {handleChange}
                    />

                    <button
                        className=
                        'btn btn-primary'
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;