import React, { Component } from 'react';
import noPage from '../../styles/img/no_page.png';
import loading from '../../styles/img/loading.gif';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../helpers/cookies';

export default class NoMatch extends Component{
    constructor() {
        super();
        this.state = {
            point: 6,
            visible: false
        }
    }
    componentDidMount(){
        let timer = setInterval(() => {
            this.setState((preState) => ({
                point: preState.point - 1,
            }),() => {
                if(this.state.point === 0){
                    clearInterval(timer);
                    this.props.history.push({pathname:'/'});
                }else if(this.state.point === 2){
                    this.setState({visible:true})
                }
            })
        },1000)
    }
    render(){
        const imgStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        };
        const jmpStyle = {
            padding: '20px',
            position: 'absolute',
            top: 0,
            left: 0,
            fontWeight: 'bolder',
            fontSize: '20px',
            display: 'block'
        };
        const spanStyle = {
            color: 'red'
        };
        return getCookie("alphaguUserName") ? (<Redirect to="/app"/>) :
            (<div style={imgStyle} height="100%">
                <div style={jmpStyle}>还有 <span style={spanStyle}>{this.state.point}</span> 秒跳转至登录页......</div>
                {this.state.visible ? (<img src={loading} />) : (<img src={noPage} alt="No Page"/>)}
            </div>)
    }
}