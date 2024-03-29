import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import Home from '../pages/home';

const Routes = () => (
  <Switch>
    <Route path="/" element={<Home />} />
  </Switch>
);

export default Routes;
