import React from "react"
import "../styles/box.css"
import {AiOutlineSetting, AiOutlineReload} from "react-icons/ai"
import Day from "./day"
import Temperature from "./temperature"
import Wind from "./Wind"

class Box extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            today: props.today,
            tempValue: "celsjusz",
            generated: ''
        }
    }


    componentDidMount() {
        this.setState({generated: <Temperature temperature={this.state.today} day={0} tempValue={this.state.tempValue}/>})
    }




    render() {

        let mappedList = this.state.today.forecast.forecastday.map(item => <Day item={item} tempValue={this.state.tempValue} key={item.day.totalprecip_in} /> );

        let cos =""

         let temp = "";
         let Feelslike = "";
         let per = "";


         setTimeout( () => {
            let grabBody = document.querySelector('body')
            grabBody.classList.add(this.props.backgroundStyle)
        },300)
         
        
       
           
       
         

        if(this.state.tempValue === "celsjusz") {
            temp="℃";
            Feelslike= "Feels like: "+ this.state.today.current.feelslike_c + temp
        } 
        else {
            temp="℉"
            Feelslike="Feels like: "+ this.state.today.current.feelslike_f + temp
        }


        if(this.state.perHour = "kilo") {
            per = "Wind: "+ this.state.today.current.wind_kph+ " kp/h";
        } 
        else {
            per="Wind: "+ this.state.today.current.wind_mph+ " /mp/h";
        }



        return (
            <section className="box"  >

                <div className="todaySection" onClick={this.cos}>

                    <div className="today">
                        <div> Wednesday </div>
                        <img src={this.state.today.current.condition.icon} />
                        <div> {this.state.today.current.temp_c}{temp} </div>

                    </div>

                    <ul>
                        <li>{this.state.today.current.condition.text}</li>
                        <li> {per}</li>
                        <li>{Feelslike} </li>
                        <li>Humidity: {this.state.today.current.humidity} %</li>
                    </ul>

                    <div className="cityDisplayed">Prusice</div>

                    <div className="buttons">
                        <button className="settings"> <AiOutlineSetting/> 
                        </button>
                        <button className="refresh"> <AiOutlineReload/>
                        </button>
                        <p>Last update: {this.state.today.current.last_updated}</p>
                    </div>

                    

                </div>

                <div className="chooseCategories">
                    <button onClick={ () => {
                        this.setState({generated: <Temperature temperature={this.state.today} day={0} tempValue={this.state.tempValue} />})
                    }}>Temperature</button>
                    <button onClick={ () => {
                        this.setState({generated: <Wind temperature={this.state.today} day={0} tempValue={this.state.tempValue} />})
                    }}>Wind</button>
                    <button>Rain</button>
                </div>

                <div className="categories">
                    {this.state.generated}
                </div>

                

                <div className="days"> 
                    {mappedList}
                </div>
               
            </section>
        )

    }



}

export default Box