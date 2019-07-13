export interface Agenda { [prop: string]: Event[]
}

export interface Event {
    readonly date: string
    readonly title: string
    readonly venue: Venue
    readonly url: string
}
export interface Festival {
    readonly url: string
    readonly title: string
    readonly location: string
    readonly date_start: string
    readonly date_end: string
    readonly opening_times: OpeningTime[]
}

export interface OpeningTime {
    readonly days: string
    readonly start: string
    readonly end: string
}

export interface News { [prop: string]: Event[] }

export interface Venue {
    readonly Name: string
    readonly ShortName: string
    readonly URL: string
}
