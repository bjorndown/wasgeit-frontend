import * as React from 'react'
import {Agenda} from "../model/agenda";
import {agendaSearchOperator} from "../agenda-filter-operator";
import {combineLatest, Observable} from "rxjs";
import {EventList} from "./event-list";
import {debounceTime, distinctUntilChanged, startWith, throttleTime} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";

interface State {
    filteredAgenda$: Observable<Agenda>
}

interface Props {
    agenda$: Observable<Agenda>
}

export class AgendaFilter extends React.Component<Props, State> {
    private subject: Subject<string>

    constructor(props: { agenda$: Observable<Agenda> }) {
        super(props)
        this.subject = new Subject<string>()

        let filterString$ = this.subject.pipe(
            throttleTime(20),
            debounceTime(50),
            distinctUntilChanged(),
            startWith('')
        )

        let filteredAgenda$: Observable<Agenda> = combineLatest(this.props.agenda$, filterString$)
            .pipe(agendaSearchOperator())

        this.state = {filteredAgenda$}
    }


    onChange(e: any) {
        this.subject.next(e.target.value)
    }

    render() {
        return (
            <div>
                <input type='text' onChange={this.onChange.bind(this)}/>
                <EventList agenda$={this.state.filteredAgenda$}/>
            </div>
        )

    }
}