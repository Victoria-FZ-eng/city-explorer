

import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Weather from './components/Weather.js';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';




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
    // axios 
    //   .get(link).then(
    //     this.setState({
    //       showCard: true,
    //       movieArr: link.data,
          
    //     })
    //     )
     
    //   . catch( err=>{
    //     this.setState({
    //       movieErr:"NO MOVIES FOUND",
    //       displaymr: true,
    //     })
    //    })

    //    console.log(link.data);


       
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
        
        {this.state.showCard && 
       (this.state.movieArr).map((movie)=>(
          <CardGroup >
          <Card >
             <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt="Poster" />
             <Card.Body>
                  <Card.Title>{movie.name}</Card.Title>
                  <Card.Text>
                    {movie.description}
                  </Card.Text>
             </Card.Body>
             <ListGroup className="list-group-flush">
               <ListGroup.Item>Release-Date: {movie.date}</ListGroup.Item>
               <ListGroup.Item>Popularity: {movie.pop}</ListGroup.Item>   
             </ListGroup>
          </Card>
        </CardGroup>
        ))}
        
        { this.state.displaymr &&
        <Alert variant='secondary'>
        {this.state.movieErr}
        </Alert>
        }
      </div>
    )
  }
}

export default App;
