import React, { useState } from 'react';
import { createRoutine, getRoutines } from '../api';
import { useParams, useNavigate } from 'react-router-dom';


const CreateNewRoutine = (token, { fetchRoutines, navigate }) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [routines, setRoutines] = useState([]);
    const { routineId} = useParams();
    const navigate1 = useNavigate();

    async function fetchRoutines() {

        const results = await getRoutines()
        setRoutines(results.data);
    }
    async function addRoutine() {
        const newRoutine = {
            name: name,
            goal: goal,
            isPublic: true

        }
        const storedToken = window.localStorage.getItem('fitness_tracker_JWT');
        const results = await createRoutine(storedToken, newRoutine)
        fetchRoutines();
        navigate1(`/routines`)
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addRoutine();
        }}>
            <label>Enter routine name</label>
            <br></br>
            <input
                type='text'
                onChange={(event) => setName(event.target.value)} />
            <br></br>
            <label>Enter goal </label>
            <br></br>
            <input
                type='text'
                onChange={(event) => setGoal(event.target.value)} />
            <br></br>
            <button type='submit'>Submit New Post</button>
        </form>
    )
}

export default CreateNewRoutine;