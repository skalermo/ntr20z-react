import React, { useEffect, useState } from "react";

function ActivityForm({ idx }) {
    const [activity, setActivity] = useState();
    const newActivity = false;

    const getActivity = ({ id }) => {
        fetch(`http://localhost:8081/activities/${id}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ activity: data })
            })
            .catch(console.log)
    };

    // const newActivity = ({ activity }) => {

    // }

    // const updateActivity = ({ id }) => {

    // }

    // const deleteActivity = ({ id }) => {

    // }

    return (
        <div>
            <div class="form-group">
                <label>Room</label>
                <select class="form-control">
                    <option>5</option>
                </select>
                <label>Group</label>
                <select class="form-control" disabled>
                    <option>5</option>
                </select>
                <label>Subject</label>
                <select class="form-control">
                    <option>5</option>
                </select>
                <label>Teacher</label>
                <select class="form-control">
                    <option>5</option>
                </select>
            </div>

            <button class="btn btn-primary mr-2">Save</button>
            <button class="btn btn-secondary">Delete this activity</button>
        </div>
    )
}

export default ActivityForm;