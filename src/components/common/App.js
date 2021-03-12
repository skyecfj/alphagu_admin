import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import '@/App.css';
import { HashRouter as Router, Redirect, withRouter } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Layout } from 'antd';
import LeftMenu from '../leftMenu/leftMenu';
import RouteContent from '../index/routeContent';
import UpdatePwdForm from '../form/updatePwdForm';
import '@styles/less/home.less';
import { getCookie } from '../../helpers/cookies';
import ResetPwd from '../../stores/ResetPwd';

const { Header, Footer, Content } = Layout;

class App extends Component{
    render() {
        const layoutStyle = {maxWidth: '87%'};
        return getCookie("alphaguUserName") ? (
            <ConfigProvider locale={zhCN}>
                <Provider>
                    <Router>
                        <Layout>
                            <LeftMenu resetPwd={ResetPwd}/>
                            <Layout style={layoutStyle}>
                                {/* <Header className='header-title'>Header</Header> */}
                                <Content className='content'>
                                    <RouteContent/>
                                    <UpdatePwdForm resetPwd={ResetPwd}/>
                                </Content>
                                {/* <Footer style={{textAlign: 'center'}}>AlphaGu ©2020 Created by zhiyu</Footer> */}
                            </Layout>
                        </Layout>
                    </Router>
                </Provider>
            </ConfigProvider>
        ) : <Redirect to={{ pathname: "/noPage" }} />
    }
}

export default withRouter(App);