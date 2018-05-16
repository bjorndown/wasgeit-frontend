import {Agenda} from "../model/agenda";
import {Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {catchError, pluck} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

interface AppState {

}

const state: AppState = {};

export function getAgenda(): Observable<Agenda> {
    let url = 'localhost:8080/rest/'
    return ajax(`${url}/agenda`).pipe(
        pluck("response"),
        // catchError((error) => of({ error }))
    )
}