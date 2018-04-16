import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import client from './client';
import 'semantic-ui-css/semantic.min.css';
import './index.less';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
