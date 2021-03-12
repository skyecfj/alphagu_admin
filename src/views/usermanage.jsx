import React, { Component } from 'react';
import { Table, Button, Modal, Form, Input, message, Radio } from 'antd';
import ip from '@model/api';
import common from '@utils/common';
import { getCookie } from '../helpers/cookies';

const { confirm } = Modal;

class Usermanage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                current: 1,
                userList: [],
                pageSize: 10,
                total: 0
            },
            userDetail: {},
            tyUserDetail: {},
            visible: false,
            visible1: false,
            formLayout: 'horizontal',
            dialogTitle: '',
            isEdit: false,
            columns: [
                {
                    title: '用户名',
                    dataIndex: 'userName'
                },{
                    title: '添加日期',
                    dataIndex: 'createTime',
                    render: (createTime) => {
                        return createTime ? createTime.substring(0,10) : null
                    }
                },{
                    title: '用户类型',
                    dataIndex: 'userType',
                    render: (userType) => {
                        if(getCookie('alphaguUserType') === '3'){
                            return (<span>{userType}</span>)
                        }else{
                            if(userType === '0'){
                                return (<span>分析师</span>)
                            }else if(userType === '1'){
                                return (<span>管理员</span>)
                            }else if(userType === '2'){
                                return (<span>运营管理员</span>)
                            }
                        }
                    }
                },{
                    title: '邮箱',
                    dataIndex: 'email'
                },{
                    title: '手机号',
                    dataIndex: 'phone'
                },{
                    title: '操作',
                    width: 260,
                    render: (info) => {
                        if(getCookie('alphaguUserType') === '3'){
                            return <Button onClick={() => { return this.showDetail(info) }}>详情</Button>
                        }else{
                            if(info.userName === 'admin'){
                                return (
                                    <span>
                                        <Button onClick={() => { return this.resetPwd(info) }}>重置密码</Button>
                                    </span>
                                )
                            }else{
                                return (
                                    <span>
                                        <Button type="primary" onClick={() => { return this.getUserDetailById(info) }}>编辑</Button>&nbsp;
                                        <Button type="danger" onClick={() => { return this.deleteUser(info) }}>删除</Button>&nbsp;
                                        <Button onClick={() => { return this.resetPwd(info) }}>重置密码</Button>
                                    </span>
                                )
                            }
                        }
                    }
                }
            ]
        }
    }

    componentDidMount() {
        this.getDate();
    }

    getDate(){
        let _this = this;
        let param = [
            {
                name: 'page',
                value: this.state.data.current
            },
            {
                name: 'size',
                value: this.state.data.pageSize
            },
            {
                name: 'type',
                value: getCookie('alphaguUserType')
            }
        ];
        let con = common.joinSearchParam(param);
        ip.getUserList(con,res => {
            if(res.success){
                let data = Object.assign({}, this.state.data, { total: res.data.totalCount }, { userList: res.data.userList });
                _this.setState({data:data})
            }else{
                message.warning(res.msg);
            }
        })
    }

    // 回调函数,当前页面
    changePage(current){
        let data = Object.assign({}, this.state.data, { current: current });
        this.setState({
            data: data,
        },() => {
            this.getDate()
        })
    }

    // 回调函数,每页显示多少条
    changePageSize(current, size){
        let data = Object.assign({}, this.state.data, { pageSize: size }, {current: 1});
        this.setState({
            data: data,
        },() => {
            this.getDate()
        })
    }

    showModal = () => { this.setState({ userDetail: {}, visible: true, dialogTitle: '新增', isEdit: false }) }

    handleCancel = e => { this.setState({ visible: false }) };

    editUser = () => {
        let _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(_this.state.dialogTitle === '新增'){
                    ip.userAdd(values, res => {
                        if(res.success){
                            message.success(res.msg);
                            _this.setState({visible: false});
                            _this.getDate();
                            _this.props.form.resetFields();
                        }else{
                            message.warning(res.msg);
                        }
                    })
                }else if(_this.state.dialogTitle === '编辑'){
                    Object.assign(_this.state.userDetail, {userType: values.userType, email: values.email, phone: values.phone})
                    ip.updateUserInformation(_this.state.userDetail, res => {
                        if(res.success){
                            message.success(res.data);
                            _this.setState({visible: false});
                            _this.getDate();
                            _this.props.form.resetFields();
                        }else{
                            message.warning(res.msg);
                        }
                    })
                }
            }
        });
    }

    deleteUser(info){
        let _this = this;
        confirm({
            title: '警告',
            content: '确定删除此用户?',
            onOk() {
                ip.deleteUser(info.id, res => {
                    if(res.success){
                        message.success(res.data);
                        Object.assign(_this.state.data, { current: 1 });
                        _this.getDate();
                    }else{
                        message.warning(res.msg);
                    }
                })
            },
            onCancel() {}
        })
    }

    resetPwd(info){
        confirm({
            title: '警告',
            content: '确定重置密码?',
            onOk() {
                ip.resetPwd(info.id, res => {
                    if(res.success){
                        message.success(res.data);
                    }else{
                        message.warning(res.msg);
                    }
                })
            },
            onCancel() {}
        })
    }

    showDetail(info){
        this.setState({tyUserDetail: info, visible1: true});
    }

    getUserDetailById(info){
        this.setState({userDetail: info, visible: true, dialogTitle: '编辑', isEdit: true});
    }

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ?{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const { getFieldDecorator } = this.props.form;
        const { userDetail } = this.state;
        return (
            <div>
                <Table
                    rowKey="id"
                    scroll={{x:800}}
                    columns={this.state.columns}
                    dataSource={this.state.data.userList}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>管理员用户信息</span>
                            <Button type="primary" onClick={this.showModal}>添加用户</Button>
                        </span>
                    )}}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: () => `共${this.state.data.total}条`,
                        pageSize: this.state.data.pageSize,
                        current: this.state.data.current,
                        total: this.state.data.total,
                        onShowSizeChange: (current, size) => this.changePageSize(current, size),
                        onChange: (current) => this.changePage(current)
                    }}
                />
                {/* 详情框 */}
                <Modal
                    className="model-dialog"
                    visible={this.state.visible1}
                    title="文章详情"
                    onCancel={() => {this.setState({visible1:false})}}
                    footer={[<Button key="submit" type="primary" onClick={() => {this.setState({visible1:false})}}>确定</Button>]}
                >
                    <p>用户名：{this.state.tyUserDetail.userName}</p>
                    <p>添加日期：{this.state.tyUserDetail.createTime}</p>
                    <p>用户类型：{this.state.tyUserDetail.userType}</p>
                    <p>邮箱：{this.state.tyUserDetail.email}</p>
                    <p>手机号：{this.state.tyUserDetail.phone}</p>
                </Modal>
                {/* 新增/编辑框 */}
                <Modal
                    layout={formLayout}
                    className="model-dialog"
                    title={this.state.dialogTitle}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form className="model-form">
                        <Form.Item label="用户名" {...formItemLayout}>
                            {getFieldDecorator('userName',  {
                                rules: [{ required: true, message: '请输入用户名',}],
                                initialValue: userDetail.userName
                                })(<Input disabled={this.state.isEdit} placeholder="请输入用户名" />)}
                        </Form.Item>
                        <Form.Item label="类别" {...formItemLayout}>
                            {getFieldDecorator('userType', {
                                rules: [{ required: true, message: '请选择类别'}],
                                initialValue: userDetail.userType
                                })(<Radio.Group>
                                    <Radio value={'0'}>分析师</Radio>
                                    <Radio value={'1'}>管理员</Radio>
                                    <Radio value={'2'}>运营管理员</Radio>
                                  </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label="邮箱" {...formItemLayout}>
                            {getFieldDecorator('email',  {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '请输入正确邮箱',
                                    },
                                    {
                                        required: true,
                                        message: '请输入邮箱'
                                    }
                                ],
                                initialValue: userDetail.email
                                })(<Input placeholder="请输入邮箱" />)}
                        </Form.Item>
                        <Form.Item label="手机号" {...formItemLayout}>
                            {getFieldDecorator('phone',  {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入手机号'
                                    },
                                    {
                                        pattern: new RegExp(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, "g"),
                                        message: '请输入正确手机号'
                                    }
                                ],
                                initialValue: userDetail.phone
                                })(<Input placeholder="请输入手机号" />)}
                        </Form.Item>
                        <Form.Item label="" className="model-form_button">
                            <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                            <Button key="ok" type="primary" onClick={this.editUser}>确定</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(Usermanage)
