import * as React from 'react';
import {formatDate} from '../shared/formatted-date'

export interface FormattedDateProps {
    isoDateString: string
}

export const FormattedDate = (props: FormattedDateProps) => <span>{formatDate(props.isoDateString)}</span>;