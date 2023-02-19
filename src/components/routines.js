import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllRoutines } from '../api';

const Routines = ({ allActivities } ) => {
    const [allRoutines, setAllRoutines] = useState([]);
        
    useEffect(()=> {
            async function fetchRoutines(){
                if(!allRoutines.length){
                    const retrievedRoutines = await getAllRoutines();
                    setAllRoutines(retrievedRoutines);
                }
            }
            fetchRoutines();
        }, []);
    
    const reverseList = allRoutines.slice(0).reverse();
    const displayRoutines = allRoutines.length ? (
      <div>
        <h1>Routines</h1>
        {reverseList.map((routine, index) => {
          return (
            <div className="routine-card" key={index}>
              <h1 >{routine.name}</h1>
              <h3 >Creator</h3>
              <p> {routine.creatorName}</p>
              <h3> Goal </h3>
              <p> {routine.goal}</p>
              {routine.activities.map((activity, index) => (
                <div key={index} className="activity-card">
          
                  <h1>Related Activity | &nbsp; {activity.name}</h1> <p></p>
                  <p> Description | {activity.description}</p> <p></p>
                  <p> Duration | {activity.duration}</p> <p></p>
                  <p> Count | {activity.count}</p> <p></p>
                </div>
              ))}
            </div>
          );}
        )}
      </div>
    ) : (
      <div>Loading Routines...</div>
    );
    return(
      <div>
           {displayRoutines}
      </div>
    );
}
export default Routines;