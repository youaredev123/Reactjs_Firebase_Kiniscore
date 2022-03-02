import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
