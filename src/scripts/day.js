import React from "react"
import "../styles/day.css"



function Day(props) {

    
    // for now its np 09.12
    let day = props.item.date;
    let fDay = day.length;
    let summary = day.slice(fDay-5, fDay);
    console.log(props)

    let tempValue = '';

    if(props.tempValue === "celsjusz") {
        tempValue = '℃';
    } else {
        tempValue = '℉';
    }
  

    return (
        <div className="dayWeather">

            <div className="daye">
                <div> {summary} </div>
                <img src={props.item.day.condition.icon} />
                <div> {props.item.day.avgtemp_c} {tempValue}  </div>

            </div>
        </div>
    )
}

export default Day