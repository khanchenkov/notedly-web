import React from 'react';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    gql
} from '@apollo/client';
import {setContext} from 'apollo-link-context';

import GlobalStyle from './GlobalStyle';
import Pages from "../pages/";

const uri = process.env.REACT_APP_API_URI;
const httpLink = createHttpLink({uri});
const cache = new InMemoryCache();

const authLink = setContext((_, {headers}) => {
   return {
       headers: {
           ...headers,
           authorization: localStorage.getItem('token') ?? ''
       }
   }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

const authData = {
    isLoggedIn: !!localStorage.getItem('token')
};

const isAuthQuery = {
    query: gql`
        query getAuthState {
            isLoggedIn
        }
    `,
    data: authData
};

cache.writeQuery(isAuthQuery);


client.onResetStore(() => cache.writeQuery(isAuthQuery));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages />
        </ApolloProvider>
    );
};

export default App;