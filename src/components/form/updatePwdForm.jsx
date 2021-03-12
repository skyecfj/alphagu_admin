import React, { Component } from 'react';
import { Form, message, Modal, Input, Button } from 'antd';
import { getCookie } from '../../helpers/cookies';
import ip from '@model/api';
import common from '@utils/common';
import { observer } from 'mobx-react';

@observer
class UpdatePwdForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dialogTitle: '修改密码',
            updatePwdInfo: {},
            formLayout: 'horizontal'
        }
    }

    handleCancel = () => { this.props.resetPwd.show() }

    updatePwd = () => {
        var _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.oldPwd === values.newPwd){
                    message.warning('新旧密码不能相同');return
                }
                if(values.newPwd !== values.repeatPwd){
                    message.warning('两次输入密码不一致');return
                }
                var key = "/insigmahengtiansofthtawill!$#$%%$%&^%*<";
                var oldpasswordM = this.$md5(values.oldPwd + key);
                var newpasswordM = this.$md5(values.newPwd + key);
                let userId = getCookie('alphagu_user_id');
                let param = [
                    {
                        name: 'userId',
                        value: userId
                    },
                    {
                        name: 'oldPwd',
                        value: oldpasswordM
                    },
                    {
                        name: 'newPwd',
                        value: newpasswordM
                    }
                ];
                let con = common.joinSearchParam(param);
                ip.updatePwd(con, res => {
                    if(res.success){
                        message.success(res.msg);
                        _this.props.resetPwd.show();
                    }else{
                        message.warning(res.msg);
                    }
                })
            }
        });
    }

    render(){
        const { updatePwdInfo } = this.state;
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ?{
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                    layout={formLayout}
                    className="model-dialog"
                    title={this.state.dialogTitle}
                    visible={this.props.resetPwd.flag}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form>
                        <Form.Item label="原密码" {...formItemLayout}>
                            {getFieldDecorator('oldPwd',  {
                                initialValue: updatePwdInfo.oldPwd,
                                rules: [{ required: true, message: '请输入原密码'}, { min: 6, message: '密码不能小于6个字符' }]
                                })(<Input.Password placeholder="请输入原密码" />)}
                        </Form.Item>
                        <Form.Item label="新密码" {...formItemLayout}>
                            {getFieldDecorator('newPwd',  {
                                initialValue: updatePwdInfo.newPwd,
                                rules: [{ required: true, message: '请输入新密码'}, { min: 6, message: '密码不能小于6个字符' }]
                                })(<Input.Password placeholder="请输入新密码" />)}
                        </Form.Item>
                        <Form.Item label="再次确认" {...formItemLayout}>
                            {getFieldDecorator('repeatPwd',  {
                                initialValue: updatePwdInfo.repeatPwd,
                                rules: [{ required: true, message: '请再次确认新密码'}, { min: 6, message: '密码不能小于6个字符' }]
                                })(<Input.Password placeholder="请再次确认新密码" />)}
                        </Form.Item>
                        <Form.Item label="" className="model-form_button">
                            <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                            <Button key="ok" type="primary" onClick={this.updatePwd}>确定</Button>
                        </Form.Item>
                    </Form>
            </Modal>
        )
    }

}

export default Form.create()(UpdatePwdForm)