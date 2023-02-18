export const baseURL = 'https://fitnesstrac-kr.herokuapp.com/api/'

//Post /api/users/register
export const registerUser = async (userObject) => {
  const url = `${baseURL}users/register`;
  const response = await fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: userObject.user,
          password: userObject.password
      }),
  });
  const json = await response.json();
  console.log(json);

  localStorage.setItem('fitness_tracker_JWT', json.token)

  return json;
}

//POST /api/users/login
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseURL}users/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password
      })
    })
    const result = await response.json();
    return result;
    
  } catch(ex) {
    console.log("error logging in user")
  }
}

//GET /api/users/me
export const getUser = async (token) => {
  try {
    const response = await fetch(`${baseURL}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const results = await response.json();
    return results;
  } catch (ex) {
    console.log('Error getting user')
  }
}

export const getUserRoutine = async (username) => {
   const token = localStorage.getItem('fitness_tracker_JWT');
  try {
    const response = await fetch(`${baseURL}users/${username}/routines`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    throw error;
  }
};

//GET /api/users/:username/routines
export const getAllRoutines = async () => {
  try {
    const response = await fetch(`${baseURL}routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const results = await response.json();
    return results;
  } catch (ex) {
    console.error('error getting all routines')
  }
}


//GET /api/activities
export const getAllActivities = async () => {
  try {
    const response = await fetch(`${baseURL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const results = await response.json();
    return results;
  } catch (ex) {
    console.error('error getting all activities')
  }
}

//POST /api/activities
export const createActivity = async (token, name, description)=> {
  try {
    const response = await fetch(`${baseURL}activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          name: name,
          description: description,
          token: token
      })
    })
    
    const result = await response.json();
    return result;
  } catch(ex) {
    console.log('error creating activity')
  }
}

//PATCH /api/activities/:activityId
export const updateActivity = async (token, { activityId, activityName, description})=> {
  try { 
    const response = await fetch(`${baseURL}activities/${activityId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          activityId,
          activityName,
          description
        }
      })
    })
    
    const result = await response.json();
    return result;  
  } catch(ex) {
    console.log('error updating activity')
  }
}

//GET /api/activities/:activityId/routines
export const getActivities = async () =>  {
  try{
    const response = await fetch(`${baseURL}activities`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const result = await response.json();
    return result;
  } catch (ex) {
    console.log('error getting activities')
  }
}

//GET /api/routines
export const getRoutines = async() => {
  try {
    const response = await fetch(`${baseURL}routines`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const results = await response.json();
    return results;
  } catch(error) {
    console.log('error getting routines')
  }
}

//POST /api/routines
export const createRoutine = async (token, { name, goal, isPublic }) => {
  try {
    console.log(token)
    const response = await fetch(`${baseURL}routines`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic,
      })
    })
    const result = await response.json();
    return result;
  } catch (ex) {
    console.error('error creating routine')
  }
}

//PATCH /api/routines/:routineId
export const updateRoutine = async (token, { routineId, creatorId, isPublic, routineName, goal})=> {
  try { 
    const response = await fetch(`${baseURL}activities/${routineId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          routineId,
          creatorId,
          isPublic,
          routineName,
          goal
        }
      })
    })
    
    const result = await response.json();
    return result;  
  } catch(ex) {
    console.log('error updating routine')
  }
}

// DELETE /api/routines/:routineId
export const deleteRoutine = async (token, {routineId}) => {
  console.log(routineId)
  try{
    const response = await fetch(`${baseURL}routines/${routineId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
})
    const data = await response.json();
    return data;
  } catch(ex) {
    console.log('error deleting routine')
  }
}

//POST /api/routines/:routineId/activities
export const routineActivity = async (token, {activityId, count, duration})=> {
  try {
    const response = await fetch(`${baseURL}activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          activityId,
          count,
          duration
      })
    })
    
    const result = await response.json();
    return result;
  } catch(ex) {
    console.log('error attaching activity to routine')
  }
}

//PATCH /api/routine_activities/:routineActivityId
export const updateRoutine_activity = async (token, { activityId, routineId, count, duration})=> {
  try { 
    const response = await fetch(`${baseURL}routine_activities/${activityId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          activityId,
          routineId,
          count,
          duration
        }
      })
    })
    
    const result = await response.json();
    return result;  
  } catch(ex) {
    console.log('error updating activity')
  }
}

//DELETE /api/routine_activities/:routineActivityId
export const deleteActivity = async (token) => {
  try{
    const response = await fetch(`${baseURL}routine_activities/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
})
    const data = await response.json();
    return data;
  } catch(ex) {
    console.log('error deleting activity')
  }
}

export const getRoutinesByUser = async () => {
  const user = await getUser(localStorage.getItem('fitness_tracker_JWT')); 
  const username = user.username;
  const url = `${baseURL}users/${username}/routines`;
  const response = await fetch(url, {
      method: "GET",
      headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('fitness_tracker_JWT')}`
      }
  })
      .then(response => response.json())
      .then(result => {
          return result;
      })
      .catch(console.error);
  return response;
}

export const getMyRoutines = async (token, user) => {
  try {
    console.log(user)
    const response = await fetch(`${baseURL}users/${user}/routines`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const results = response.json();
    return results;
  } catch (ex) {
    console.log('Error getting my routines')
  }
}

export async function editRoutine({ token, name, goal, isPublic, activities, routineId }) {
  try {
    console.log(token, name, goal, isPublic, activities, routineId)
      const response = await fetch(`${baseURL}routines/${routineId}`, {
          method: "PATCH",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              name: name,
              goal: goal,
              isPublic: isPublic,
              activities: activities,
              token: token
          })
      });
      const result = await response.json();
      console.log(result)
      if (result.error) {
          alert(result.message);
          return false;
      }
      else {
          return true;
      }
  } 
  catch (err) {
      console.error(err)
  }
}