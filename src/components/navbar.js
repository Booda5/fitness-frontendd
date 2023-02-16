import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
    const routinesTarget = {
        pathname: "/routines",
        key: Math.random(),
        state: {
            applied: true
        }
    };
    const myRoutinesTarget = {
        pathname: "/My_routines",
        key: Math.random(),
        state: {
            applied: true
        }
    };

    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to={routinesTarget}>Routines</Link>
                <Link to='/activities'>Activities</Link>
                <Link to={myRoutinesTarget}>Myroutines</Link>
                {
                    token ? (
                        <Link to='/' onClick={() => logout()}>Logout</Link>
                    ) : (
                        
                            // <Link to='/register'>Register</Link>
                            <Link to='/'>Logout</Link>
                    )
                }
            </nav>
        </header>
    )
}

export default Navbar;