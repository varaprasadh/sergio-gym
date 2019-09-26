// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router,Switch, Route,Link} from "react-router-dom";
import type { Store } from '../reducers/types';
import App from "./App";
import routes from "../constants/routes";
import {ToastContainer} from "react-toastify";
import LoginScreen from "../screens/LoginScreen";

import Initializer from "../screens/Initializer";
import AdminDashboard from "../screens/AdminDashboard";
import CustomerDashboard from "../screens/CustomerDashboard";


type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
         <App>
          <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />  
            {/* <LoginScreen/>   */}
            {/* <Initializer/>   */}
            {/* <AdminDashboard/> */}
            <CustomerDashboard/> 
            {/* <Router path={routes.LOGIN}>  
        
                 <Switch path={routes.LOGIN}>
                     <Route path={routes.LOGIN} exact component={LoginScreen} />
                    <Route component={LoginScreen} />
                    <Route component={Initializer} />
                 </Switch>
               
            </Router> */}

         </App>
      </Provider>
    );
  }
}
