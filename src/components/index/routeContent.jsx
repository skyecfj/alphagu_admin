import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';


// 单页
// 原生页
import Usermanage from '@views/usermanage';
import ArticleTab from '@views/articleTab';
import APPusermanage from '@views/APPusermanage';
import TYusermanage from '@views/TYusermanage';
import TySubscribemanage from '@views/tySubscribemanage';
import APPuserfeefback from '@views/APPuserfeefback';
import TYuserfeefback from '@views/TYuserfeefback';
import PersonalReport from '@views/personalReport';
import OrderExcept from '@views/orderExcept';
import SystemReport from '@views/systemReport';

// 引用页
import Stategymonitor from '@views/stategymonitor';
import Strategy from '@views/strategy';
import Stragypublish from '@views/stragypublish';
import Rebate from '@views/rebate';
import Coin from '@views/coin';
import Usergroupid from '@views/usergroupid';
import Userbook from '@views/userbook';
import Export from '@views/export';
import Searchkline from '@views/searchkline';
import Operatinganalysis from '@views/operatinganalysis';
import Smsmanager from '@views/smsmanager';
import Tempmanager from '@views/tempmanager';
import Addsms from '@views/addsms';
import Agency from '@views/agency';
import Advertisement from '@views/advertisement';
import Bigscreenad from '@views/bigscreenad';
import Pushmessage from '@views/pushmessage';
import Singalmanage from '@views/singalmanage';
import Addindices from '@views/addindices';


const PrivateRoute = ({children, ...rest}) => {
    return <Route {...rest} render={() => <Condition children = {children} />} />
}

const Condition = () => {}

class RouteContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menus: []
        }
    }

    componentDidMount(){
        this.setState({menus: JSON.parse(window.sessionStorage.getItem('menu'))});
    }

    render() {
        return (
            // Refactor:可改进，与数据库相关，动态route
            <React.Fragment>
                <Switch>
                    {/* exact唯一匹配 */}
                    <Route exact path="/app" render={() => <Redirect to="/app/usermanage" />} />
                    {/*管理员管理*/}
                    <PrivateRoute path='/app/usermanage'></PrivateRoute>
                    <Route path='/app/usermanage' component={Usermanage} />
                    {/*策略监控*/}
                    <Route path='/app/strateMonitor/ShortTerm' component={Stategymonitor} />
                    <Route path='/app/strateMonitor/SmallMarketValue' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/SmallMarketBreak' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/LowPB' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/PEG' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/tset' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/PEGPOOL' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/CHANNELPOOL' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/yingliyuqi' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/touzipingjibiandong' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/reverse' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/casino' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/breakthrough' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/huchenghechengzhang' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/guzhijingxuan' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/pjts' component={Stategymonitor}/>
                    <Route path='/app/strateMonitor/TestSXF' component={Stategymonitor}/>
                    {/*策略分析*/}
                    <Route path='/app/stragetyAnaysis/ShortTerm' component={Strategy} />
                    <Route path='/app/stragetyAnaysis/SmallMarketValue' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/SmallMarketBreak' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/LowPB' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/PEG' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/tset' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/PEGPOOL' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/CHANNELPOOL' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/yingliyuqi' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/touzipingjibiandong' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/reverse' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/casino' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/breakthrough' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/huchenghechengzhang' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/guzhijingxuan' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/pjts' component={Strategy}/>
                    <Route path='/app/stragetyAnaysis/TestSXF' component={Strategy}/>
                    {/*策略发布管理*/}
                    <Route path='/app/stragetyPublish' component={Stragypublish} />
                    {/*优惠券管理*/}
                    <Route path='/app/rebateTab' component={Rebate} />
                    {/*虚拟币管理*/}
                    <Route path='/app/coinTab' component={Coin} />
                    {/* 邀请码管理 */}
                    {/* <Route path='/app/codeTab' component={FireChestnut} /> */}
                    {/*用户组管理*/}
                    <Route path='/app/usergroupidTab' component={Usergroupid} />
                    {/*用户订单管理*/}
                    <Route path='/app/userbookTab' component={Userbook} />
                    {/*意见反馈管理*/}
                    {/* <Route path='/app/userfeefbackTab' component={FireChestnut} /> */}
                    {/*导出K线图*/}
                    <Route path='/app/exportTab' component={Export} />
                    {/*查看K线图*/}
                    <Route path='/app/searchKtab' component={Searchkline} />
                    {/*运营数据分析*/}
                    <Route path='/app/operatingdataanysisTab' component={Operatinganalysis} />
                    {/*资讯文章发布*/}
                    <Route path='/app/articleTab' component={ArticleTab} />
                    {/*短信管理*/}
                    <Route path='/app/smsManager/sms-manager' component={Smsmanager} />
                    <Route path='/app/smsManager/sms-template' component={Tempmanager} />
                    <Route path='/app/smsManager/sms-add' component={Addsms} />
                    {/*代理管理*/}
                    <Route path='/app/agencyTab' component={Agency} />
                    {/*广告轮播*/}
                    <Route path='/app/adTab' component={Advertisement} />
                    {/*大屏广告*/}
                    <Route path='/app/bigAdTab' component={Bigscreenad} />
                    {/*消息推送*/}
                    <Route path='/app/pushTab' component={Pushmessage} />
                    {/*信号管理*/}
                    <Route path='/app/singalTab' component={Singalmanage} />
                    {/*指数管理*/}
                    <Route path='/app/indicesTab' component={Addindices} />
                    {/*APP用户详情*/}
                    <Route path='/app/APPusermanageTab' component={APPusermanage} />
                    {/*投研用户详情*/}
                    <Route path='/app/TYusermanageTab' component={TYusermanage} />
                    {/*投研订阅管理*/}
                    <Route path='/app/TYSubscribeTab' component={TySubscribemanage} />
                    {/*APP意见反馈管理*/}
                    <Route path='/app/APPuserfeefbackTab' component={APPuserfeefback} />
                    {/*投研意见反馈管理*/}
                    <Route path='/app/TYuserfeefbackTab' component={TYuserfeefback} />
                    {/*个性化报表*/}
                    <Route exact path='/app/personalReportTab/:type' component={PersonalReport} />
                    {/*异常订单处理*/}
                    <Route exact path='/app/orderExcepTab' component={OrderExcept} />
                    {/* 系统报告 */}
                    <Route exact path='/app/systemReportTab' component={SystemReport} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default RouteContent;