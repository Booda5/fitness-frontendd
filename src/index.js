import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import {
    Activities,
    Home,
    Login,
    Navbar,
    Register,
    Routines,
    MyRoutines,
    Footer,
    CreateNewRoutine,
    CreateActivity
    } from './components';

import {
    getAllRoutines,
    getMyRoutines,
    EditRoutine,
    DeleteRoutine,
    getAllActivities,
    getUser,
    createActivity
    
} from './api';


const App = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);
    const [Myroutines, setMyRoutines] = useState([]);
    
    const navigate = useNavigate();

    function logout() {
        window.localStorage.removeItem('fitness_tracker_JWT');
        setToken('');
        setUser('');
    }

    async function fetchRoutines() {
        const results = await getAllRoutines()
        setRoutines(results.data);
    }

    async function fetchActivities() {
        const results = await getAllActivities()
        setActivities(results.data);
    }

    async function fetchMyRoutines() {
        if (user) {
            const results = await getMyRoutines(token, user)
            setMyRoutines(results);
        }
    }

    async function getMe() {
        const storedToken = window.localStorage.getItem('fitness_tracker_JWT');
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }

            return;
        }
        const { username } = await getUser(storedToken)
        if ({ username }) {
            setUser(username);
        } else {
            console.log('Error setting user');
        }
    }
        
   
    useEffect(() => {
        getMe();
        fetchRoutines();
        fetchActivities();
    }, [token])

   useEffect(() => {
       fetchMyRoutines();
   }, [token, user])

    
 
    return (
        <div>
            <Navbar logout={logout} token={token} />
            <Routes>
                <Route
                    path='/'
                    element={<Home 
                    />}
                />
                 <Route
                    path='/routines'
                    element={<Routines
                        token={token}
                        routines={routines}
                        fetchRoutines={fetchRoutines}
                    />} 
                />
                 <Route
                    path='/activities'
                    element={<Activities
                        token={token}
                        navigate={navigate}
                        activities={Activities}
                    />} 
                />
                <Route
                    path='/createActivity'
                    element={<createActivity
                        token={token}
                        createActivity={CreateActivity}
                        navigate={navigate}
                        fetchActivities={fetchActivities}
                    />}
                />
                { <Route
                    path='/My_routines'
                    element={<MyRoutines
                        token={token}
                        MyRoutines={Myroutines}
                        navigate={navigate}
                        fetchRoutines={fetchRoutines}
                    />}
                /> }
                <Route
                    path='/CreateNewRoutine'
                    element={<createNewRoutine
                        token={token}
                        createNewRoutine={CreateNewRoutine}
                        navigate={navigate}
                        fetchRoutines={fetchRoutines}
                    />}
                />
                 <Route
                    path='/register'
                    element={<Register
                        setToken={setToken}
                        token={token}
                        navigate={navigate}
                    />}
                />
                 <Route
                    path='/login'
                    element={<Login
                        setToken={setToken}
                        navigate={navigate}
                    />} 
                />
            </Routes>
            <Footer />
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);