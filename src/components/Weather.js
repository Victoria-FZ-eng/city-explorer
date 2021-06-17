import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';


class Weather extends React.Component{
    constructor(props){
        super(props);
        this.state={
            weatherData:[],
            displayMsg: false,
            showList:false
      }
    }
    getWeather = async (event) =>{
        event.preventDefault();
        let dataLink = `https://city-explorer-vz.herokuapp.com/cityData?cityName=${this.props.city}`;
        try{
          let data = await axios.get(dataLink);
          this.setState({
            weatherData: data.data,
            showList:true,
          })
        }
        catch{
            console.log("nodata");
          this.setState({
            displayMsg:true,
            
          })
         
        }
      }

    render(){
        return(

           <div>
               { this.props.show && <Button  variant="secondary" size="lg" onClick={this.getWeather}  className="btn">
            Show Weather
                </Button> }


            { this.state.showList &&  (typeof this.state.weatherData == 'string')? <p>{this.state.weatherData}</p> : <ListGroup>
            
            {this.state.weatherData.map((item)=>
               <ListGroup.Item variant="warning"> {item.date}  {item.description}  </ListGroup.Item>
            )}
            </ListGroup>  }

                { this.state.displayMsg && <Alert variant='secondary' >
                  Error: DATA NOT FOUND
                     </Alert> }
           </div>
        )
    }
}

export default Weather;