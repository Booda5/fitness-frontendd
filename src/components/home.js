import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to FitnessTracker!</h1>
            <button>
                <Link to='/login'>Login</Link>
            </button><br></br>
            <h3>First Time Here?</h3>
            <button>
                <Link to='/register'>Register here!</Link><br></br>
            </button>
        </div>
    )
}

export default Home;