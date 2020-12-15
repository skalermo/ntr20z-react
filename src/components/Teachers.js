import React, { Component } from "react";

const TeacherEntry = ({ name }) => {
    console.log("checking typeof name: " + typeof (name));
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                <button type="submit" name="id" value={name} class="btn btn-link">Edit</button>
                <button type="submit" name="id" value={name} class="btn btn-link">Delete</button>
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
                <form>
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
                            {this.state.teachers.map(teacher => <TeacherEntry name={teacher} />)}
                        </table>
                    </div>
                </form>
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