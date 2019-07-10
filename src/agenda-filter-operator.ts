import {Agenda} from './model'

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
