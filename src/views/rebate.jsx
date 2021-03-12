import React, { Component } from 'react';
import ip from '@model/tempIp';

class Rebate extends Component{

    componentDidMount() {
        this.getIframe();
    }

    getIframe(){
        var ifr = document.createElement('iframe');
        ifr.height = ip.iframe_height;
        ifr.width = ip.iframe_width;
        ifr.name = ip.iframe_name;
        ifr.id = ip.iframe_id;
        var url = 'rebate.html';
        ifr.src = ip.iframe_ip + url;
        document.getElementsByClassName('content-iframe')[0].appendChild(ifr);
    }

    render() {
        return (
            <div className="content-iframe"></div>
        )
    }
}

export default Rebate