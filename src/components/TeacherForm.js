import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Alert({ hide, type }) {
    if (hide) return null;
    switch (type) {
        case "create success":
            return (
                <div class="alert alert-success">
                    Successfully added new teacher.
                </div>
            );
        case "edit success":
            return (
                <div class="alert alert-success">
                    Successfully edited teacher.
                </div>
            );
        default:
            return null;
    }
}

function addNewTeacher(teacher) {
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
        .then(response => {
            // if (response.status === 201)
            //     return response.json();
            console.log(response.status)
            return response.status;
        });
}

function editTeacher(id, teacher) {
    console.log(`Editing teacher: #${id} ${teacher}`)
    const requestOptions = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher }),
    };
    return fetch(`http://localhost:8081/teachers/${id}`, requestOptions)
        .then(response => {
            console.log(response.status)
            return response.status;
        });
}

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

    let alertTimer = setTimeout(() => { setHideAlert(true) }, 5_000);
    return (
        <div>
            <h2>Teacher Form</h2>
            <Link class="btn btn-link" to="/teachers">Back to teachers list</Link>
            <Alert hide={hideAlert} type={alertType} />
            <input type="hidden" value={idx} />
            <div class="form-group">
                <label>Teacher</label>
                <input type="text" class="form-control" placeholder="John Smith" value={input} onInput={e => setInput(e.target.value)} />
            </div>
            <button type="submit" onClick={() => {
                if (typeof idx === 'undefined') {
                    let status = addNewTeacher(input);
                    status.then(status => {
                        console.log(status);
                        if (status === 201) {
                            setInput('');
                            setHideAlert(false);
                            setAlertType("create success");
                        }
                    });
                }
                else {
                    let status = editTeacher(idx, input);
                    status.then(status => {
                        console.log(status);
                        if (status === 200) {
                            setInput('');
                            setHideAlert(false);
                            setAlertType("edit success");
                        }
                    })
                }
            }} class="btn btn-primary">Submit</button>
        </div>
    )
}

export default TeacherForm;