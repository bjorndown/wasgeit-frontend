import { Venue } from "./venue";

export interface Event {
    readonly date: string
    readonly title: string
    readonly venue: Venue
    readonly url: string
}