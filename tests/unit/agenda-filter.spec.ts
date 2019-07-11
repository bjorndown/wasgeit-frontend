import {Agenda, Event, Venue} from '@/model'
import {filterAgenda} from '@/views/Agenda.vue'
import {expect} from 'chai'

const jan1 = '2019-01-01'
const feb2 = '2019-02-02'
const feb5 = '2019-02-05'
const mar1 = '2019-03-01'
const mar12 = '2019-03-12'
const agenda: Agenda = {}

class TestEvent implements Event {
    public readonly date: string = ''
    public readonly title: string = ''
    public readonly url: string = ''
    // @ts-ignore
    public readonly venue: Venue

    constructor(title: string) {
        this.title = title
    }
}


agenda[jan1] = [new TestEvent('Event Foo'), new TestEvent('Event Foo 2')]
agenda[feb2] = [new TestEvent('Event Bar')]
agenda[feb5] = [new TestEvent('Event Foo 2')]
agenda[mar1] = [new TestEvent('Event Baz')]
agenda[mar12] = [new TestEvent('Event Whoo')]

describe('agendaSearchOperator', () => {

    describe('filterAgenda()', () => {
        it('must match event title and return all days with only matching event', () => {
            const filtered = filterAgenda(agenda, 'foo', {}, this.searchMode)

            expect(Object.keys(filtered).length).to.equal(2)
            expect(filtered.hasOwnProperty(jan1)).to.equal(true)
            expect(filtered.hasOwnProperty(feb5)).to.equal(true)
        })

        it('must match month name and return all days of that month including all their events', () => {
            const filtered = filterAgenda(agenda, 'Mar', {}, this.searchMode)

            expect(Object.keys(filtered).length).to.equal(2)
            expect(filtered.hasOwnProperty(mar1)).to.equal(true)
            expect(filtered.hasOwnProperty(mar12)).to.equal(true)
        })

        it('must match date and return just that day including its events', () => {
            // in the browser this would be '2 Feb', but unit tests seem to use a different locale
            const filtered = filterAgenda(agenda, 'Feb 2', {}, this.searchMode)

            expect(Object.keys(filtered).length).to.equal(1)
            expect(filtered.hasOwnProperty(feb2)).to.equal(true)
        })

        it('must return empty agenda if no match', () => {
            const emptyMap = {}
            expect(filterAgenda(agenda, '13 Feb', {}, this.searchMode)).to.deep.equal(emptyMap)
            expect(filterAgenda(agenda, 'Nope', {}, this.searchMode)).to.deep.equal(emptyMap)
        })

        it('must return original agenda if search string empty', () => {
            expect(filterAgenda(agenda, '', {}, this.searchMode)).to.equal(agenda)
        })
    })
})
