import {Agenda} from './model/agenda'

// import {Observable, OperatorFunction, Subscriber} from "rxjs";
//
// export function agendaSearchOperator(): OperatorFunction<[Agenda, string], Agenda> {
//     return function agendaSearchOperatorImpl(source: Observable<[Agenda, string]>) {
//         return Observable.create((subscriber: Subscriber<Agenda>) => {
//             return source.subscribe(([agenda, searchStr]: [Agenda, string]) => {
//                     try {
//                         subscriber.next(agendaSearch(agenda, searchStr));
//                     } catch (err) {
//                         subscriber.error(err);
//                     }
//                 },
//                 (err: Error) => subscriber.error(err),
//                 () => subscriber.complete());
//         });
//     }
// }

export function agendaSearch(agenda: Agenda, searchStr: string | null | undefined): Agenda {
    if (searchStr === '' || searchStr === undefined || searchStr === null) {
        return agenda
    }

    const filteredAgenda: Agenda = {}

    for (const day in agenda) {
        if (day.toLowerCase().includes(searchStr.toLowerCase())) {
            filteredAgenda[day] = agenda[day]
        } else {
            for (const event of agenda[day]) {
                if (event.title.toLowerCase().includes(searchStr.toLowerCase())) {
                    if (!filteredAgenda[day]) {
                        filteredAgenda[day] = []
                    }

                    filteredAgenda[day].push(event)
                }
            }
        }
    }

    return filteredAgenda
}
