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
        <li>
          Cheese name
        </li>
      </ul>
    </div>
  );
}

export default graphql(getCheesesQuery)(BookList);