export interface Agenda { [prop: string]: Event[]
}

export interface Event {
    readonly date: string
    readonly title: string
    readonly venue: Venue
    readonly url: string
}
export interface Festival {
    readonly title: string
    readonly from: string
    readonly to: string
}

export interface News { [prop: string]: Event[] }

export interface Venue {
    readonly Name: string
    readonly URL: string
}
