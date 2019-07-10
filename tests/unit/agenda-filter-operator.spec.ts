import {Agenda, Event, Venue} from '@/model'
import {agendaSearch} from '@/agenda-filter-operator'
import {expect} from 'chai'

const jan1 = '1. Jan.';
const feb2 = '2. Feb.';
const feb5 = '5. Feb.';
const mar1 = '1. März';
const mar12 = '12. März';
const agenda: Agenda = {};

class TestEvent implements Event {
    public readonly date: string = '';
    public readonly title: string = '';
    public readonly url: string = '';
    // @ts-ignore
    public readonly venue: Venue;
    constructor(title: string) {
        this.title = title;

    }
}



agenda[jan1] = [ new TestEvent('Event Foo'), new TestEvent('Event Foo 2') ];
agenda[feb2] = [ new TestEvent('Event Bar') ];
agenda[feb5] = [ new TestEvent('Event Foo 2') ];
agenda[mar1] = [ new TestEvent('Event Baz') ];
agenda[mar12] = [ new TestEvent('Event Whoo') ];

describe('agendaSearchOperator', () => {

    describe('agendaSearch()', () => {
        it('must match event title and return all days with only matching event', () => {
            const filtered = agendaSearch(agenda, 'foo');

            expect(Object.keys(filtered).length).to.equal(2);
            expect(filtered.hasOwnProperty(jan1)).to.equal(true);
            expect(filtered.hasOwnProperty(feb5)).to.equal(true);
        });

        it('must match month name and return all days of that month including all their events', () => {
            const filtered = agendaSearch(agenda, 'Mär');

            expect(Object.keys(filtered).length).to.equal(2);
            expect(filtered.hasOwnProperty(mar1)).to.equal(true);
            expect(filtered.hasOwnProperty(mar12)).to.equal(true);
        });

        it('must match date and return just that day including its events', () => {
            const filtered = agendaSearch(agenda, '2. Feb');

            expect(Object.keys(filtered).length).to.equal(1);
            expect(filtered.hasOwnProperty(feb2)).to.equal(true);
        });

        it('must return empty agenda if no match', () => {
            const emptyMap = {};
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
