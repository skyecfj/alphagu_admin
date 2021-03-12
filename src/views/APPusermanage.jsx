import React, { Component } from 'react';
import { Table, Radio, message } from 'antd';
import ip from '@model/api';
import common from '@utils/common';

class APPusermanage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: 5,
            type: 1, //默认为一周
            inviteUserDetail: [],
            appUserDetail: [],
            subscribeUserDetail: [],
            visible: false,
            columns1: [
                {
                    title: '用户名',
                    dataIndex: 'userName'
                },{
                    title: '日数',
                    dataIndex: 'todayCount'
                },{
                    title: '总数',
                    dataIndex: 'totalCount'
                },{
                    title: '总奖励',
                    dataIndex: 'totalReward'
                },{
                    title: '成功次数',
                    dataIndex: 'successCount'
                },{
                    title: '累积次数',
                    dataIndex: 'accumulateCount'
                },{
                    title: '今日奖励',
                    dataIndex: 'todayRaise'
                }
            ],
            columns2: [
                {
                    title: '注册日期',
                    dataIndex: 'registeredDate',
                    render: registeredDate => {
                        return registeredDate ? registeredDate.substring(0,10) : null
                    }
                },{
                    title: '最后一次登录日期',
                    dataIndex: 'lastLoginDate',
                    render: lastLoginDate => {
                        return lastLoginDate ? lastLoginDate.substring(0,10) : null
                    }
                },{
                    title: '目前奖励盈元数',
                    dataIndex: 'currentReward'
                },{
                    title: '登录次数',
                    dataIndex: 'loginCount'
                },{
                    title: '签到次数',
                    dataIndex: 'signInCount'
                }
            ],
            columns3: [
                {
                    title: '用户名',
                    dataIndex: 'userName'
                },{
                    title: '策略名',
                    dataIndex: 'modelName'
                },{
                    title: '订阅开始时间',
                    dataIndex: 'subscribeTime'
                },{
                    title: '订阅到期时间',
                    dataIndex: 'endTime'
                }
            ]
        }
    }

    componentDidMount() {
        this.getInviteCodeInfoById();
        this.getUserInfo();
        this.getUserSubscribeInfosById();
    }

    getInviteCodeInfoById() {
        let _this = this;
        let param = [
            {
                name: 'userId',
                value: this.state.userId
            }
        ];
        let con = common.joinSearchParam(param);
        ip.getInviteCodeInfoById(con,res => {
            if(res.success){
                if(res.data!==null && res.data!==''){
                    _this.setState({inviteUserDetail:[res.data]});
                }else{
                    _this.setState({inviteUserDetail:[]});
                }
            }else{
                message.warning(res.msg);
            }
        })
    }

    getUserInfo(value) {
        let _this = this;
        let type = value ? value : this.state.type
        let param = [
            {
                name: 'type',
                value: type
            },
            {
                name: 'userId',
                value: this.state.userId
            }
        ];
        let con = common.joinSearchParam(param);
        ip.getUserInfo(con,res => {
            if(res.success){
                if(res.data!==null && res.data!==''){
                    _this.setState({appUserDetail:[res.data]});
                }else{
                    _this.setState({appUserDetail:[]});
                }
            }else{
                message.warning(res.msg);
            }
        })
    }

    getUserSubscribeInfosById() {
        let _this = this;
        let param = [
            {
                name: 'userId',
                value: this.state.userId
            }
        ];
        let con = common.joinSearchParam(param);
        ip.getUserSubscribeInfosById(con,res => {
            if(res.success){
                _this.setState({subscribeUserDetail:res.data});
            }else{
                message.warning(res.msg);
            }
        })
    }

    onChange = e => {
        this.setState({type:e.target.value});
        this.getUserInfo(e.target.value)
    };

    render() {
        return (
            <div>
                <Table
                    rowKey="userName"
                    columns={this.state.columns1}
                    dataSource={this.state.inviteUserDetail}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>APP用户邀请好友列表</span>
                        </span>
                    )}}
                />
                <Table
                    rowKey="registeredDate"
                    columns={this.state.columns2}
                    dataSource={this.state.appUserDetail}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>APP用户汇总信息</span>
                            <Radio.Group onChange={this.onChange} value={this.state.type}>
                                <Radio value={1}>一周</Radio>
                                <Radio value={2}>一月</Radio>
                                <Radio value={3}>三月</Radio>
                            </Radio.Group>
                        </span>
                    )}}
                />
                <Table
                    rowKey="id"
                    columns={this.state.columns3}
                    dataSource={this.state.subscribeUserDetail}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>APP用户订阅列表</span>
                        </span>
                    )}}
                />
            </div>
        )
    }
}

export default APPusermanage
