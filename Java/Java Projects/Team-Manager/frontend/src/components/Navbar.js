import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (

        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>

            <div className='container'>

                <Link
                    className='navbar-brand'
                    to='/'
                >
                    Team Manager
                </Link>

                <div className='navbar-nav'>

                    <Link
                        className='nav-link'
                        to='/tasks'
                    >
                        Tasks
                    </Link>

                    <Link
                        className='nav-link'
                        to='/users'
                    >
                        Users
                    </Link>

                    <Link
                        className='nav-link'
                        to='/projects'
                    >
                        Projects
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;