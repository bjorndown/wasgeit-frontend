import * as React from "react";
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import {AgendaContainer} from "./agenda";
import {NewsComponent} from "./news";

export const WasGeit = () => {
    return (
        <Router>
            <div className={'container'}>
                <div className={'header'}>
                    <h1>was<span>geit</span></h1>
                    <ul role={'navigation'}>
                        <li>
                            <Link to="/agenda">Agenda</Link>
                        </li>
                        <li>
                            <Link to="/news">News</Link>
                        </li>
                    </ul>
                </div>
                <div className={'content'}>
                    <Switch>
                        <Route exact path="/agenda" component={AgendaContainer}/>
                        <Route exact path="/news" component={NewsComponent}/>
                        <Redirect exact from="/" to="/agenda"/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
