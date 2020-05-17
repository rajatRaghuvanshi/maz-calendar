import React from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EditModel from './components/EditModel';

import STATUS from './constants/status';
import { TIMES, DAYS, WORKINGDAYS, WORKINGHOURS } from './constants/timings';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      calendar: this.getCalendar(),
      showEditModel: false,
      editableEvent: null
    }
  }

  getCalendar() {
    let calender = {}
    for(let time = 0; time < TIMES.length; time++) {
      const t = TIMES[time];
      for(let day = 0; day < DAYS.length; day++ ) {
        const d = DAYS[day];
        let obj = {
          id: `${t}_${d}`,
          status: WORKINGHOURS.includes(t) && WORKINGDAYS.includes(d) ? STATUS.OPEN : STATUS.BLOCKED,
          title: WORKINGHOURS.includes(t) && WORKINGDAYS.includes(d) ? STATUS.OPEN : STATUS.BLOCKED,
          time: t,
          date: d
        }
        calender[obj.id] = obj;
      }
    }
    return calender;
  }



  getCalenderEvent(id) {
    if (!this.state.calendar[id]) return null;
    else return this.state.calendar[id];
    
  }

  // ---------- handlers-------------


  onCalenderChange(target, shifting) {
    let targetEvent = this.getCalenderEvent(target);
    let shiftingEvent = this.getCalenderEvent(shifting);
    if (targetEvent && shiftingEvent) {
      if(targetEvent.status === STATUS.OPEN && shiftingEvent.status === STATUS.FILLED) {
        targetEvent.status = STATUS.FILLED;
        targetEvent.title = shiftingEvent.title;

        shiftingEvent.status = STATUS.OPEN;
        shiftingEvent.title = STATUS.OPEN;
        this.setState({
          calendar: {
            ...this.state.calendar,
            [target]: targetEvent,
            [shifting]: shiftingEvent
          }
        })
      }
    }
  }

  addEvent(data) {
    if (data && data.id) {
      this.setState({
        calendar: {
          ...this.state.calendar,
          [data.id]: data
        },
        editableEvent: null
      })
    }
  }

  reSchedule(id, repeat) {
    let oldEvent = this.getCalenderEvent(id);
    let [time, day] = id.split("_");
    if (id && WORKINGDAYS.indexOf(day) > -1) {
      let data = {};
      if (repeat) {
        for (let i = WORKINGDAYS.indexOf(day) + 1; i < WORKINGDAYS.length; i++) {
          let newId = `${time}_${WORKINGDAYS[i]}`
          let event = this.getCalenderEvent(newId);
          if (event) {
            data[newId] = {
              ...event,
              status: STATUS.FILLED,
              title: oldEvent.title,
              repeated: true
            }
          }
        }
      } else {
        for (let i = WORKINGDAYS.indexOf(day) + 1; i < WORKINGDAYS.length; i++) {
          let newId = `${time}_${WORKINGDAYS[i]}`
          let event = this.getCalenderEvent(newId);
          if (event) {
            data[newId] = {
              ...event,
              status: oldEvent.title === event.title ? STATUS.OPEN : event.status,
              title: oldEvent.title === event.title ? STATUS.OPEN : event.title,
              repeated: oldEvent.title === event.title ? true : (event.repeated || false)
            }
          }
        }
      }
      this.setState({
        calendar: {
          ...this.state.calendar,
          ...data
        },
        editableEvent: null
      })
    } else {
      this.setState({
        editableEvent: null
      })
    }
  }

  closeModel() {
    this.setState({
      showEditModel: false,
      editableEvent: null
    })
  }

  handleCardClick(id) {
    const cardData = this.getCalenderEvent(id);
    if (cardData && cardData.status !== STATUS.BLOCKED) {
      this.setState({
        showEditModel: true,
        editableEvent: cardData
      })
    }
  }

  // ---------- Rendering-------------

  render() {
    return (
      <div className="App">
        <Calendar 
          calendar={this.state.calendar}
          onChange={(target, shifting) => this.onCalenderChange(target, shifting)}
          cardClick={(id) => this.handleCardClick(id)}
        />
        {this.state.editableEvent &&
          <EditModel 
            data={this.state.editableEvent}
            addEvent={(data) => this.addEvent(data)}
            closeModel={() => this.closeModel()}
            reSchedule={(id, repeat) => this.reSchedule(id, repeat)}
          />}
      </div>
    )
  }
}

export default App;
