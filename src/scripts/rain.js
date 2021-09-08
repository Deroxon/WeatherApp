import React from "react"
import "../styles/temperature.css"

class Rain extends React.Component {
    constructor() {
        super()
        this.state = {
            
        }
    }

    changeDailyTime(side) {

        if(side === 'prev') {
            this.setState( prevState => {
                return {
                    startHour: prevState.startHour -8,
                    endHour: prevState.endHour-8
                }
            })
        }
        else if (side === "next") {
            this.setState(prevState => {
                return {
                    startHour: prevState.startHour +8,
                    endHour: prevState.endHour +8
                }
            })
        }
    }

    componentDidMount() {
        let time = this.props.temperature.current.last_updated;
     
        let leng = time.length
        
        let actualHour = time.slice(leng-5, leng-3)
        actualHour = Number(actualHour)
        

        if(actualHour < 8) {
            this.setState({startHour: 0, endHour: 7})
        } 
        
        else if (actualHour > 7 && actualHour < 17) {
            this.setState({startHour: 8, endHour: 16})
        }

        else if (actualHour > 16 && actualHour < 24) {
            this.setState({startHour: 16, endHour: 23})
        }


    }


    render() {

        
            let shorter = this.props.temperature.forecast.forecastday[this.props.day]
            let kos = shorter.hour.slice(this.state.startHour, this.state.endHour)

           
            
            


            let mappedli = kos.map(item => {
                
                let rain = item.chance_of_rain +"%";
                let snow = item.chance_of_snow + "%";
                let time = item.time
                let leng = time.length;
                let summary = time.slice(leng-5, leng);

                let height = item.chance_of_rain+"%"

                

                
                return (
                    <ul>

                        <li>{summary}</li>

                        <div className="squares">
                            
                        
                            <li className="tool">

                                <span class="toolTipText">Chance of Rain is {rain}</span>

                                

                                    <div className="alphaSquare">
                                        <div className="square squareR" style={{height: height}}></div>
                                    </div>

                            

                                {rain}
                                
                            </li>

                            <li className="tool">
                            
                                <span class="toolTipText">Chance of Snow is {snow}</span>

                                <div className="alphaSquare">
                                        <div className="square squareS"></div>
                                </div>

                                {snow}
                            </li>
                            <li className="line"></li>
                        </div>

                        

                    </ul>
                )
                
            })

            let button1 = ''
            let button2 = ''

            if(this.state.startHour > 7) {
                button1 = <li><button className="butsL" onClick={ () => this.changeDailyTime('prev')}>{"<"}</button></li>
            } 
            else {
                button1 = '';
            }



            if (this.state.startHour < 16) {
                button2 = <li><button className="butsR" onClick={ () => this.changeDailyTime('next')}>{">"} </button></li>
            } 
            else {
                button2 = '';
            }

            return (
                <ul className="listed">
                    {button1}
                    {mappedli}
                    {button2}
                    
                </ul>
            )

    }


    

}


export default Rain