import React, { Component } from 'react';
import { Table, message, Button, Form, Input, Modal, Tabs, DatePicker, Select } from 'antd';
import ip from '@model/api';
import moment from 'moment';
import SubscribeTypeForm from '../components/form/subscribeTypeForm';
import { getCookie } from '../helpers/cookies';

const { TabPane } = Tabs;

const dateFormat = 'YYYY-MM-DD';

class TySubscribemanage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userSubscribeInfo: {},
            subscribeType: {},
            SubscribeDataQueryDto: {
                userName: null,
                subscribeName: null,
                minSubscribeTime: null,
                maxSubscribeTime: null,
                page: 1,
                size: 10
            },
            title: '',
            total: 0,
            tySubscribeList: [],
            visible: false,
            columns: [
                {
                    title: '订阅ID',
                    dataIndex: 'id'
                },{
                    title: '用户名',
                    dataIndex: 'userName'
                },{
                    title: '订阅名',
                    dataIndex: 'subscribeName'
                },{
                    title: '订阅时间',
                    dataIndex: 'subscribeTime'
                },{
                    title: '订阅到期时间',
                    dataIndex: 'endTime'
                },{
                    title: '操作',
                    render: (userInfo) => (
                        <Button type="link" onClick={() => this.getUserSubscribeInfoById(userInfo)}>编辑</Button>
                    )
                }
            ],
            formLayout: 'vertical',
            OPTIONS1: [],
            typeTitle: '',
            typeVisible: false,
            typeColumns: [
                {
                    title: '订阅方案名',
                    dataIndex: 'name'
                },{
                    title: '订阅方案说明',
                    dataIndex: 'detail'
                },{
                    title: '方案计时类型',
                    render: (typeInfo) => {
                        let name = ''
                        if(typeInfo.type === 0){
                            name = '日';
                        }else if(typeInfo.type === 1){
                            name = '月';
                        }else if(typeInfo.type === 2){
                            name = '年';
                        }else{
                            name = '一小时';
                        }
                        return <span>{name}</span>
                    }
                },{
                    title: '方案计时时长',
                    dataIndex: 'count'
                },{
                    title: '原价',
                    dataIndex: 'costPrice'
                },{
                    title: '打折价',
                    dataIndex: 'discountPrice'
                },{
                    title: '渠道价',
                    dataIndex: 'channelPrice'
                },{
                    title: '是否打折',
                    render: (typeInfo) => {
                        let discount = '';
                        if(typeInfo.isDiscount === 1){
                            discount = '打折';
                        }else if(typeInfo.isDiscount === 0){
                            discount = '不打折';
                        }
                        return <span>{discount}</span>
                    }
                },{
                    title: '操作',
                    render: (typeInfo) => (
                        <Button type="link" onClick={() => this.getSubscribeInfoById(typeInfo)}>编辑</Button>
                    )
                }
            ],
            tySubscribeTypeList: []
        }
    }

    componentDidMount() {
        this.getTySubscribe();
        this.getTySubscribeType();
    }

    getTySubscribe() {
        let _this = this;
        ip.getTyUserSubscribeInfoList(this.state.SubscribeDataQueryDto,res => {
            if(res.success){
                _this.setState({
                    tySubscribeList: res.data.list,
                    total: res.data.totalCounts
                });
            }else{
                message.warning(res.msg);
            }
        })
    }

    getTySubscribeType(){
        let _this = this;
        ip.getSubscribeInfoList(res => {
            if(res.success){
                let data = [];
                res.data.forEach(item => {data.push(item)});
                _this.setState({OPTIONS1: data, tySubscribeTypeList: data});
            }else{
                message.warning(res.msg);
            }
        })
    }

    // 回调函数,当前页面
    changePage(current){
        let data = Object.assign({}, this.state.SubscribeDataQueryDto, { page: current });
        this.setState({
            SubscribeDataQueryDto: data,
        },() => {
            this.getTySubscribe()
        })
    }

    // 回调函数,每页显示多少条
    changePageSize(current, size){
        let data = Object.assign({}, this.state.SubscribeDataQueryDto, { size: size }, { page: 1 });
        this.setState({
            SubscribeDataQueryDto: data,
        },() => {
            this.getTySubscribe()
        })
    }

    showModel = () => {
        this.setState({typeTitle: '新增',typeVisible: true,subscribeType: {}});
        if(this.formRef){this.formRef.resetFields()}
    }

    operateTySubscribe = e => {
        let _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ip.modifyTyUserSubscribeInfo(_this.state.userSubscribeInfo,res => {
                    if(res.success){
                        message.success(res.data);
                        _this.setState({visible:false});
                    }else{
                        message.warning(res.msg);
                    }
                })
            }
        })
    }

    handleGetInputValue = (event,type) => {
        let value = event.target.value;
        let _this = this;
        if(type === 'userName'){
            value === '' ? Object.assign(_this.state.SubscribeDataQueryDto,{userName:null}) : Object.assign(_this.state.SubscribeDataQueryDto,{userName:value});
        }else if(type === 'subscribeName'){
            value === '' ? Object.assign(_this.state.SubscribeDataQueryDto,{subscribeName:null}) : Object.assign(_this.state.SubscribeDataQueryDto,{subscribeName:value});
        }
    }

    getStartDate = (e, date) => {
        Object.assign(this.state.SubscribeDataQueryDto,{minSubscribeTime:date});
        if(this.state.SubscribeDataQueryDto.maxSubscribeTime && date > this.state.SubscribeDataQueryDto.maxSubscribeTime){
            message.warning('开始日期要小于结束日期');
        }
    }

    getEndDate = (e, date) => {
        Object.assign(this.state.SubscribeDataQueryDto,{maxSubscribeTime:date});
        if(this.state.SubscribeDataQueryDto.minSubscribeTime && date < this.state.SubscribeDataQueryDto.minSubscribeTime){
            message.warning('开始日期要小于结束日期');
        }
    }

    search = () => {
        let _this = this;
        let SubscribeDataQueryDto = Object.assign(_this.state.SubscribeDataQueryDto,{page:1});
        this.setState({
            SubscribeDataQueryDto:SubscribeDataQueryDto
        }, () => {
            this.getTySubscribe()
        })
    }

    handleCancel = e => {
        this.setState({ visible: false,userSubscribeInfo: {} });
        this.props.form.resetFields();
    }

    typeHandleCancel = e => {
        this.setState({ typeVisible: false,subscribeType: {} });
        this.formRef.resetFields();
    }

    handleCreate = () => {
        var _this = this;
        var values = this.formRef.getItemsValue();
        var title = this.state.typeTitle;
        if(values){
            if(title === '新增'){
                Object.assign(values, {createdBy: getCookie('alphaguUserName')});
                ip.addSubscribeInfo(values,res => {
                    if(res.success){
                        message.success(res.msg);
                        _this.formRef.resetFields();
                        _this.setState({typeVisible: false});
                        _this.getTyUserSubscribeInfoList();
                        _this.formRef.resetFields();
                    }else{
                        message.warning(res.msg);
                    }
                })
            }else if(title === '编辑'){
                Object.assign(_this.state.subscribeType,{
                    name: values.name,
                    detail: values.detail,
                    type: values.type,
                    count: values.count,
                    costPrice: values.costPrice,
                    discountPrice: values.discountPrice,
                    channelPrice: values.channelPrice
                });
                ip.updateSubscribeInfo(_this.state.subscribeType,res => {
                    if(res.success){
                        message.success(res.msg);
                        _this.formRef.resetFields();
                        _this.setState({typeVisible: false});
                        _this.getTyUserSubscribeInfoList();
                    }else{
                        message.warning(res.msg);
                    }
                })
            }
        }
    }

    getUserSubscribeInfoById(userInfo) {
        let _this = this;
        this.setState({title: '编辑',visible: true})
        ip.getUserSubscribeInfoById('?id='+userInfo.id,res => {
            if(res.success){
                _this.setState({userSubscribeInfo: res.data})
            }else{
                message.warning(res.msg);
            }
        })
    }

    getSubscribeInfoById(typeInfo){
        let _this = this;
        this.setState({typeTitle: '编辑',typeVisible: true});
        ip.getSubscribeInfoById('?id='+typeInfo.id,res => {
            if(res.success){
                _this.setState({subscribeType: res.data})
            }else{
                message.warning(res.msg);
            }
        })
    }

    handleChange = e => {
        Object.assign(this.state.userSubscribeInfo, {subscribeInfoId: e});
    }

    onChange = (value, dateString) => {
        Object.assign(this.state.userSubscribeInfo, {endTime: dateString});
    }

    render() {
        const { vertical } = this.state;
        const { userSubscribeInfo } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="投研用户订阅" key="1">
                        <div className="table-search">
                            <Form layout={vertical}>
                                <Form.Item label="用户名">
                                    <Input onChange={() => this.handleGetInputValue(event,'userName')} placeholder="请输入用户名" />
                                </Form.Item>
                                <Form.Item label="订阅名">
                                    <Input onChange={() => this.handleGetInputValue(event,'subscribeName')} placeholder="请输入订阅名" />
                                </Form.Item>
                                <Form.Item label="订阅日期">
                                    <DatePicker onChange={this.getStartDate} format={dateFormat} />&nbsp;-&nbsp;&nbsp;&nbsp;
                                    <DatePicker onChange={this.getEndDate} format={dateFormat} />
                                </Form.Item>
                                <Form.Item label=" " className="table-search-button">
                                    <Button type="primary" onClick={this.search}>查询</Button>
                                </Form.Item>
                            </Form>
                            <Table
                                rowKey="id"
                                columns={this.state.columns}
                                dataSource={this.state.tySubscribeList}
                                bordered
                                title={() => {return (
                                    <span className="table-title">
                                        <span>投研用户订阅列表</span>
                                    </span>
                                )}}
                                pagination={{
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: () => `共${this.state.total}条`,
                                    pageSize: this.state.SubscribeDataQueryDto.size,
                                    current: this.state.SubscribeDataQueryDto.page,
                                    total: this.state.total,
                                    onShowSizeChange: (current, size) => this.changePageSize(current, size),
                                    onChange: (current) => this.changePage(current)
                                }}
                            />
                            <Modal
                                className="model-dialog"
                                title={this.state.title}
                                visible={this.state.visible}
                                onCancel={this.handleCancel}
                                footer={null}
                            >
                                <Form className="model-form" onSubmit={this.operateTySubscribe}>
                                    <Form.Item label="策略">
                                        {getFieldDecorator('subscribeInfoId',  {
                                            initialValue: userSubscribeInfo.subscribeInfoId,
                                            rules: [{ required: true, message: '请选择策略'}]
                                            })(
                                            <Select style={{ width: 200 }} onChange={this.handleChange}>
                                            {this.state.OPTIONS1.map(item => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                    <Form.Item label="结束时间">
                                        {getFieldDecorator('endTime',  {
                                            initialValue: moment(userSubscribeInfo.endTime),
                                            rules: [{ required: true, message: '请选择结束时间'}]
                                            })(
                                            <DatePicker showTime onChange={this.onChange} />
                                        )}
                                    </Form.Item>
                                    <Form.Item label="" className="model-form_button">
                                        <Button key="cancel" onClick={this.handleCancel}>取消</Button>
                                        <Button type="primary" htmlType="submit">确定</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </TabPane>
                    <TabPane tab="用户订阅类型" key="2">
                        <div className="table-search">
                            <Table
                                rowKey="id"
                                columns={this.state.typeColumns}
                                dataSource={this.state.tySubscribeTypeList}
                                bordered
                                title={() => {return (
                                    <span className="table-title">
                                        <span>投订阅类型列表</span>
                                        <Button type="primary" onClick={this.showModel}>添加投研订阅类型</Button>
                                    </span>
                                )}}
                            />
                            <Modal
                                className="model-dialog"
                                title={this.state.typeTitle}
                                visible={this.state.typeVisible}
                                onOk={this.handleCreate}
                                onCancel={this.typeHandleCancel}
                                okText="确定"
                                cancelText="取消"
                            >
                                <SubscribeTypeForm
                                    wrappedComponentRef={(form) => this.formRef = form}
                                    subscribeType={this.state.subscribeType}
                                    typeTitle={this.state.typeTitle}
                                />
                            </Modal>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Form.create()(TySubscribemanage)
