import * as React from "react";
import {HashRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import {AgendaContainer} from "./agenda";
import {NewsComponent} from "./news";
import {buildInfo} from "../shared/build-info";

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
                <small>Built at {buildInfo.time} from
                    <a href={'https://github.com/bjorm/wasgeit-frontend/commit/' + buildInfo.commit}>{buildInfo.commit}</a>
                </small>
            </div>
        </Router>
    )
}
