import React from "react"

class Wind extends React.Component {

    constructor() {
        super()
        this.state ={ 
            bool: true,
            startHour: '',
            endHour: '',
            opac: 0
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
        //console.log("ELOOOO")
        //console.log(time)
        let leng = time.length
        
        let actualHour = time.slice(leng-5, leng-3)
        actualHour = Number(actualHour)
        //console.log(actualHour)
        //console.log(typeof(actualHour))

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

            
            //console.log('kossed')
            //console.log(kos)
            //console.log(this.props.temperature)

            let mappedli = kos.map(item => {
                
                let wind  = ''

                let time = item.time
                let leng = time.length;
                let summary = time.slice(leng-5, leng);

                

                if(this.props.windValue === "km") {
                    wind = item.wind_kph + " km/h"
                } else {
                    wind = item.wind_mph + " mp/h"
                }

                return (
                    <ul>
                        <li>{summary}</li>
                        <li><img src={item.condition.icon} alt="" /> </li>
                        <li>{wind}</li>
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




export default Wind