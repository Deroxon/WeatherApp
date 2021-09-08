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
            Table: []
        }
    }


    componentDidMount() {
        this.setState({generated: <Temperature temperature={this.state.today} day={0} tempValue={this.state.tempValue}/>})
    }

    componentDidUpdate(prevProps, prevState) {
       
        if(prevProps.today !== this.props.today) {
            //console.error("change")
            //console.log(this.state.today)
            this.setState({generated: <Temperature temperature={this.props.today} day={0} tempValue={this.state.tempValue}/>,
            today: this.props.today
            })
        }
        
        
    }




    render() {
        

        let date = new Date();
        let first = date.getDate() - date.getDate(); // first day
        let second = first + 1;
        let third = second + 1;

        let day1 = new Date(date.setDate(first)).toUTCString();
        let day2 = new Date(date.setDate(second)).toUTCString();
        let day3 = new Date(date.setDate(third)).toUTCString();
        
        day1 = day1.slice(0,3)
        day2 = day2.slice(0,3)
        day3 = day3.slice(0,3)
       
        let arrOfDays = [day1,day2,day3];
        
        
        //console.error("UWAGA TUTAJ Patrz")
        //console.log(this.props)
       
        let mappedList = this.props.today.forecast.forecastday.map(item => <Day item={item} tempValue={this.state.tempValue} key={item.day.totalprecip_in} arrOfDays={arrOfDays} key={item.hour.time_epoch}  /> );

        //console.error("MAPed List")
        //console.log(mappedList)

       

         let temp = "";
         let Feelslike = "";
         let per = "";


         setTimeout( () => {
            let grabBody = document.querySelector('body')
            grabBody.classList.add(this.props.backgroundStyle)
        },300)
         
       
        let grabBox = document.querySelector(".box")
        let grabBody = document.querySelector("body")
        let grabh1 = document.querySelector('.h1class')
        let grabInput = document.querySelector("#city")
        let grabSearchButton = document.querySelector("#searchButton")
        console.log(grabBox)
        

        // setting on nightmode   
       if(this.props.nightmode === "on" && !this.state.classNightmode) {

                if(grabBox) {
                    console.log("Adding classes")
                    grabBox.classList.add("nightBox")
                    grabh1.classList.add("nighth1")
                    grabBody.classList.add("nightmode")
                    grabInput.classList.add('.nightcity')
                    grabSearchButton.style.backgroundColor = "rgb(70, 66, 66)"
                    grabSearchButton.style.color = "white"
                    grabInput.style.border = "1px solid black"
                   
                  this.setState({classNightmode: true})
                }

       } 
       
       //setting off nightmode
       else if ( this.props.nightmode === "off" && !this.state.classNightmode){
           
       
           
          
           let checked2 = grabBox.classList.contains("nighth1")
           let checked3 = grabBox.classList.contains("nightmode")
           let checked4 = grabBox.classList.contains("nightcity")

           if( checked2, checked3, checked4 ) {

            grabBox.classList.remove("nightBox")
            grabh1.classList.remove("nighth1")
            grabh1.style.color = "rgb(87, 178, 190)"
            grabBody.classList.remove("nightmode")
            grabInput.classList.remove('.nightcity')
            grabSearchButton.style.backgroundColor = "rgb(43, 94, 197)"
            grabSearchButton.style.color = "rgb(87, 178, 190)"
            grabInput.style.border = "2px solid rgb(113, 216, 241)"
    
            this.setState({classNightmode: false})

           }

       
        
       }
       console.log("propsy")
       console.log(this.props.nightmode)
       console.log("state")
       console.log(this.state.classNightmode)
         

        if(this.props.temperature === "celsjusz") {
            temp="℃";
            Feelslike= "Feels like: "+ this.state.today.current.feelslike_c + temp
        } 
        else {
            temp="℉"
            Feelslike="Feels like: "+ this.state.today.current.feelslike_f + temp
        }


        if(this.props.windValue === "km") {
            per = "Wind: "+ this.state.today.current.wind_kph+ " kp/h";
        } 
        else {
            per="Wind: "+ this.state.today.current.wind_mph+ " mp/h";
        }
        


        return (
            <section className="box"  >

                <div className="todaySection" onClick={this.cos}>

                    <div className="today">
                        <div> Wednesday </div>
                        <img src={this.state.today.current.condition.icon} alt="" />
                        <div> {this.state.today.current.temp_c}{temp} </div>

                    </div>

                    <ul>
                        <li>{this.state.today.current.condition.text}</li>
                        <li> {per}</li>
                        <li>{Feelslike} </li>
                        <li>Humidity: {this.state.today.current.humidity} %</li>
                    </ul>

                    <div className="cityDisplayed">{this.props.location}</div>

                    <div className="buttons">
                        <button className="settings" onClick={() => this.props.openSettings()} > <AiOutlineSetting/> 
                        </button>

                        <button className="refresh" onClick={() => this.state.searchCity(this.props.city)}> <AiOutlineReload/>
                        </button>
                        <p>Last update: {this.state.today.current.last_updated}</p>
                    </div>

                    

                </div>

                <div className="chooseCategories">

                    <button onClick={ () => {
                        this.setState({generated: <Temperature temperature={this.state.today} day={0} tempValue={this.state.tempValue} key={0} />})
                    }}>Temperature</button>

                    <button onClick={ () => {
                        this.setState({generated: <Wind temperature={this.state.today} day={0} windValue={this.props.windValue} key={1} />})
                    }}>Wind</button>

                    <button onClick={ () => {
                        this.setState({generated: <Rain temperature={this.state.today} day={0} key={2}  />})
                    }}>Rain</button>

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