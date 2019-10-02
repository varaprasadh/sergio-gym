import React from 'react';
import { Switch, Route } from 'react-router';
import routes from "../constants/routes";
import App from "./App";

import LoginScreen from "../screens/LoginScreen";
 
import Initializer from "../screens/Initializer";
import AdminDashboard from "../screens/AdminDashboard";
import CustomerDashboard from "../screens/CustomerDashboard";

export default () => (
  <App>
    <Switch>
        <Route path={routes.LOGIN} exact component={LoginScreen}/>
        <Route path={routes.USER_HOME} exact component={CustomerDashboard}/>
        <Route path={routes.ADMIN_HOME} exact component={AdminDashboard}/>
        {/* <Route component={Initializer}/> */}
    </Switch>
  </App>
);
                 