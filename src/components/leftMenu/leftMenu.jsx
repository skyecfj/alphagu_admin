import React, { Component } from 'react';
import '@styles/less/leftMenu.less';
import { Layout, Menu, Icon, Button, message } from 'antd';
const { Sider } = Layout;
import { Scrollbars } from 'react-custom-scrollbars';
const SubMenu = Menu.SubMenu;
import { Link, withRouter } from 'react-router-dom';
import ip from '@model/login';
import { removeCookie, getCookie } from "../../helpers/cookies";

class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: ['/usermanage'],
            selectedKeys: ['/usermanage'],
            menus: [],
            tyUserStyle: 'block'
        }
    }

    componentDidMount() {
        let pathname = this.props.location.pathname.replace('/app','');
        let isTyUser = '';
        getCookie('alphaguUserType') === '3' ? isTyUser = 'none' : isTyUser = 'block';
        this.setState({
            openKeys: ['/'+pathname.split('/')[1]],
            selectedKeys: [pathname],
            tyUserStyle: isTyUser
        });
        // 获得菜单并修改部分子菜单的字段名
        let menus = this.formatMenu(window.sessionStorage.getItem('menu'));
        this.setState({menus:menus});
    }

    formatMenu(val){
        let menu = JSON.parse(val);
        menu.forEach((item,index) => {
            if(item.menuName === '策略监控'){
                let menuSub1 = [];
                item.childList.forEach((item1,index1) => {
                    let child1 = {
                        menuId:Number('1'+index1),
                        menuName: item1.modelDisplayName,
                        menuUrl: '/'+item1.modelName,
                        name: item1.modelName,
                        class: 'strategy-monitor-tab',
                        href: '#strategy-monitor',
                        dataId: item1.id,
                        dataType: item1.strategyTypeId
                    }
                    menuSub1.push(child1)
                })
                // 策略监控
                Object.assign(menu[index], { childList: menuSub1 })
            }else if(item.menuName === '策略分析'){
                let menuSub2 = [];
                item.childList.forEach((item2,index2) => {
                    let child2 = {
                        menuId:Number('2'+index2),
                        menuName: item2.modelDisplayName,
                        menuUrl: '/'+item2.modelName,
                        name: item2.modelName,
                        class: 'strategy-tab',
                        href: '#strategy-analysis',
                        dataId: item2.id,
                        dataType: item2.strategyTypeId
                    }
                    menuSub2.push(child2)
                })
                // 策略分析
                Object.assign(menu[index], { childList: menuSub2 })
            }else if(item.menuName === '短信管理'){
                let menuSub3 = [{
                    menuId:150,
                    menuName:'短信列表',
                    menuUrl: '/sms-manager',
                    class: 'smslist-tab',
                    href: '#sms-manager'
                },
                {
                    menuId:151,
                    menuName:'模板管理',
                    menuUrl: '/sms-template',
                    class: 'tempmanager-tab',
                    href: '#sms-template'
                },
                {
                    menuId:152,
                    menuName:'新增短信',
                    menuUrl: '/sms-add',
                    class: 'addsms-tab',
                    href: '#sms-add'
                }];
                // 策略分析
                Object.assign(menu[index], { childList: menuSub3 })
            }
        })
        return menu;
    }

    getMenus(item) {
        let chip = item.split('/');
        let selectMenu = '';
        if(chip.length === 2){
            for(let i=0;i<this.state.menus.length;i++){
                if(('/'+chip[1]) === this.state.menus[i].menuUrl){
                    selectMenu = this.state.menus[i];break
                }
            }
            return selectMenu
        }else if(chip.length === 3){
            let menuUrl = '/'+chip[2];
            let selectParentMenu = '';
            if(chip[1] === 'strateMonitor'){
                selectParentMenu = JSON.parse(JSON.stringify(this.state.menus[1]));
                selectParentMenu.childList = [];
                for(let i=0;i<this.state.menus[1].childList.length;i++){
                    if(menuUrl === this.state.menus[1].childList[i].menuUrl){
                        selectMenu = this.state.menus[1].childList[i];break
                    }
                }
                selectParentMenu.childList.push(selectMenu)
            }else if(chip[1] === 'stragetyAnaysis'){
                selectParentMenu = JSON.parse(JSON.stringify(this.state.menus[2]));
                selectParentMenu.childList = [];
                for(let i=0;i<this.state.menus[2].childList.length;i++){
                    if(menuUrl === this.state.menus[2].childList[i].menuUrl){
                        selectMenu = this.state.menus[2].childList[i];break
                    }
                }
                selectParentMenu.childList.push(selectMenu)
            }else if(chip[1] === 'smsManager'){
                selectParentMenu = JSON.parse(JSON.stringify(this.state.menus[15]));
                selectParentMenu.childList = [];
                for(let i=0;i<this.state.menus[12].childList.length;i++){
                    if(menuUrl === this.state.menus[12].childList[i].menuUrl){
                        selectMenu = this.state.menus[12].childList[i];break
                    }
                }
                selectParentMenu.childList.push(selectMenu)
            }
            return selectParentMenu
        }
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({openKeys: latestOpenKey ? [latestOpenKey] : []});
    };

    onClick = item => {
        this.setState({selectedKeys: [item.key]});
        var itemKey = item.key.split('/');
        if(itemKey[1] !== 'usermanage'
        && itemKey[1] !== 'articleTab'
        && itemKey[1] !== 'TYusermanageTab'
        && itemKey[1] !== 'APPusermanageTab'
        && itemKey[1] !== 'TYSubscribeTab'
        && itemKey[1] !== 'APPuserfeefbackTab'
        && itemKey[1] !== 'TYuserfeefbackTab'
        && itemKey[1] !== 'personalReportTab'
        && itemKey[1] !== 'orderExcepTab'
        && itemKey[1] !== 'systemReportTab'){
            setTimeout(() => {
                var iframeObj = document.getElementById('iframe');
                iframeObj.contentWindow.postMessage(JSON.stringify(this.getMenus(item.key)),'*');
            },1500)
            window.sessionStorage.setItem('selectMenu',JSON.stringify(this.getMenus(item.key)));
        }
    };

    exit(){
        let _this = this;
        ip.Logout(res => {
            if(res.success){
                removeCookie('alphaguUserType');
                removeCookie('alphaguUserName');
                removeCookie('alphagu_user_id');
                removeCookie('JSESSIONID');
                window.sessionStorage.removeItem('menu');
                window.sessionStorage.removeItem('selectMenu');
                // 跳转
                _this.props.history.push({pathname:'/'});
            }else{
                message.warning(res.msg)
            }
        })
    }

    render() {
        const scrollStyle = {maxWidth: '256px',background: '#001529'};
        let tyUserStyle = {display: this.state.tyUserStyle};
        return (
            <Scrollbars style={scrollStyle}>
                <Sider width={256} className='left-menu'>
                    <div className='left-menu-title'>AlphaGu后台管理</div>
                    <Menu
                        openKeys={this.state.openKeys}
                        selectedKeys={this.state.selectedKeys}
                        theme="dark"
                        mode="inline"
                        onOpenChange={this.onOpenChange}
                        onClick={this.onClick.bind(this)}
                        style={{ width: 256 }}
                    >
                        {
                            this.state.menus.map(menu => {
                                if(!menu.childList || menu.childList.length <= 0){
                                    return (
                                        <Menu.Item key={menu.menuUrl}>
                                            <Icon type={menu.menuIcon} />
                                            <Link to={'/app' + menu.menuUrl}>{menu.menuName}</Link>
                                        </Menu.Item>
                                    )
                                }else{
                                    return (
                                        <SubMenu key={menu.menuUrl} title={<span><Icon type={menu.menuIcon}/><span>{menu.menuName}</span></span>}>
                                            {
                                                menu.childList.map(child => {
                                                    return (
                                                        <Menu.Item key={menu.menuUrl + child.menuUrl}><Link to={'/app' + menu.menuUrl + child.menuUrl}>{child.menuName}</Link></Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )
                                }
                            })
                        }
                    </Menu>
                    <div style={tyUserStyle} className='left-menu-exit'><Icon type="retweet" />&nbsp;<Button type="link" onClick={() => this.props.resetPwd.show()}>修改密码</Button></div>
                    <div className='left-menu-exit'><Icon type="arrow-left" />&nbsp;<Button type="link" onClick={this.exit.bind(this)}>退出</Button></div>
                </Sider>
            </Scrollbars>
        )
    }
}

export default withRouter(LeftMenu)