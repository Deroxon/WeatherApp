import React from "react"
import "../styles/day.css"



class Day extends React.Component {

    constructor() {
        super()
        this.state = {
            day: ""
        }
    }
   
    

    render() {
        
        
        let date = new Date();
        let first = date.getDate(); // first day
        let second = first + 1;
        let third = second + 1;
    
        let day1 = new Date(date.setDate(first)).toUTCString();
        let day2 = new Date(date.setDate(second)).toUTCString();
        let day3 = new Date(date.setDate(third)).toUTCString();
    
        day1 = day1.slice(0,3)
        day2 = day2.slice(0,3)
        day3 = day3.slice(0,3)

    
        
        
        let day = ''
        let tempValue = '';
        let tempName = '';

        if(this.props.lol === 0) {
            day = day1
        } else if(this.props.lol === 1) {
            day = day2
        } else if (this.props.lol === 2) {
            day = day3
        }
    
    
    
        if(this.props.tempValue === "celsjusz") {
            tempValue = '℃';
            tempName = this.props.item.day.avgtemp_c
        } else {
            tempValue = '℉';
            tempName = this.props.item.day.avgtemp_f
        }
      
    
        return (
            <div className="dayWeather">
    
                <div className="daye" onClick={() => this.props.settingDay(this.props.lol)}>
                    <div> {day} </div>
                    <img src={this.props.item.day.condition.icon} />
                    <div> {tempName} {tempValue}  </div>
    
                </div>
            </div>
        )

    }

   
}

export default Day