import React, { Component } from 'react';
import img404 from '../../styles/img/404.png';

export default class NoMatch extends Component{
    render(){
        const imgStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }
        return(
            <div style={imgStyle} height="100%">
                <img src={img404} alt="404 Not Found"/>
            </div>
        )
    }
}