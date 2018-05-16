import * as React from 'react'
import {AgendaFilter} from "./agenda-filter";
import {Agenda} from "../model/agenda";
import {Observable} from "rxjs/internal/Observable";
import {ajax} from "rxjs/ajax";
import {pluck} from "rxjs/operators";

export const AgendaContainer = () => {
    let agenda$: Observable<Agenda> = ajax('/rest/agenda').pipe(pluck('response'))
    return (
        <div>
            <h2 className={'hidden'}>Agenda</h2>
            <AgendaFilter agenda$={agenda$}/>
        </div>
    )
}