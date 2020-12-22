import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../grid.css"

const headerSlots = ["time", "Mo", "Tu", "We", "Th", "Fr"];
const activitiesTimes = [
    "8:00-8:45", "8:55-9:40", "9:50-11:35",
    "11:55-12:40", "12:50-13:55", "13:45-14:30",
    "14:40-15:25", "15:35-16:20", "16:30-17:15"];
const rows = 9;
const cols = 5;

function Activities() {
    const [selectedGroupIdx, setSelectedGroupIdx] = useState();
    const [groups, setGroups] = useState([]);
    const [labels, setLabels] = useState([]);
    const firstUpdate = useRef(true);

    const fetchGroups = () => {
        fetch("http://localhost:8081/groups")
            .then(res => res.json())
            .then((data) => {
                if (groups.length === 0) {
                    setGroups(data);
                    setSelectedGroupIdx(0);
                }
                setGroups(data);
            })
            .catch(console.log);
    }

    const fetchActivities = (selectedGroupIdx) => {
        fetch(`http://localhost:8081/groups/${selectedGroupIdx}/activities`)
            .then(res => res.json())
            .then((data) => {
                let labels = Array(rows * cols).fill().map((_, idx) => ({ slot: idx, activityId: undefined, label: "" }));
                data.forEach(function (a) {
                    labels[a.slot] = { slot: a.slot, activityId: a.id, label: [a.room, a.subject].join(" ") };
                })
                setLabels(labels);
            })
            .catch(console.log);
    }

    useEffect(() => {
        fetchGroups();
    }, [])
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            fetchActivities(selectedGroupIdx);
        }
    }, [selectedGroupIdx]);

    return (
        <div>
            <h2>
                Activities
                </h2 >
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-form-label">Group</label>
                    <div class="col-sm-3">
                        <select class="form-control" onChange={e => setSelectedGroupIdx(e.target.value)}>
                            {/* <option value="" disabled selected>Select a group</option> */}
                            {groups && groups.length && groups.map((g, idx) => {
                                return <option value={idx}>{g}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>

            {(() => {
                if (selectedGroupIdx === undefined)
                    return (
                        <p>Select group to load schedule table</p>
                    )
                else {
                    return (
                        <div class="wrapper">
                            {headerSlots.map((slot) => {
                                return (
                                    <div class="slot header">{slot}</div>
                                )
                            })}

                            {labels && labels.map(function ({ slot, activityId, label }, i) {
                                // console.log(i);
                                return (() => {
                                    if (i % cols == 0)
                                        return (
                                            <>
                                                <div class="slot index">{activitiesTimes[i / cols]}</div>
                                                <Link class="fill-div slot" to={{
                                                    pathname: "/activityForm",
                                                    state: { slot, activityId, selectedGroup: groups[selectedGroupIdx] }
                                                }}>{label}</Link>
                                            </>
                                        )
                                    return (
                                        <Link class="fill-div slot" to={{
                                            pathname: "/activityForm",
                                            state: { slot, activityId, selectedGroup: groups[selectedGroupIdx] }
                                        }}>{label}</Link>
                                    )
                                })();
                            })}
                        </div>
                    )
                }
            })()}
        </div >
    )
}

export default Activities;