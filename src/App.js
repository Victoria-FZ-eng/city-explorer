import React from 'react';
import axios from 'axios';

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
        msg:'ERROR',
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
        <form onSubmit={this.getMap}>
          <input type='text' placeholder='Type the location' name='location' ></input>
          <input type='submit' value='Explore'></input>
        </form>

        <p>{this.state.locationData.display_name}</p>
        {this.state.showMap && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d4d8710c42b8bcdc64be1378a880880b&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt={`Map for ${this.state.display_name}`}/>}
        { this.state.displayMsg && this.state.msg}

      </div>
    )
  }
}

export default App;
