import React from 'react';
import { Route, Switch } from 'react-router';

// Import modules/routes
import About from './about';
import PageNotFound from './common/components/PageNotFound';

export default (
  <Switch>

    <Route path="/" component={About}/>
    <Route path="*" component={PageNotFound} />

  </Switch>
);