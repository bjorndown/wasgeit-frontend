import { Venue } from "./venue";

export class Event {
    date: Date
    title: string
    venue: Venue
    url: string

    constructor(title: string) {
        this.title = title;
    }
}