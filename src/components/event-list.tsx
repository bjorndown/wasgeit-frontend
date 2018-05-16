import * as React from 'react';
import {Event} from '../model/event'
import {Observable} from "rxjs";
import {Agenda} from "../model/agenda";
import {FormattedDate} from "./formatted-date";
import {Subscription} from "rxjs";

interface EventListState {
    agenda: Agenda
    days: string[]
    sub: Subscription
}

interface EventListProps {
    agenda$: Observable<Agenda>
}

const EventComponent = ({event}: { event: Event }) => {
    return (
        <li>
            <a href={event.venue.URL}
               className={'venue-badge'}>{event.venue.Name}</a>
            &nbsp;
            <a href={event.url}>{event.title}</a>
        </li>
    )
}

const DayComponent = ({day, events}: { day: string, events: Event[] }) => {
    return (
        <li>
            <h3><FormattedDate isoDateString={day}/></h3>
            <ul>
                {events.map((event: Event) => <EventComponent key={event.url} event={event}/>)}
            </ul>
        </li>
    )
}

export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps) {
        super(props)
        this.state = {agenda: {}, days: [], sub: null}
    }

    componentDidMount() {
        let sub = this.props.agenda$.subscribe((agenda: Agenda) => {
            this.setState({agenda, days: Object.keys(agenda), sub})
        })
    }

    componentWillUnmount() {
        this.state.sub.unsubscribe()
        this.setState({sub: null})
    }

    render() {
        return (
            <ul>
                {this.state.days.map((day: string) => {
                    let events = this.state.agenda[day]
                    return <DayComponent key={day} day={day} events={events}/>
                })}
            </ul>
        )
    }
}