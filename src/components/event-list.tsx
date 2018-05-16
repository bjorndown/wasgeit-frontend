import * as React from 'react';
import {Event} from '../model/event'
import {Observable} from "rxjs";
import {Agenda} from "../model/agenda";
import {FormattedDate} from "./formatted-date";
import {Subscription} from "rxjs";

interface EventListState {
    agenda$: Observable<Agenda>
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
               className={'badge badge-info'}>{event.venue.Name}</a>
            <a href={event.url}>{event.title}</a>
        </li>
    )
}

const DayComponent = ({day, events}: { day: string, events: Event[] }) => {
    return (
        <li>
            <FormattedDate isoDateString={day}/>
            <ul>
                {events.map((event: Event) => <EventComponent key={event.url} event={event}/>)}
            </ul>
        </li>
    )
}

export class EventList extends React.Component<EventListProps, EventListState> {
    constructor(props: EventListProps) {
        super(props)
        this.state = {agenda$: props.agenda$, agenda: {}, days: [], sub: null}
    }

    componentDidMount() {
        let sub = this.state.agenda$.subscribe((agenda: Agenda) => {
            this.setState({agenda, days: Object.keys(agenda), sub})
        })
    }

    componentWillUnmount() {
        console.log(this.state)
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