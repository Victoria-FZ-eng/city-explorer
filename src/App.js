import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Weather from './components/Weather.js';



class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      locationData: '',
      msg: ' ',
      showMap: false,
      displayMsg : false,
      searchQuery:'',
      lonlat:'',
      showWeather: false,
     
    }
    
  }

  getMap=async(event)=>{
    event.preventDefault();
    let searchLocation = event.target.location.value;
    let locationLink = `https://api.locationiq.com/v1/autocomplete.php?key=pk.d4d8710c42b8bcdc64be1378a880880b&q=${searchLocation}`;
    try{
      let renderResult = await axios.get(locationLink);
      console.log(renderResult.data[0]);
      this.setState({
        locationData : renderResult.data[0],
        showMap: true,
        searchQuery: searchLocation,
      })
      this.getWeatherData();
      console.log(this.state.searchQuery);
    }
    catch{
      this.setState({
        displayMsg : true,
        msg:'ERROR : Unable to geocode',
      })
    }
    
  }
 
  getWeatherData = async () =>{
    let dataLink = `https://city-explorer-vz.herokuapp.com/searchCity?cityName=${this.state.searchQuery}`;
    // console.log("inside function");
    try{
      let render = await axios.get(dataLink);
      this.setState({
        lonlat: render.data,
       showWeather: true,
      })
      // console.log(this.lonlat);

    }
    catch{
      this.setState({
        displayMsg:true,
        msg:'ERROR : NOT FOUND',
      })
     
    }
  }

  render(){
    return (
      <div className="div">
        <h1 className="elem">City Explorer</h1>
        <Form onSubmit={this.getMap} className="elem">
          <Form.Control size="lg" type="text" placeholder="Type the location" name='location' required/>
          <Button  variant="secondary" size="lg" type='submit' className="btn">
            Explore
          </Button>
          </Form>
        <h3 className="elem">{this.state.locationData.display_name}</h3>
        
        {this.state.showMap && <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.d4d8710c42b8bcdc64be1378a880880b&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt={`Map for ${this.state.display_name}`} roundedCircle  />}
       
        { this.state.displayMsg &&  
        <Alert variant='secondary'>
        {this.state.msg}
        </Alert>  }
        <p className="elem">{this.state.lonlat}</p>

       
        <Weather show={this.state.showWeather} city={this.state.searchQuery}  className="elem"/>

      </div>
    )
  }
}

export default App;
