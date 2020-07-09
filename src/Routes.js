import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Home from './pages/Home'
import UserPrivateRoutes from './UserPrivateRoutes'
import UserLogin from './pages/User/Auth/Login'
import UserRegister from './pages/User/Auth/Register'

import {Gaurd} from './Gaurd'


const Routes = (props) => {
    console.log(props)
    return (
        <Switch>
        <Route  exact path="/" render={ props=>(
       <Redirect to={{pathname: '/home'}} />
         )} />
          <Route path="/home" component={Home} />
          <Route path="/user/login" component={UserLogin} />
          <Route path="/user/register" component={UserRegister} />
          <Gaurd  path="/user" token='user-token' routeRedirect='/user/login' component={UserPrivateRoutes} /> 

          </Switch>
    );
}

export default Routes;
