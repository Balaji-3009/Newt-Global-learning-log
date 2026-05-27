import React,
{
    useState
}
from 'react';

import {
    registerUser
}
from '../services/api';

import {
    useNavigate
}
from 'react-router-dom';

function Register() {

    const navigate =
        useNavigate();

    const [user,
        setUser] =
        useState({

        name: '',

        email: '',

        password: '',

        role: 'USER'
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

        await registerUser(user);

        navigate('/login');
    };

    return (

        <div className='container mt-5'>

            <div className='card p-4'>

                <h2>Register</h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        className=
                        'form-control mb-3'

                        placeholder='Name'

                        name='name'

                        onChange=
                        {handleChange}
                    />

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
                        'btn btn-success'
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;