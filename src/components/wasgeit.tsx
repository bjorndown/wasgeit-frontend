import * as React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {AgendaContainer} from "./agenda";
import {NewsComponent} from "./news";

export const WasGeit = () => {
    return (
        <Router>
            <div>
                <h1>wasgeit</h1>
                <ul>
                    <li>
                        <Link to="/">Agenda</Link>
                    </li>
                    <li>
                        <Link to="/news">News</Link>
                    </li>
                </ul>
                <Route exact path="/" component={AgendaContainer}/>
                <Route exact path="/news" component={NewsComponent}/>
            </div>
        </Router>
    )
}
