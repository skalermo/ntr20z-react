import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Alert from './BasicAlert';

function TeacherForm() {
    let idx, name;
    let state = useLocation().state;
    if (state && "idx" in state)
        idx = state.idx;
    if (state && "name" in state)
        name = state.name;

    const [input, setInput] = useState(() => { if (typeof name !== "undefined") return name; return '' });
    const [hideAlert, setHideAlert] = useState(true);
    const [alertType, setAlertType] = useState();
    const [alertMsg, setAlertMsg] = useState("");
    useEffect(() => {
        setTimeout(() => { setHideAlert(true) }, 5_000);
    }, []);

    const addNewTeacher = (teacher) => {
        console.log(`Adding new teacher: ${teacher}`)
        const requestOptions = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newTeacher: teacher }),
        };
        return fetch("http://localhost:8081/teachers", requestOptions)
            .then(res => {
                console.log(res.status)
                if (res.status === 201) {
                    setAlertType("success");
                } else {
                    setAlertType("danger");
                }
                setHideAlert(false);
                setAlertMsg(res.statusText);
            })
    }

    const updateTeacher = (id, teacher) => {
        console.log(`Updating teacher: #${id} ${teacher}`)
        const requestOptions = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teacher }),
        };
        return fetch(`http://localhost:8081/teachers/${id}`, requestOptions)
            .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    setAlertType("success");
                } else {
                    setAlertType("danger");
                }
                setHideAlert(false);
                setAlertMsg(res.statusText);
            });
    }

    return (
        <div>
            <h2>Teacher Form</h2>
            <Link class="btn btn-link" to="/teachers">Back to teachers list</Link>
            <Alert hide={hideAlert} type={alertType} msg={alertMsg} />
            <input type="hidden" value={idx} />
            <div class="form-group">
                <label>Teacher</label>
                <input type="text" class="form-control" placeholder="John Smith" value={input} onInput={e => setInput(e.target.value)} />
            </div>
            <button type="submit" onClick={() => {
                if (typeof idx === 'undefined')
                    addNewTeacher(input);
                else
                    updateTeacher(idx, input);
            }} class="btn btn-primary">Submit</button>
        </div>
    )
}

export default TeacherForm;