import React, { Component } from "react";
import "../grid.css"
// import { Link, Route, useParams, useRouteMatch } from "react-router-dom"

const headerSlots = ["time", "Mo", "Tu", "We", "Th", "Fr"];
const activitiesTimes = [
    "8:00-8:45", "8:55-9:40", "9:50-11:35",
    "11:55-12:40", "12:50-13:55", "13:45-14:30",
    "14:40-15:25", "15:35-16:20", "16:30-17:15"];
const activityLabels = [];
const rows = 9;
const cols = 5;

function Temp() {
    return (
        <div class="wrapper">
            {headerSlots.map((slot) => {
                return (
                    <div class="slot header">{slot}</div>
                )
            })}

            {Array.apply(null, Array(cols * rows)).map(function (x, i) {
                console.log(i);
                let f = () => {
                    if (i % cols == 0)
                        return (
                            <>
                                <div class="slot index">{activitiesTimes[i / cols]}</div>
                                <a href="" class="fill-div slot" data-toggle="modal" data-target="#activityModal">
                                    a
                                </a>
                            </>
                        )
                    return (
                        <a href="" class="fill-div slot" data-toggle="modal" data-target="#activityModal">
                            a
                        </a>
                    )
                }
                return f();
            })}
        </div >
    )
}

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
        }
    }

    render() {
        return (
            <div>
                <h2>
                    Activities
                </h2 >

                <Temp />

            </div>
        );
    }

    fetchActivities() {
        fetch("http://localhost:8081/activities")
            .then(res => res.json())
            .then((data) => {
                this.setState({ activities: data })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.fetchActivities();
        this.timer = setInterval(() => this.fetchActivities(), 10_000);
    }
}

export default Activities;