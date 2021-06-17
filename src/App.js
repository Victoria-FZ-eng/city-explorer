import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Weather from './components/Weather.js';
import Movie from './components/Movies.js';

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
      showCard : false,
      movieArr:[],
      movieErr: '',
      displaymr:false,
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
      this.getMovies();
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
    try{
      let render = await axios.get(dataLink);
      this.setState({
        lonlat: render.data,
       showWeather: true,
      })
    }
    catch{
      this.setState({
        displayMsg:true,
        msg:'ERROR : NOT FOUND',
      })
    }
  }

  getMovies = async() => {
    const link = `https://city-explorer-vz.herokuapp.com/movies?location=${this.state.searchQuery}`;
    console.log("movies");
    console.log(link);

    try{
      let movieData = await axios.get(link);
      console.log(movieData.data);
      this.setState({
              showCard: true,
              movieArr: movieData.data,
            })
    }
    catch{
      this.setState({
              movieErr:"NO MOVIES FOUND",
              displaymr: true,
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

        <Movie show={this.state.showCard} arr={this.state.movieArr} display={this.state.displaymr} err={this.state.movieErr}/>
     
      </div>
    )
  }
}

export default App;
