import React from "react";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../api";

const CreateActivity = ({activity, setActivity}) => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const description = event.target[1].value;
        const storedToken = window.localStorage.getItem('fitness_tracker_JWT');
        console.log(name, description, storedToken)
        const userActivities = await createActivity(storedToken, name, description);
        navigate("/activities")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Create an activity:</h2>
                <label>Activity Name: </label>
                <input type="text" placeholder="Enter activity" required/>
                <label>Description: </label>
                <input type="text" placeholder="Enter description" required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateActivity;