import React, { useState, useEffect } from "react";
import { createActivity, getAllActivities } from "../api";
import CreateActivity from "./CreateActivity";

const Activities = () => {
  const [activity, setActivity] = useState([]);
  const [createNew, setCreateNew] = useState(false);
  const getActivities = async () => {
    const activity = await getAllActivities();
    setActivity(activity);
  };
  useEffect(() => {
    getActivities();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createActivity(event);
    window.location.reload(true);
  };
  return (
    <div>
      <>
      <CreateActivity getActivities={getActivities} setActivity={setActivity} />
        {localStorage.getItem("token") ? (
          <div className="create-new-activity">
            <button
              id="create-new-activity-button"
              onClick={() => {
                setCreateNew(true);
              }}
            >
              <span></span>
              Create New Activity
            </button>
            {createNew ? (
              <form onSubmit={handleSubmit} className="activityForm">
                <input id="create-name" placeholder="Name" />
                <input id="create-description" placeholder="Description" />
                <button
                  id="new-routine-submit"
                  type="Submit"
                  onClick={() => {
                  }}
                >
                  Create
                </button>
              </form>
            ) : null}
          </div>
        ) : null}
      </>
      <h1 className="page-title">Activities</h1>
      <div id="all-activities">
        
        {activity.map((activity, index) => {
          return (
            <div className="activity-card" key={index}>
              <h1 id="activity-name">{activity.name}</h1>
              <p id="activity-description">Description: {activity.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Activities;