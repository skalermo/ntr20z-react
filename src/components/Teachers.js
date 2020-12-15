import React, { Component } from "react";
import { Link } from "react-router-dom";

function deleteTeacher(id) {
    console.log("Deleting teacher: id=" + id)

    const requestOptions = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "teacherToDelete": { id } })
    }
    fetch("http://localhost:8081/deleteTeacher", requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ teachers: data }))
        .catch(console.log)
}

const TeacherEntry = ({ idx, name }) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {/* <Link class="btn btn-link" to="/teacherForm">Edit</Link> */}
                <button type="submit" name="editButton" value={idx} class="btn btn-link">Edit</button>
                <button type="submit" onClick={() => { deleteTeacher(idx) }} name="deleteButton" value={idx} class="btn btn-link">Delete</button>
            </td>
        </tr>
    )
}

class Teachers extends Component {
    state = {
        teachers: []
    }

    render() {
        console.log(this.state.teachers)
        return (
            <div>
                {/* <form method="post"> */}
                < h2 >
                    Teachers
                    </h2 >
                <div>
                    <table class="table table-hover">
                        <tr>
                            <th>
                                Teacher
                                </th>
                            <th>
                                Actions
                                </th>
                        </tr>
                        {this.state.teachers.map((teacher, idx) => <TeacherEntry key={idx} idx={idx} name={teacher} />)}
                    </table>
                </div>
                {/* </form> */}
            </div>
        );
    }


    componentDidMount() {
        fetch("http://localhost:8081/teachers")
            .then(res => res.json())
            .then((data) => {
                this.setState({ teachers: data })
            })
            .catch(console.log)
    }
}

export default Teachers;