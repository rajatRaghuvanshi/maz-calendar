import React from 'react';

import { ReactComponent as Edit } from '../images/edit.svg';
import STATUS from '../constants/status';

import './Card.css';


function Card(props) {
    const {data, onChange, cardClick} = props;

    const dragStart = e => {
        e.dataTransfer.setData("card-id", e.target.id);

    }
    const dragOver = e => {
        e.preventDefault();
    }

    const onDrop = e => {
        const el = findParentCard(e.target);
        const targetId = e.dataTransfer.getData("card-id");
        if (el !== undefined && el.id !== undefined && targetId !== undefined) {
            onChange(el.id, e.dataTransfer.getData("card-id"))
        }
    }

    const findParentCard = target => {
        if(target.classList.contains("card")) return target;
        return findParentCard(target.parentNode)
    }

    return (
        <div 
            className={"card " + data.status.toLowerCase()} 
            draggable={true} 
            onDragStart={dragStart} 
            onDragOver={dragOver}
            onDrop={onDrop}
            id={data.id}
            onClick={() => cardClick(data.id)}
        >
            <span className="time">{data.time.toLowerCase()}</span>
            {data.status === STATUS.FILLED && data.repeated &&
                <span className="schedule-image">
                    <Edit height="14px" width="14px" fill={"#fff"}/>
                </span>
            }
            <div className="name">
                <span>{data.title}</span>
            </div>
        </div>
    )
}

export default Card
