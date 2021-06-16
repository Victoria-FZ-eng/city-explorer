'use strict';


import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'


class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state={
            weatherData:[],
            msg: '',
            


        }

    }
    getWeather = async () =>{
        let dataLink = `https://city-explorer-vz.herokuapp.com/cityData?cityName=${this.props.city}`;
        console.log("inside city weather function");
        try{
          let data = await axios.get(dataLink);
          console.log(typeof data.data);
          this.setState({
            weatherData: data.data,
            
          })
          console.log(this.state.weatherData);
    
        }
        catch{
          this.setState({
            displayMsg:true,
            msg:'ERROR : NOT FOUND',
          })
         
        }
      }

      displaying=()=>{

      }



    render(){
        return(

           <div>
               { this.props.show && <Button  variant="secondary" size="lg" onClick={this.getWeather}  class="btn">
            Show Weather
                </Button> }
                
             
                <ListGroup>
            
                {this.state.weatherData.map((item)=>
                   <ListGroup.Item variant="warning"> {item.date}  {item.description}  </ListGroup.Item>
                )}
                </ListGroup> 

                        
           </div>
        )
    }
}

export default Weather;