import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
                setActivity(data);
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

            <button class="btn btn-primary mr-2" disabled={saveDisabled}>Save</button>
            <button class="btn btn-secondary" disabled={activity === undefined}>Delete this activity</button>
        </div >
    )
}

export default ActivityForm;