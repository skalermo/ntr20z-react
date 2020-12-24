import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Teachers() {
    const [teachers, setTeachers] = useState([]);

    const deleteTeacher = (id) => {
        console.log("Deleting teacher: id=" + id)
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        fetch(`http://localhost:8081/teachers/${id}`, requestOptions)
            .then(response => {
                if (response.status === 204)
                    fetchTeachers();
            })
            .catch(console.log)
    }

    const fetchTeachers = () => {
        fetch("http://localhost:8081/teachers")
            .then(res => res.json())
            .then((data) => {
                setTeachers(data)
            })
            .catch(console.log)
    }

    useEffect(() => {
        fetchTeachers();
        setInterval(() => fetchTeachers(), 10_000);
    }, []);

    const TeacherEntry = ({ idx, name }) => {
        return (
            < tr >
                <td>
                    {name}
                </td>
                <td>
                    <Link class="btn btn-link" to={{
                        pathname: "/teacherForm",
                        state: { idx, name }
                    }}>Edit</Link>
                    <button onClick={() => { deleteTeacher(idx) }} name="deleteButton" value={idx} class="btn btn-link">Delete</button>
                </td>
            </tr>
        );
    }

    return (
        <div>
            < h2 >
                Teachers
                </h2 >
            <Link class="btn btn-link" to="/teacherForm">Add new teacher</Link>

            <table class="table table-hover">
                <tr>
                    <th>
                        Teacher
                                </th>
                    <th>
                        Actions
                                </th>
                </tr>
                {teachers.map((teacher, idx) => {
                    return <TeacherEntry idx={idx} name={teacher} />;
                })}
            </table>
        </div >
    );

}

export default Teachers;