import './App.css';
import React from "react"
import Box from "./scripts/box"




class App extends React.Component {

  constructor() {
    super()
    this.state = {
      fetchedData: '',
      generatedWebsite: '',
      alert: '',
      city: '',
      settings: false,
      windValue: "km",
      temperature: "celsjusz",
      nightmode: "off",
    }
    this.searchCity = this.searchCity.bind(this)
    this.openSettings = this.openSettings.bind(this)
  }
 

  

  componentDidUpdate(prevState,prevProps) {
    if(prevState.temperature !== this.state.temperature) {
      this.render()
    }
    if(prevState.windValue !== this.state.windValue) {
      this.render()
    } 
    if(prevState.nighmode !== this.state.nightmode) {
      this.render()
    }
  }

  alert(bool) {

    let alertDiv =''

    if(bool) {
      alertDiv = <div className="alert">There is no city named that in our base</div>
    }
    else {
      alertDiv = ''
    }
      
     


  

    this.setState({alert: alertDiv})


  }

  searchCity(param) {

    let grabValue = document.querySelector("#city").value;
    this.setState({city: grabValue})
    let grabField = document.querySelector('#city')
    grabField.focus()
    grabField.select()

    if(param) {
      grabValue = param;
    }
    grabValue = grabValue.toLowerCase()


    fetch('http://api.weatherapi.com/v1/forecast.json?key=60264f8c99b942ea8d5111232211708&q='+grabValue+'&days=3&aqi=no&alerts=no', {
        
     
    })
    .then(res => {
      if(res) {
        res = res.json()
        return res
      } 
      else {
        throw new Error("Something went wrong");
      }
      
    }) 
    .then(data => { 
      
      if(data.hasOwnProperty("error")) {
        this.alert(true)
      } else {
        this.setState({fetchedData: data})
        this.alert(false)
      }

      
     
    })
    .catch((error) => {
      console.log(error)
    })


  }

  toggler(param) {
    

    if(param === ("celsjusz" || "fahrenheit") ) {
      
      if(this.state.temperature === "celsjusz") {
        this.setState({temperature: "fahrenheit"})
        
        
      } else if(this.state.temperature === "fahrenheit"){
        this.setState({temperature: "celsjusz"})
      }

    }
    else if (param === "night") {

      if(this.state.nightmode ==="on") {
        this.setState({nightmode: "off"})
      }
      else if (this.state.nightmode === "off") {
        this.setState({nightmode: "on"})
      }
    }

    else {

      if(this.state.windValue === "km") {
        this.setState({windValue: "mi"})
      } else if (this.state.windValue === "mi") {
        this.setState({windValue: "km"})
      }

    }

  

  }

  openSettings() {
    this.setState(prevState => ({
      settings: !prevState.settings
    }) )
  }


    render() {

      let settings = ''
    
      if(this.state.settings) {
        settings = 
        <div className="boxSettings">
          <div className="Settings">
            <button className="exit" onClick={ () => this.openSettings()}>X</button>
            <ul>
              <li> 
                
                  <p className="kilo">Kilometrs per hour </p>
                  
                  <p className="mile">Miles per hour</p> 
  
                    <label className ="switch">
                      
                      <input className="windCheck" type="checkbox" onClick={() => this.toggler("wind")} />
                      <span className="slider"></span>

                    </label>

              </li>

              <li>
                  <p className="cels">Celsius ℃ </p>
                  
                  <p className="fahr"> Fahrenheit ℉</p> 


                    
                    <label className ="switch">

                      <input className="TempCheck"  type="checkbox" onClick={() => this.toggler("celsjusz")}/>
                      <span className="slider"></span>

                    </label> 
              </li>


              <li> 
                
                  <p className="nightOff">Night mode off </p>
                  
                  <p className="nightOn">Night mode on</p> 
  
                    <label className ="switch">
                      
                      <input className="nightmod" type="checkbox" onClick={() => this.toggler("night")} />
                      <span className="slider"></span>

                    </label>

              </li>

            </ul>
          </div>

      </div>
      }
      

    


      if(this.state.settings) {
        

        let colorWind = document.querySelector('.kilo');
        let colorWind2 = document.querySelector('.mile')

        let colorTemp = document.querySelector('.cels');
        let colorTemp2 = document.querySelector('.fahr');

        let nightOff = document.querySelector('.nightOff')
        let nightOn = document.querySelector('.nightOn')


        if(colorWind, colorWind2, colorTemp, colorTemp2, nightOff, nightOn) {


        // Night mode
          if(this.state.nightmode === "on") {
            nightOn.style.color = "#87CEEB"
            nightOn.style.textShadow = "0.5px 0.5px 0.5px black"
            nightOff.style.color = "gray"
          } else if (this.state.nightmode === "off") {
            nightOff.style.color = "#87CEEB"
            nightOff.style.textShadow = "0.5px 0.5px 0.5px black"
            nightOn.style.color = "gray"
          }
        
  
          if(this.state.windValue === "km") {
            colorWind.style.color = "#87CEEB"
            colorWind.style.textShadow = "0.5px 0.5px 0.5px black"
            colorWind2.style.color = "gray"
          } else if (this.state.windValue === "mi") {
            document.querySelector('.windCheck').checked = true
            colorWind2.style.color = "#87CEEB"
            colorWind2.style.textShadow = "0.5px 0.5px 0.5px black"
            colorWind.style.color = "gray"
          }
  
          if(this.state.temperature === "celsjusz") {
            colorTemp.style.color = "#87CEEB"
            colorTemp.style.textShadow = "0.5px 0.5px 0.5px black"
            colorTemp2.style.color = "gray"
          } else if (this.state.temperature === "fahrenheit") {
            // setting colors and checked
            document.querySelector('.TempCheck').checked = true
            colorTemp2.style.color = "#87CEEB"
            colorTemp2.style.textShadow = "0.5px 0.5px 0.5px black"
            colorTemp.style.color = "gray"
          }

        }

       
      

      }

      

      let showIcon = ''

     

      if(this.state.fetchedData && !this.state.fetchedData.error) {

          let backgroundStyle= ''
          let shortCutW = this.state.fetchedData.current.condition.text;
          
          
          if(shortCutW === ("Partly cloudy" || "Overcast" || "Cloudy" ) ) {
            backgroundStyle= "cloud"
          }
          else if(shortCutW === ("Patchy rain possible" || "Light rain shower" || "Moderate or heavy rain shower" || "Moderate rain")  ) {
            backgroundStyle= "rain"
          }
          else if(shortCutW === ("Thundery outbreaks possible" || "Patchy light rain with thunder" ) ) {
            backgroundStyle= "storm"
          }
          else if(shortCutW === "Sunny") {
            backgroundStyle= "sunny"
          }
          else if (shortCutW === ("Light snow" || "snow")) {
            backgroundStyle = "snow"
          }
          else {
            backgroundStyle= "cloud"
          }
         
          
          

          showIcon = <Box 
          today={this.state.fetchedData} 
          backgroundStyle={backgroundStyle} 
          location={this.state.fetchedData.location.name} 
          city={this.state.city} 
          searchCity={this.searchCity}  
          openSettings={this.openSettings}
          temperature={this.state.temperature}
          windValue={this.state.windValue}
          nightmode={this.state.nightmode}
          setDay={0}
          />

          if(!this.state.settings) {
            settings = ''
          }


      } 
      else {
        showIcon= ''
      }
      

      // enter to submit
      let handleKeyPress = '';
      handleKeyPress = (event) => {
          if(event.key === "Enter") {
            let grabValue = document.querySelector('#city').value
            this.searchCity(grabValue)
          }
      }

      return (
        <div className="App">

            <header>

                <h1 className="h1class">Enter a city Name and Search for actual Weather</h1>
              
            

                <input name="city" id="city" type="text" placeholder=" Just type" onKeyPress= { (e) => handleKeyPress(e)} />

                {this.state.alert}

                <input type="button" id="searchButton" onClick={ () =>this.searchCity()} value="Search"  />
                

            </header>

            
            
            {showIcon}
            {settings}
                
            


        </div>
      )

    }
  
}

export default App;
