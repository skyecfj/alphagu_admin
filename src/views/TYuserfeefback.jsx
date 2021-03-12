import React, { Component } from 'react';
import { Table, Button, message, Form, Select } from 'antd';
import ip from '@model/api';
import common from '@utils/common';

const OPTIONS = [
    {
        value: null,
        label: '全部'
    },
    {
        value: 1,
        label: '数据错误'
    },
    {
        value: 2,
        label: '改进'
    },
    {
        value: 3,
        label: '需求'
    }
];

class TYuserfeefback extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                page: 1,
                size: 10,
                status: null,
                type: 2 //TY
            },
            total: 0,
            APPfeedbackList: [],
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'userName'
                },{
                    title: '内容',
                    dataIndex: 'title'
                },{
                    title: '状态',
                    dataIndex: 'type',
                    render: type => {
                        if(type === 1){
                            return (<span>数据错误</span>)
                        }else if(type === 2){
                            return (<span>改进</span>)
                        }else if(type === 3){
                            return (<span>需求</span>)
                        }
                    }
                },{
                    title: '地址',
                    dataIndex: 'address'
                },{
                    title: '邮箱',
                    dataIndex: 'email'
                },{
                    title: '处理人',
                    dataIndex: 'opratorName'
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

export default TYuserfeefback
