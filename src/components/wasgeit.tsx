import * as React from "react";
import {HashRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import {AgendaContainer} from "./agenda";
import {NewsComponent} from "./news";
import {buildInfo} from "../shared/build-info";

function getRemoteCommitHash(): Promise<string> {
    return fetch('/version.json')
        .then(response => response.json())
        .then(response => response.WASGEIT_BUILD_COMMIT)
        .then(commit => {
            console.debug(`Got commit hash ${commit} from remote`)
            return commit
        })
}

function checkIfReloadBannerShouldBeShown(): Promise<boolean> {
    console.debug(`Local commit hash: ${buildInfo.commit}`)
    const commitFromRemote = getRemoteCommitHash()
    const isIosDevice = window.navigator.userAgent.search('iPhone OS') != -1
    console.debug(`Is iOS device: ${isIosDevice}`)
    return commitFromRemote.then(remoteCommit => isIosDevice && remoteCommit !== buildInfo.commit)
}

function forceReload() {
    location.reload(true)
}

interface Props {
}

interface State {
    showForceReloadButton: boolean
}

export class WasGeit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {showForceReloadButton: false}
        checkIfReloadBannerShouldBeShown()
            .then(showForceReloadButton => {
                console.debug(`Will show force reload banner: ${showForceReloadButton}`)
                return showForceReloadButton
            })
            .then(showForceReloadButton => this.setState({showForceReloadButton}))
    }

    render() {
        const url = `https://github.com/bjorm/wasgeit-frontend/commit/${buildInfo.commit}`
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
                        <p className={'force-reload-banner'} hidden={this.isForceReloadBannerHidden()}>
                            <a onClick={forceReload}>Deine Version von wasgeit ist veraltet. Tipp hier um sie zu
                                aktualisieren.</a>
                        </p>
                    </div>
                    <div className={'content'}>
                        <Switch>
                            <Route exact path="/agenda" component={AgendaContainer}/>
                            <Route exact path="/news" component={NewsComponent}/>
                            <Redirect exact from="/" to="/agenda"/>
                        </Switch>
                    </div>
                    <small>Built from <a href={url}>{buildInfo.commit.slice(0, 8)} at {buildInfo.time}</a>
                    </small>
                </div>
            </Router>
        )
    }

    private isForceReloadBannerHidden() {
        return !this.state.showForceReloadButton
    }
}
