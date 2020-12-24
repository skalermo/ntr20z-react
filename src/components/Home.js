import React from "react";
import { Link } from "react-router-dom"

function Home() {
    return (
        <div>
            <div class="text-center">
                <p class="h3">Welcome to the SchoolScheduler</p>
            </div>

            <div class="text-center">
                <Link class="btn btn-link btn-lg" to={"/teachers"}>Teachers</Link >
                <Link class="btn btn-link btn-lg" to={"/activities"}>Activities</Link >
            </div>
        </div >
    )
}

export default Home;