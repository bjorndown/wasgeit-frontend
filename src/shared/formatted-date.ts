export function formatDate(isoDate: string): string {
    const tokens = isoDate.split('-');
    if (tokens.length !== 3) {
        throw new Error(`'${isoDate}' is not a valid ISO date.`);
    }
    const year = tokens[0];
    const month = tokens[1];
    const day = tokens[2];
    const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), 0, 0, 0, 0));
    const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
    const thisYear = new Date().getFullYear();
    const locale = new Intl.DateTimeFormat('de-CH', options);
    const parts: any = (locale as any).formatToParts(date);
    if (thisYear === parseInt(year, 10)) {
        return `${parts[0].value} ${parts[2].value}${parts[3].value} ${parts[4].value}`;
    }

    return `${parts[0].value} ${parts[2].value}${parts[3].value} ${parts[4].value} ${parts[6].value}`;

}
