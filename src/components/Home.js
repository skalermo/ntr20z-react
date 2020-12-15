import React from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom"

function Home() {
    const { url, path } = useRouteMatch();

    return (
        <div>
            <div class="text-center">
                <p class="h3">Welcome to the SchoolScheduler</p>
            </div>

            <div class="text-center">
                <Link class="btn btn-link btn-lg" to={"/teachers"}>Teachers</Link >
                <Link class="btn btn-link btn-lg" to={"/activities"}>Activities</Link >
                {/* <Link class="nav-link" to="/category">Category</Link> */}
                {/* <a href="/Manage" class="btn btn-link btn-lg" role="button">Manage panel</a> */}
                {/* <a href="/Activities" class="btn btn-link btn-lg" role="button">Activities panel</a> */}
            </div>
        </div >
    )
}

export default Home;