import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      locationData: '',
      msg: ' ',
      showMap: false,
      displayMsg : false,
      searchQuery:'',

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
      })
    }
    catch{
      this.setState({
        displayMsg : true,
        msg:'ERROR : Unable to geocode',
      })


    }

  }
  // updateLocation=(event)=>{
  //   event.preventDefault();
  //   // this.setState({
  //   //   searchQuery:event.target.value,
  //   // })
  //   this.getMap();

  // }
  render(){
    return (
      <div>
        <h1>City Explorer</h1>
        <Form onSubmit={this.getMap}>
          <Form.Control size="lg" type="text" placeholder="Type the location" name='location' />
          <Button  variant="secondary" size="lg" type='submit'>
            Explore
          </Button>
          </Form>
        
        
       

        <h3>{this.state.locationData.display_name}</h3>
        
        {this.state.showMap && <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.d4d8710c42b8bcdc64be1378a880880b&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt={`Map for ${this.state.display_name}`} roundedCircle  />}
       
        { this.state.displayMsg &&  
        <Alert variant='secondary'>
        {this.state.msg}
        </Alert>  }

      </div>
    )
  }
}

export default App;
