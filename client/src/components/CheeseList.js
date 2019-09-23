import React from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getCheesesQuery = gql`
  {
    cheeses {
      name
      milk
      id
    }
  }
`

function BookList(props) {
  console.log(props)
  return (
    <div>
      <ul id="cheese-list">
        {displayCheeses(props)}
      </ul>
    </div>
  );
}

function displayCheeses(props){
  let data = props.data;
  
  if (data.loading) {
    return (
      <div>
        Loading cheeses...
      </div>
    );
  } else {
    return data.cheeses.map(cheese => {
      return(
        <li key={cheese.id}>
          name: {cheese.name}
        </li>
      );
    })
  }
}

export default graphql(getCheesesQuery)(BookList);