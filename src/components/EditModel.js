import React from 'react';


import { ReactComponent as Logo } from '../images/signs.svg';
import { ReactComponent as Cancel } from '../images/cross.svg';
import { ReactComponent as Save } from '../images/interface.svg';
import { ReactComponent as Edit } from '../images/edit.svg';

import { FULLTIMES } from '../constants/timings';
import STATUS from '../constants/status';
import './EditModel.css';

function EditModel(props) {
    const [title, change] = React.useState("");
    const [repeat, setRepeat] = React.useState(true);
    

    const data = props.data;

    function handleSave() {
        let data = {
            ...props.data,
            title: title || "No title",
            status: STATUS.FILLED
        }
        props.addEvent(data)
    }

    function handleReschedule() {
        props.reSchedule(data.id, repeat)
    }

    return (
        <div className="wrapper">
            <div className="edit-model">
                <div>
                    <Logo className="cross" fill="#d7d3d3" height="14px" onClick={props.closeModel}/>
                </div>
                <div className="model-body">
                    {data.status === STATUS.FILLED
                        ? <div>
                            <p className="heading">{data.title}</p>
                                <span className="date-time">{data.date} at {FULLTIMES[data.time]}</span>
                            <div className={repeat ? "repeats rep-color" : "repeats no-rep-color"} onClick={() => setRepeat(!repeat)}>
                                <Edit className="edit-images" height="14px" width="14px" fill={repeat ? "#49D9B5" : "#d7d3d3"}/>
                                <span>Repeats every day</span>
                            </div>
                            <div>
                                <span className="save" onClick={handleReschedule}><Save className="edit-images" height="14px" width="14px" fill="#FFF"/>Reschedule</span>
                                <span className="cancel" onClick={props.closeModel}><Cancel className="edit-images" height="14px" width="14px" fill="#FFF"/>Cancel</span>
                            </div>
                        </div>
                        : <div>
                            <p className="heading">Schedule an event</p>
                            <span className="date-time">{data.date} at {FULLTIMES[data.time]}</span>
                            <input onChange={(e) => change(e.target.value)} className="eventName" type="text" value={title} placeholder="Add Title" autoFocus/>
                            <div>
                                <span className="save" onClick={handleSave}><Save className="edit-images" height="14px" width="14px" fill="#FFF"/>Save</span>
                                <span className="cancel" onClick={props.closeModel}><Cancel className="edit-images" height="14px" width="14px" fill="#FFF"/>Cancel</span>
                            </div>
                        </div>
                    }
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default EditModel;
