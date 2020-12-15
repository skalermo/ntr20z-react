import React, { Component } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom"

const Teacher = ({ name }) => {
    console.log("checking typeof name: " + typeof (name));
    return (
        <p>{name}</p>
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
                < h2 >
                    Teachers
                </h2 >
                {this.state.teachers.map(teacher => <Teacher name={teacher} />)}
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