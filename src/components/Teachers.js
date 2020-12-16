import React, { Component } from "react";
import { Link } from "react-router-dom";

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
        }
    }

    render() {
        console.log(this.state.teachers)
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
                    {this.state.teachers.map((teacher, idx) => {
                        return this.renderTeacherEntry(idx, teacher);
                    })}
                </table>
            </div >
        );
    }

    renderTeacherEntry(idx, name) {
        console.log(name);
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
                    {/* <button name="editButton" value={idx} class="btn btn-link">Edit</button> */}
                    <button onClick={() => { this.deleteTeacher(idx) }} name="deleteButton" value={idx} class="btn btn-link">Delete</button>
                </td>
            </tr>
        );
    }

    deleteTeacher(id) {
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
                    this.setState((state) => (state.teachers.splice(id, 1)))
            })
            .catch(console.log)
    }

    fetchTeachers() {
        fetch("http://localhost:8081/teachers")
            .then(res => res.json())
            .then((data) => {
                this.setState({ teachers: data })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.fetchTeachers();
        this.timer = setInterval(() => this.fetchTeachers(), 10_000);
    }
}

export default Teachers;