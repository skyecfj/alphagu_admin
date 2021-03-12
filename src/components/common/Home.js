import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../helpers/cookies';

export default class Home extends Component{
    render(){
        return(
            getCookie("alphaguUserName") ? <Redirect to="/app"/> : <Redirect to="/login"/>
        )
    }
}