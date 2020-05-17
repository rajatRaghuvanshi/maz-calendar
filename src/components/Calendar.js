import React from 'react'

import Card from './Card'
import { TIMES, DAYS } from '../constants/timings';

import './Calendar.css';

function Calendar(props) {
    function renderDates() {
        return (
            <div>
                <div className="empty-box"></div>
                {DAYS.map(day => {
                    return (
                        <div key={day} className="day-card">
                            <p className="day-card-day">{day.split(",")[0]}</p>
                            <p className="day-card-date">{new Date(day).getDate()}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="calender">
            {renderDates()}
            {TIMES.map(time => {
                return (
                    <div key={time}>
                        <div className="time-title"><span>{time}</span></div>
                        {DAYS.map(day => {
                            const id = `${time}_${day}`;
                            const data = props.calendar[id];
                            if(!data) return null;
                            return (
                                <Card 
                                    key={id} 
                                    data={data}
                                    onChange={props.onChange}
                                    cardClick={props.cardClick}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Calendar;
