import React, { Component } from 'react';
import { Table, Button, message, Form, Select, Input } from 'antd';
import ip from '@model/api';
import common from '@utils/common';

const { TextArea } = Input;

const OPTIONS = [
    {
        value: null,
        label: '全部'
    },
    {
        value: 0,
        label: '未处理'
    },
    {
        value: 1,
        label: '处理中'
    },
    {
        value: 2,
        label: '已处理'
    }
];

class APPuserfeefback extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                page: 1,
                size: 10,
                status: null,
                type: 1 //APP
            },
            total: 0,
            APPfeedbackList: [],
            columns: [
                {
                    title: '意见反馈时间',
                    dataIndex: 'time',
                    render: time => {
                        return time ? common.formatTime(time) : null
                    }
                },{
                    title: '用户名',
                    dataIndex: 'userName'
                },{
                    title: '内容',
                    dataIndex: 'feedBack',
                    width: 200
                },{
                    title: '状态',
                    dataIndex: 'status',
                    width: 80,
                    render: status => {
                        if(status === 0){
                            return (<span>未处理</span>)
                        }else if(status === 1){
                            return (<span>处理中</span>)
                        }else if(status === 2){
                            return (<span>已处理</span>)
                        }
                    }
                },{
                    title: '处理内容',
                    dataIndex: 'result',
                    width: 200,
                    render: (result,info) => {
                        return <TextArea onChange={() => this.handleGetInputValue(event)} disabled={info.status === 2 || info.status === 0} defaultValue={result} rows={4} />
                    }
                },{
                    title: '处理人',
                    dataIndex: 'opratorName'
                },{
                    title: '完成时间',
                    dataIndex: 'finishTime',
                    render: finishTime => {
                        return finishTime ? common.formatTime(finishTime) : null
                    }
                },{
                    title: '操作',
                    width: 80,
                    render: info => (
                        <div>
                            <Button onClick={() => this.updatestatus(info,'trace')} type="link" disabled={info.status === 2 || info.status === 1}>追踪</Button>
                            <Button onClick={() => this.updatestatus(info,'complete')} type="link" disabled={info.status === 2 || info.status === 0}>完成</Button>
                        </div>
                    )
                }
            ],
            selectedItems: [],
            inputValue: null
        }
    }

    componentDidMount() {
        this.getAllFeedbackList();
    }

    getAllFeedbackList() {
        let _this = this;
        let param = [
            {
                name: 'page',
                value: this.state.data.page
            },
            {
                name: 'size',
                value: this.state.data.size
            },
            {
                name: 'status',
                value: this.state.data.status
            },
            {
                name: 'type',
                value: this.state.data.type
            }
        ];
        let con = common.joinSearchParam(param);
        ip.getAllFeedbackList(con,res => {
            if(res.success){
                _this.setState({
                    APPfeedbackList: res.data.feedbackList,
                    total: res.data.totalCount
                });
            }else{
                message.warning(res.msg);
            }
        })
    }

    // 回调函数,当前页面
    changePage(current){
        let data = Object.assign({}, this.state.data, { page: current });
        this.setState({
            data: data,
        },() => {
            this.getAllFeedbackList()
        })
    }

    // 回调函数,每页显示多少条
    changePageSize(current, size){
        let data = Object.assign({}, this.state.data, { size: size }, {page: 1});
        this.setState({
            data: data,
        },() => {
            this.getAllFeedbackList()
        })
    }

    handleChange = selectedItems => {
        let data = Object.assign(this.state.data,{status:selectedItems});
        this.setState({
            data: data
        })
      }

    search = () => {
        let data = Object.assign(this.state.data,{page:1});
        this.setState({
            data: data
        })
        this.getAllFeedbackList()
    }

    updatestatus(info,type){
        let _this = this;
        if(type === 'trace'){
            let param = [
                {
                    name: 'feedbackid',
                    value: info.id
                },
                {
                    name: 'opratorid',
                    value: 5  //先默认为5
                },
                {
                    name: 'status',
                    value: 1
                },
                {
                    name: 'result',
                    value: ''
                }
            ];
            let con = common.joinSearchParam(param);
            ip.updateStatusFeedback(con,res => {
                if(res.success){
                    message.success(res.data);
                    Object.assign(info,{status:1});
                    let APPfeedbackList = _this.state.APPfeedbackList;
                    APPfeedbackList.forEach((item,index) => {
                        if(item.id === info.id){
                            APPfeedbackList[index] = info
                        }
                    })
                    _this.setState({APPfeedbackList:APPfeedbackList});
                }else{
                    message.warning(res.msg);
                }
            })
        }else if(type === 'complete'){
            if(this.state.inputValue){
                let param = [
                    {
                        name: 'feedbackid',
                        value: info.id
                    },
                    {
                        name: 'opratorid',
                        value: 5  //先默认为5
                    },
                    {
                        name: 'status',
                        value: 2
                    },
                    {
                        name: 'result',
                        value: this.state.inputValue
                    }
                ];
                let con = common.joinSearchParam(param);
                ip.updateStatusFeedback(con,res => {
                    if(res.success){
                        message.success(res.data);
                        Object.assign(info,{status:2});
                        let APPfeedbackList = _this.state.APPfeedbackList;
                        APPfeedbackList.forEach((item,index) => {
                            if(item.id === info.id){
                                APPfeedbackList[index] = info
                            }
                        })
                        _this.setState({APPfeedbackList:APPfeedbackList});
                    }else{
                        message.warning(res.msg);
                    }
                })
            }else{
                message.warning('请先填写处理内容');
            }
        }
    }

    handleGetInputValue = event => {
        let value = event.target.value;
        value === '' ? this.setState({inputValue:null}) : this.setState({inputValue:value})
    }


    render() {
        const { vertical } = this.state;
        const { selectedItems } = this.state;
        const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

        return (
            <div>
                <div className="table-search">
                    <Form layout={vertical}>
                        <Form.Item label="状态">
                            <Select placeholder="请选择状态" style={{ width: 200,marginRight: 10 }} onChange={this.handleChange}>
                            {filteredOptions.map(item => (
                                <Select.Option key={item.value} value={item.value}>
                                    {item.label}
                                </Select.Option>
                            ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label=" " className="table-search-button">
                            <Button type="primary" onClick={this.search}>查询</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table
                    rowKey="id"
                    columns={this.state.columns}
                    dataSource={this.state.APPfeedbackList}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>用户意见反馈信息</span>
                        </span>
                    )}}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: () => `共${this.state.total}条`,
                        pageSize: this.state.data.size,
                        current: this.state.data.page,
                        total: this.state.total,
                        onShowSizeChange: (current, size) => this.changePageSize(current, size),
                        onChange: (current) => this.changePage(current)
                    }}
                />
            </div>
        )
    }
}

export default APPuserfeefback
