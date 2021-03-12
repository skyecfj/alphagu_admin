import React, { Component } from 'react';
import { Table, Radio, message } from 'antd';
import ip from '@model/api';
import common from '@utils/common';

class TYusermanage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: 5,
            type: 1, //默认为一周
            tyUserDetail: [],
            subscribeUserDetail: [],
            visible: false,
            columns1: [
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
            columns2: [
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
        this.getTyUserDetail();
        this.getUserSubscribeDetailsById();
    }

    getTyUserDetail(value) {
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
        ip.getTyUserDetail(con,res => {
            if(res.success){
                _this.setState({tyUserDetail:[res.data]});
            }else{
                message.warning(res.msg);
            }
        })
    }

    getUserSubscribeDetailsById() {
        let _this = this;
        let param = [
            {
                name: 'userId',
                value: this.state.userId
            }
        ];
        let con = common.joinSearchParam(param);
        ip.getUserSubscribeDetailsById(con,res => {
            if(res.success){
                _this.setState({subscribeUserDetail:res.data});
            }else{
                message.warning(res.msg);
            }
        })
    }

    onChange = e => {
        this.setState({type:e.target.value});
        this.getTyUserDetail(e.target.value)
    };

    render() {
        return (
            <div>
                <Table
                    rowKey="registeredDate"
                    columns={this.state.columns1}
                    dataSource={this.state.tyUserDetail}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>投研用户汇总信息</span>
                            <Radio.Group onChange={this.onChange} value={this.state.type}>
                                <Radio value={1}>一周</Radio>
                                <Radio value={2}>一月</Radio>
                                <Radio value={3}>三月</Radio>
                            </Radio.Group>
                        </span>
                    )}}
                />
                <Table
                    rowKey="userName"
                    columns={this.state.columns2}
                    dataSource={this.state.subscribeUserDetail}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>投研用户订阅列表</span>
                        </span>
                    )}}
                />
            </div>
        )
    }
}

export default TYusermanage
