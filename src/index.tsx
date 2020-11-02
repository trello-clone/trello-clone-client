import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ThemeProvider } from 'styled-components';

import { DialogProvider } from './contexts/DialogContext';
import { myTheme } from './theme';
import GlobalFonts from './fonts/fonts';
import App from './App';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : 'https://tqkn-trello-clone-server.herokuapp.com/api',
});

const cleanTypeName = new ApolloLink((operation, forward) => {
    if (operation.variables) {
        const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);
        operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward(operation).map((data) => {
        return data;
    });
});

const client = new ApolloClient({
    link: from([cleanTypeName, httpLink]),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider theme={myTheme}>
                <GlobalFonts />
                <DialogProvider>
                    <App />
                </DialogProvider>
            </ThemeProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
