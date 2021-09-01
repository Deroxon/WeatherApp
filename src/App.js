import './App.css';
import React from "react"
import Box from "./scripts/box"


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      fetchedData: '',
      generatedWebsite: '',
    }
  }

  componentDidMount() {

  }
 


  searchCity() {

    let grabValue = document.querySelector("#city").value;

    fetch('http://api.weatherapi.com/v1/forecast.json?key=60264f8c99b942ea8d5111232211708&q='+grabValue+'&days=3&aqi=no&alerts=no', {
        
    })
    .then(res => res.json())
    .then(data => { console.log(data)
      this.setState({fetchedData: data})
    })


  }


    render() {

      console.log(this.state.fetchedData)
      let showIcon = ''
      if(this.state.fetchedData) {

          let backgroundStyle= ''
          let shortCutW = this.state.fetchedData.current.condition.text;
          
          
          if(shortCutW === ("Partly cloudy" || "overcast" ) ) {
            backgroundStyle= "cloud"
          }
          else if(shortCutW === ("Patchy rain possible") ) {
            backgroundStyle= "rain"
          }
          else if(shortCutW === "Patchy rain possible") {
            backgroundStyle= "storm"
          }
          else if(shortCutW === "Patchy rain possible") {
            backgroundStyle= "sunny"
          }

          

          showIcon = <Box today={this.state.fetchedData} backgroundStyle={backgroundStyle}/>


      } 
      else {
        showIcon= 'ELO'
      }
      

      return (
        <div className="App">

            <header>

                <h1>Enter a city Name and Search for actual Weather</h1>
              
            

                <input name="city" id="city" type="text" placeholder=" Just type" />

                <input type="button" id="searchButton" onClick={ () =>this.searchCity()} value="Search"  />

            </header>

            
            
            {showIcon}
                
            


        </div>
      )

    }
  
}

export default App;
