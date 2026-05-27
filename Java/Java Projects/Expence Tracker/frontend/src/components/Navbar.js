import React from 'react';

import {
    Link,
    useNavigate
}
from 'react-router-dom';

function Navbar() {

    const navigate =
        useNavigate();

    const logout = () => {

        localStorage.removeItem(
            'token'
        );

        navigate('/login');
    };

    return (

        <nav
            className=
            'navbar navbar-expand-lg navbar-dark bg-dark'
        >

            <div className='container'>

                <Link
                    className='navbar-brand'
                    to='/'
                >
                    Expense Tracker
                </Link>

                <div className='navbar-nav'>

                    <Link
                        className='nav-link'
                        to='/'
                    >
                        Dashboard
                    </Link>

                    <Link
                        className='nav-link'
                        to='/add'
                    >
                        Add Transaction
                    </Link>

                    <Link
                        className='nav-link'
                        to='/register'
                    >
                        Register
                    </Link>

                    <button

                        className=
                        'btn btn-danger ms-3'

                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;