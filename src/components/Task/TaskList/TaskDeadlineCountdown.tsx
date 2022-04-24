import React, {FC} from 'react';
import Countdown from "react-countdown";

type timerRendererProps = {
    days: number
    hours: number
    minutes: number
    seconds: number
    completed: boolean
}

const timerRenderer = ({days, hours, completed}: timerRendererProps) => {
    let str = '';
    if (completed)
        return str;

    if (days > 0) {
        if (days === 1)
            str += `${days} day `
        else
            str += `${days} days `
    }
    if (hours > 0) {
        if (hours === 1)
            str += `${hours} hour `
        else
            str += `${hours} hours `

    }
    if (days === 0 && hours === 0)
        str += 'Less than an hour'

    str += ' left'
    return str
};

interface TaskDeadlineCountdownProps {
    date: Date
}

const TaskDeadlineCountdown: FC<TaskDeadlineCountdownProps> = ({date}) => (
    <Countdown date={date} renderer={timerRenderer}/>
);

export default TaskDeadlineCountdown;