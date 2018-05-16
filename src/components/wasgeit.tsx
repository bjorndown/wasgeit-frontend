import * as React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {AgendaContainer} from "./agenda";
import {NewsComponent} from "./news";

export const WasGeit = () => {
    return (
        <Router>
            <div>
                <div className={'header'}>
                    <h1>was<span>geit</span></h1>
                    <ul role={'navigation'}>
                        <li>
                            <Link to="/">Agenda</Link>
                        </li>
                        <li>
                            <Link to="/news">News</Link>
                        </li>
                    </ul>
                </div>
                <div className={'content'}>
                    <Route exact path="/" component={AgendaContainer}/>
                    <Route exact path="/news" component={NewsComponent}/>
                </div>
            </div>
        </Router>
    )
}
