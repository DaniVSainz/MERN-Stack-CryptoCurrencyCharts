import React, { Component } from 'react';
import 'rxjs';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// routes
import routes from './routes';

// common components
import Header from './common/components/Header'
import Footer from './common/components/Footer'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Header />
            <div className="wrap">
              {routes}
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
