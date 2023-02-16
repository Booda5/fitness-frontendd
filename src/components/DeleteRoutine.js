import React from "react";
import { deleteRoutine } from "../api";

const DeleteRoutine = (routineId) => {
    const handleDelete = async (event) => {
        event.preventDefault()
        const token = window.localStorage.getItem('fitness_tracker_JWT')
        console.log(routineId)
        deleteRoutine(token, routineId)
      }
    return ( 
        <div>
            <button onClick={handleDelete} type="button"> delete </button>
        </div>
     );
}
 
export default DeleteRoutine;