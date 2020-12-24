import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alert from "./BasicAlert";

function ActivityForm() {
    // 3 props may be passed:
    // chosen slot, selected activity's id (optional), selected group

    let selectedSlot;
    let activityId;
    let selectedGroup;
    const [activity, setActivity] = useState();
    const [rooms, setRooms] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState();
    const [selectedTeacher, setSelectedTeacher] = useState();
    const [selectedSubject, setSelectedSubject] = useState();
    const [saveDisabled, setSaveDisabled] = useState(true);

    const [hideAlert, setHideAlert] = useState(true);
    const [alertType, setAlertType] = useState();
    const [alertMsg, setAlertMsg] = useState("");
    useEffect(() => {
        setTimeout(() => { setHideAlert(true) }, 5_000);
    }, []);

    let state = useLocation().state;
    if (state && "slot" in state)
        selectedSlot = state.slot;
    if (state && "activityId" in state)
        activityId = state.activityId;
    if (state && "selectedGroup" in state)
        selectedGroup = state.selectedGroup;

    const getActivity = (id) => {
        fetch(`http://localhost:8081/activities/${id}`)
            .then(res => res.json())
            .then((data) => {
                let activity = data;
                setActivity(activity);
                setSelectedRoom(activity.room);
                setSelectedSubject(activity.subject);
                setSelectedTeacher(activity.teacher);
            })
            .catch(console.log)
    };

    const getRooms = (slot, activityId) => {
        fetch(`http://localhost:8081/rooms?excludeForSlot=${slot}&includeForActivity=${activityId}`)
            .then(res => res.json())
            .then((data) => {
                setRooms(data);
            })
            .catch(console.log)
    }

    const getTeachers = (slot, activityId) => {
        fetch(`http://localhost:8081/teachers?excludeForSlot=${slot}&includeForActivity=${activityId}`)
            .then(res => res.json())
            .then((data) => {
                setTeachers(data);
            })
            .catch(console.log)
    }

    const getSubjects = () => {
        fetch(`http://localhost:8081/subjects`)
            .then(res => res.json())
            .then((data) => {
                setSubjects(data);
            })
            .catch(console.log)
    }

    useEffect(() => {
        getActivity(activityId);
        getRooms(selectedSlot, activityId);
        getTeachers(selectedSlot, activityId);
        getSubjects();
    }, [])

    useEffect(() => {
        if (selectedRoom && selectedTeacher && selectedSubject)
            setSaveDisabled(false);
    }, [selectedRoom, selectedTeacher, selectedSubject])

    const addNewActivity = (activity) => {
        console.log(`Adding new activity: ${activity}`)
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newActivity: activity }),
        };
        return fetch("http://localhost:8081/activities", requestOptions)
            .then(res => {
                console.log(res.status)
                if (res.status === 201)
                    setAlertType("success");
                else
                    setAlertType("danger");
                setAlertMsg(res.statusText);
                setHideAlert(false);
            });
    }

    const updateActivity = (id, activity) => {
        console.log(`Updating activity: #${id} ${activity}`)
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ activity }),
        };
        return fetch(`http://localhost:8081/activities/${id}`, requestOptions)
            .then(res => {
                console.log(res.status)
                if (res.status === 200)
                    setAlertType("success");
                else
                    setAlertType("danger");
                setAlertMsg(res.statusText);
                setHideAlert(false);
            });
    }

    const deleteActivity = (id) => {
        console.log(`Deleting activity: #${id}`)
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        fetch(`http://localhost:8081/activities/${id}`, requestOptions)
            .then(res => {
                console.log(res.status)
                if (res.status === 204)
                    setAlertType("success");
                else
                    setAlertType("danger");
                setAlertMsg(res.statusText);
                setHideAlert(false);
            });
    }

    return (
        <div>
            <Link class="btn btn-link" to="/activities">Back to activities</Link>
            <Alert hide={hideAlert} type={alertType} msg={alertMsg} />
            <div class="form-group">
                <label>Room</label>
                <select class="form-control" onChange={e => setSelectedRoom(e.target.value)}>
                    {(() => {
                        if (activity === undefined)
                            return <option disabled selected>Select room</option>
                    })()}
                    {rooms && rooms.map((r) => {
                        if (r === (activity && activity.room))
                            return <option selected>{r}</option>
                        return <option>{r}</option>

                    })}
                </select>
                <label>Group</label>
                <select class="form-control" disabled>
                    {((activity) => {
                        if (activity)
                            return <option>{activity && activity.group}</option>
                        return <option>{selectedGroup}</option>
                    })()}
                </select>
                <label>Subject</label>
                <select class="form-control" onChange={e => setSelectedSubject(e.target.value)}>
                    {(() => {
                        if (activity === undefined)
                            return <option disabled selected>Select subject</option>
                    })()}
                    {subjects && subjects.map((s) => {
                        if (s === (activity && activity.subject))
                            return <option selected>{s}</option>
                        return <option>{s}</option>
                    })}
                </select>
                <label>Teacher</label>
                <select class="form-control" onChange={e => setSelectedTeacher(e.target.value)}>
                    {(() => {
                        if (activity === undefined)
                            return <option disabled selected>Select teacher</option>
                    })()}
                    {teachers && teachers.map((t) => {
                        if (t === (activity && activity.teacher))
                            return <option selected>{t}</option>
                        return <option>{t}</option>

                    })}
                </select>
            </div>

            <button class="btn btn-primary mr-2" onClick={() => {
                let newActivity = {
                    room: selectedRoom,
                    group: selectedGroup,
                    subject: selectedSubject,
                    slot: selectedSlot,
                    teacher: selectedTeacher,
                    id: undefined
                }
                if (activity === undefined)
                    addNewActivity(newActivity);
                else {
                    newActivity.id = activityId;
                    updateActivity(activityId, newActivity);
                }
            }} disabled={saveDisabled}>Save</button>
            <button class="btn btn-secondary" onClick={() => { deleteActivity(activityId) }} disabled={activity === undefined}>Delete this activity</button>
        </div >
    )
}

export default ActivityForm;