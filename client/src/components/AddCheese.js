import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getProducersQuery = gql`
  {
    producers {
      name
      id
    }
  }
`

function addCheese(props) {
  return (
    <form id="add cheese">
      <div className="field">
        <label>Cheese name:</label>
        <input type="text"/>
      </div>

      <div className="field">
        <label>Milk:</label>
        <input type="text"/>
      </div>

      <div className="field">
        <label>Producer:</label>
        <select>
          <option>Select producer</option>
          {displayProducers(props)}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

function displayProducers(props){

  let data = props.data;
  
  if (data.loading) {
    return (
      <option disabled>
        Loading producers...
      </option>
    );
  } else {
    return data.producers.map(producer => {
      return(
        <option key={producer.id} value={producer.id}>
          {producer.name}
        </option>
      );
    })
  }
}

export default graphql(getProducersQuery)(addCheese);