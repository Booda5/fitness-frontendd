import React, { useState, useEffect } from "react";
import { getUser, getUserRoutine } from "../api";
import { CreateNewRoutine, DeleteRoutine, EditRoutine} from ".";

const My_routines = () => {
  const [info, setInfo] = useState({});
  const [myRoutines, setMyRoutines] = useState([]);
  const getUserInfo = async () => {
    try {
      const token = window.localStorage.getItem('fitness_tracker_JWT');
      const result = await getUser(token);
      console.log(result);
      if (result) {

        setInfo(result);
      }
    } catch (error) {

      console.error(error);
    }
  };

  const getMyRoutines = async () => {
    try {
      if (info && info.username) {
        const token = window.localStorage.getItem('fitness_tracker_JWT');
        const result = await getUserRoutine(info.username);
        if (result) {
          setMyRoutines(result);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getMyRoutines();
  }, [info]);

  return (
    <div>
      {info && info.username ? <h2 id="main-ctr">Hello {info.username}!</h2> : null}
      <h3>Welcome to your routines!</h3>

      <CreateNewRoutine myRoutines={myRoutines} setMyRoutines={setMyRoutines} />
      <h1>User Routines:</h1>
      {myRoutines && myRoutines.length
        ? myRoutines.map((routine, index) => {
            return (
              <div id="myroutine" key={`profile:${routine.id} ${index}`}>
                <p>Routine: {routine.name}</p>
                <p>Goal: {routine.goal}</p>
                <EditRoutine  routineId={routine.id} setMyRoutines={setMyRoutines}/>
                <DeleteRoutine  routineId={routine.id} setMyRoutines={setMyRoutines}/>
              </div>
            );
          })
        : null}
        
    </div>
  );
};

export default My_routines;