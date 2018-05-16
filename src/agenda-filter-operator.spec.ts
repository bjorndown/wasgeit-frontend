import {Agenda} from "./model/agenda";
import {Event} from "./model/event";
import {agendaSearch} from "./agenda-filter-operator";
import {expect} from "chai";

let jan1 = '1. Jan.';
let feb2 = '2. Feb.';
let feb5 = '5. Feb.';
let mar1 = '1. März';
let mar12 = '12. März';
let agenda: Agenda = {};


agenda[jan1] = [ new Event('Event Foo'), new Event('Event Foo 2') ];
agenda[feb2] = [ new Event('Event Bar') ];
agenda[feb5] = [ new Event('Event Foo 2') ];
agenda[mar1] = [ new Event('Event Baz') ];
agenda[mar12] = [ new Event('Event Whoo') ];

describe('agendaSearchOperator', () => {

    describe('agendaSearch()', () => {
        it('must match event title and return all days with only matching event', () => {
            let filtered = agendaSearch(agenda, 'foo');

            expect(Object.keys(filtered).length).to.equal(2);
            expect(filtered.hasOwnProperty(jan1)).to.equal(true);
            expect(filtered.hasOwnProperty(feb5)).to.equal(true);
        });

        it('must match month name and return all days of that month including all their events', () => {
            let filtered = agendaSearch(agenda, 'Mär');

            expect(Object.keys(filtered).length).to.equal(2);
            expect(filtered.hasOwnProperty(mar1)).to.equal(true);
            expect(filtered.hasOwnProperty(mar12)).to.equal(true);
        });

        it('must match date and return just that day including its events', () => {
            let filtered = agendaSearch(agenda, '2. Feb');

            expect(Object.keys(filtered).length).to.equal(1);
            expect(filtered.hasOwnProperty(feb2)).to.equal(true);
        });

        it('must return empty agenda if no match', () => {
            let emptyMap = {};
            expect(agendaSearch(agenda, '13. Feb')).to.deep.equal(emptyMap)
            expect(agendaSearch(agenda, 'Nope')).to.deep.equal(emptyMap)
        });

        it('must return original agenda if search string empty', () => {
            expect(agendaSearch(agenda, '')).to.equal(agenda)
            expect(agendaSearch(agenda, null)).to.equal(agenda)
            expect(agendaSearch(agenda, undefined)).to.equal(agenda)
        });
    });
});