import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import CheeseList from "./components/CheeseList"
import AddCheese from "./components/AddCheese"

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
      <h1>Amazing Cheeses List!!!</h1>
      <CheeseList/>
      <AddCheese/>
      </div>
    </ApolloProvider>
  );
}

export default App;
