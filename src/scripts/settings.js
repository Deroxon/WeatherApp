import React from "react"

class Settings extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className="boxSettings">
          <div className="Settings">
            <button className="exit" onClick={ () => this.props.openSettings()}>X</button>
            <ul>
              <li> 
                
                  <p className="kilo">Kilometrs per hour </p>
                  
                  <p className="mile">Miles per hour</p> 
  
                    <label className ="switch">
                      
                      <input className="windCheck" type="checkbox" onClick={() => this.props.toggler("wind")} />
                      <span className="slider"></span>

                    </label>

              </li>

              <li>
                  <p className="cels">Celsius ℃ </p>
                  
                  <p className="fahr"> Fahrenheit ℉</p> 


                    
                    <label className ="switch">

                      <input className="TempCheck"  type="checkbox" onClick={() => this.props.toggler("celsjusz")}/>
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
        )
    }

}

export default Settings