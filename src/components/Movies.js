import React from 'react';


import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

class Movies extends React.Component{
    
    
    render(){
        return(
           
            <div>
               {this.props.show && (this.props.arr).map((movie)=>(
          <CardGroup className="elem">
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
        
        { this.props.display &&
        <Alert variant='secondary'>
        {this.props.err}
        </Alert>
        }
            </div>
        )
    }
}

export default Movies;