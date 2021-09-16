import React from "react"
import "../styles/box.css"
import {AiOutlineSetting, AiOutlineReload} from "react-icons/ai"
import Day from "./day"
import Temperature from "./temperature"
import Wind from "./Wind"
import Rain from "./rain"

class Box extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            today: props.today,
            tempValue: props.temperature,
            windValue: props.windValue,
            generated: '',
            searchCity: props.searchCity,
            classNightmode: false,
            Table: [],
            setDay: props.setDay,
            actualHour: 0,
            day: '',
            actualDay: '',
            actualWebsite: 'temperature'
        }
        this.settingDay = this.settingDay.bind(this)
    }

    settingDay(param) {
       
        let date = new Date();
        let first = date.getDate(); 
    
        let day1 = new Date(date.setDate(first)).toUTCString();

    
        day1 = day1.slice(0,3)
        // output example: Sun (sunday)
        if (param) {
            //getting dat || convert to string || slice a bit to give to state and display
            let something = new Date(date.setDate(first +param)).toUTCString();
            let second = String(something)
            second = second.slice(0,3)
           
            this.setState({
                actualDay: second,
                setDay: param
            })
        }
        else {
            
            this.setState({
                actualDay: day1,
                setDay: param
            })
        }
        
    }


    componentDidMount() {

        if(this.state.setDay === 0) {
            let date = new Date();
            let first = date.getHours(); // first day
            this.setState({actualHour: first})
        } else if(this.state.setDay) {
            this.setState({actualHour: 14 })
        }
        
        this.setState( () => {

            return {
                generated: <Temperature temperature={this.state.today} day={0} tempValue={this.props.temperature}/>,

                day: this.props.today.forecast.forecastday.map( (item, index) => <Day item={item} tempValue={this.props.temperature} key={item.date_epoch} lol={index} settingDay={this.settingDay}  /> )
                }

        })
        
    }

    // Here need to fix this shit
    componentDidUpdate(prevProps, prevState) {
        
        
        
        
       // generating website with updated data, choosed by user
        if(  
        ( (prevProps.today !== this.props.today) && (this.state.actualWebsite === "temperature")) 
        || 
        ( (this.state.actualWebsite=== "temperature")  && (prevState.setDay !== this.state.setDay) ) 
        || 
        ((this.state.actualWebsite=== "temperature") && (prevProps.temperature !== this.props.temperature)) 
        || ((prevState.actualWebsite !== this.state.actualWebsite) && (this.state.actualWebsite=== "temperature") ) 
         
        
        ){
            
            
            this.setState({generated: <Temperature temperature={this.props.today} day={this.state.setDay} tempValue={this.props.temperature}/>,
            today: this.props.today
            })
        }
        // if there were changes in props of wind and state of  actualwebsite is equal to "wind" or there was change of day render again wind component with correct day
        if( ( (prevProps.windValue !== this.props.windValue)   &&(this.state.actualWebsite === "wind") ) || ((prevProps.today !== this.props.today)  &&(this.state.actualWebsite === "wind")) || ((this.state.actualWebsite === "wind") && (prevState.setDay !== this.state.setDay) ) ) {
            
            this.setState({generated: <Wind temperature={this.props.today} day={this.state.setDay} windValue={this.props.windValue}/>,
            today: this.props.today
        })
        }

        if (   ( (this.state.actualWebsite === "rain")  && (prevState.setDay !== this.state.setDay) ) ||  ((prevProps.today !== this.props.today) && (this.state.actualWebsite === "rain") )   ) {
            this.setState({generated: <Rain temperature={this.props.today} day={this.state.setDay} />,
            today: this.props.today
            })

        }


        if(  (( prevProps.temperature !== this.props.temperature  ) || (prevProps.today !== this.props.today)) || (this.state.setDay !== prevState.setDay)      ) {
            
            
            
           
           this.setState({
            day: this.props.today.forecast.forecastday.map( (item,index) => <Day item={item} tempValue={this.props.temperature} key={item[index]}  lol={index} settingDay={this.settingDay}  /> )
           })
            

           
        }

        if(prevProps.setDay !== this.props.setDay) {
            
            if(this.state.setDay === 0) {
                let date = new Date();
                let first = date.getHours(); // first day
                console.log(first)
                this.setState({actualHour: first})
            } else if(this.state.setDay) {
                this.setState({actualHour: 14 })
            }
        }
        
    }

   






    render() {
        

        // Some of explanation
        // actualHour is for taking from object actual hour, for example its 11A.M and we set state.actualHour of 11 and taking data from object .hour[11].data
        

        
        

        //console.error("MAPed List")
        //console.log(mappedList)

       

         let temp = "";
         let Feelslike = "";
         let per = "";
         let tempToday = ''


         setTimeout( () => {
            let grabBody = document.querySelector('body')
            if(grabBody.classList.contains("sunny") && this.props.backgroundStyle !== "sunny") {
                grabBody.classList.remove("sunny")  
            } else if (grabBody.classList.contains("cloud") && this.props.backgroundStyle !== "cloud") {
                grabBody.classList.remove("cloud")
            } else if (grabBody.classList.contains("rain") && this.props.backgroundStyle !== "rain") {
                grabBody.classList.remove("rain")
            } else if (grabBody.classList.contains("snow") && this.props.backgroundStyle !== "snow") {
                grabBody.classList.remove("snow")
            }

            grabBody.classList.add(this.props.backgroundStyle)
           
        },300)
         
       
        let grabBox = document.querySelector(".box")
        let grabBody = document.querySelector("body")
        let grabh1 = document.querySelector('.h1class')
        let grabInput = document.querySelector("#city")
        let grabSearchButton = document.querySelector("#searchButton")
        
        

        // setting on nightmode   
       if(this.props.nightmode === "on" && !this.state.classNightmode) {

                if(grabBox) {
                    
                    grabBox.classList.add("nightBox")
                    grabh1.style.textShadow = "1px 1px 1px black"
                    grabh1.style.color = "rgba(230, 220, 220, 0.8)"

                    grabBody.classList.add("nightmode")
                    grabInput.classList.add('.nightcity')
                    grabSearchButton.style.backgroundColor = "rgb(70, 66, 66)"
                    grabSearchButton.style.color = "white"
                    grabInput.style.border = "1px solid black"
                   
                  this.setState({classNightmode: true})
                }

       } 
       
       //setting off nightmode
       else if ( this.props.nightmode === "off" && this.state.classNightmode){
           
           

            grabBox.classList.remove("nightBox")
            grabh1.classList.remove("nighth1")
            grabh1.style.color = "rgb(87, 178, 190)"
            grabBody.classList.remove("nightmode")
            grabInput.classList.remove('.nightcity')
            grabSearchButton.style.backgroundColor = "rgb(144, 218, 236)"
            grabSearchButton.style.color = "white"
            grabInput.style.border = "2px solid rgb(113, 216, 241)"
    
            this.setState({classNightmode: false})
       }
         

        if(this.props.temperature === "celsjusz") {
            temp="℃";
            Feelslike= "Feelslike Temp: "+ this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].feelslike_c + temp

            tempToday = this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].temp_c + temp
        } 
        else {

            temp="℉"
            Feelslike="Feelslike Temp: "+ this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].feelslike_f + temp

            tempToday = this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].temp_f + temp
        }


        if(this.props.windValue === "km") {
            per = "Wind: "+ this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].wind_kph+ " kp/h";
        } 
        else {
            per="Wind: "+ this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].wind_mph+ " mp/h";
        }


        // setting name of Day
        let date = new Date();
        let first = date.getDate(); 
    
        let day1 = new Date(date.setDate(first)).toUTCString();

    
        day1 = day1.slice(0,3)
        if(!this.state.actualDay) {
            this.setState({actualDay: day1})
        }
        
        
        return (
            <section className="box"  >

                <div className="todaySection" onClick={this.cos}>

                    <div className="today">
                        <div> {this.state.actualDay} </div>
                        <img src={this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].condition.icon} alt="" />
                        <div> {tempToday} </div>

                    </div>

                    <ul>
                        <li>{this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].condition.text}</li>
                        <li> {per}</li>
                        <li>{Feelslike} </li>
                        <li>Humidity: {this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].humidity} %</li>
                    </ul>

                    <div className="cityDisplayed">{this.props.location}</div>

                    <div className="buttons">
                        <button className="settings" onClick={() => this.props.openSettings()} > <AiOutlineSetting/> 
                        </button>

                        <button className="refresh" onClick={() => this.state.searchCity(this.props.city)}> <AiOutlineReload/>
                        </button>
                        <p>Last update: {this.state.today.forecast.forecastday[this.state.setDay].hour[this.state.actualHour].time}</p>
                    </div>

                    

                </div>

                <div className="chooseCategories">

                    <button onClick={ () => {
                        this.setState({generated: <Temperature temperature={this.state.today} day={this.state.setDay} tempValue={this.state.tempValue} key={0} />,
                        actualWebsite: "temperature"
                        })
                    }}>Temperature</button>

                    <button onClick={ () => {
                        this.setState({generated: <Wind temperature={this.state.today} day={this.state.setDay} windValue={this.props.windValue} key={1} />,
                        actualWebsite: "wind"
                        })
                    }}>Wind</button>

                    <button onClick={ () => {
                        this.setState({generated: <Rain temperature={this.state.today} day={this.state.setDay} key={2}  />,
                        actualWebsite: "rain"
                        })
                    }}>Rain</button>

                </div>

                <div className="categories">
                    {this.state.generated}
                </div>
   

                <div className="days"> 
                    {this.state.day}
                </div>
               
            </section>
        )

    }



}

export default Box