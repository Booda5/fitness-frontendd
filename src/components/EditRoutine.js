import { useState } from "react"
import { editRoutine } from "../api";
import { useParams, useNavigate } from 'react-router-dom';

const EditRoutine = (routineId) => {
    const [newName, setNewName] = useState('')
    const [newGoal, setNewGoal] = useState('')
    const navigate1 = useNavigate();

    // async function fetchActivities() {
    //     const results = await getActivities()
    //     setActivities(results);
    

    async function handleEdit() {
        const storedToken = window.localStorage.getItem('fitness_tracker_JWT');
        const updatedRoutine = {
            token: storedToken,
            name: newName,
            goal: newGoal,
            isPublic: true,
            routineId
        }
        // console.log(storedToken, routineId.routineId, newName, newGoal, true)
        const results = await editRoutine(updatedRoutine)
        console.log('22222')
        // fetchRoutines();
        // navigate1(`/routines`)
    }

        return (
            <div>
            <form onSubmit={handleEdit}>
                <label>Routine Name: </label>
                <input type='text' onChange={(event) => setNewName(event.target.value)}  placeholder="Edit Name" required/>
                <label>Goal: </label>
                <input type='text' onChange={(event) => setNewGoal(event.target.value)}  placeholder="Edit goal" required/>
                <button type='submit'>Submit Edit</button>
            </form>
            </div>

        )
    }

export default EditRoutine;