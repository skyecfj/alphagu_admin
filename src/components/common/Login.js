import React, { Component } from 'react';
import {setCookie} from "../../helpers/cookies";
import '../../styles/less/login.less';
import { Form, Icon, Input, Button, message, Spin, Select } from 'antd';
import ip from '@model/login';
import common from '@utils/common';

const FormItem = Form.Item;

const { Option } = Select;

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
    };
    handleSubmit = (e) => {
        var _this = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var key = "/insigmahengtiansofthtawill!$#$%%$%&^%*<";
                var username = values.username;
                var password = values.password;
                var type = values.type;
                var passwordM;
                if(type === '3'){
                    passwordM = common.jsencryptEncryptPassword(password);
                }else{
                    passwordM = this.$md5(password + key);
                }
                ip.Login('?userName='+username+'&password='+passwordM+'&type='+type,res => {
                    if(res.success){
                        var idDES = common.encryptByDES((res.data.id).toString(),'insigmahengtiansofthta!$#$%%$%&^%*<')
                        // 在cookie中存入一些参数值
                        if(type === '3'){
                            setCookie('alphaguUserType','3');
                        }else{
                            setCookie('alphaguUserType',res.data.userType);
                        }
                        setCookie('alphaguUserName',res.data.userName);
                        setCookie('alphagu_user_id',res.data.id);
                        // setCookie('alphagu_user_id',idDES, {path : '/'});
                        // cookie的大小不够，所以用session来存储菜单的数据，会话关掉之后session会被清除
                        window.sessionStorage.setItem('menu',JSON.stringify(res.data.menuInfo));
                        // res.data.userType 分为三种 0->分析师 1->管理员 2->运营管理员 此三类对应的url可能会有区别，留此空位，之后补充

                        // 跳转
                        if(type === '3' || type === '1'){
                            _this.props.history.push({pathname:'/app/usermanage'});
                        }else{
                            let firstChild = res.data.menuInfo[0].childList[0];
                            let child = {
                                menuId:10,
                                menuName: firstChild.modelDisplayName,
                                menuUrl: '/'+firstChild.modelName,
                                name: firstChild.modelName,
                                class: 'strategy-monitor-tab',
                                href: '#strategy-monitor',
                                dataId: firstChild.id,
                                dataType: firstChild.strategyTypeId
                            }
                            window.sessionStorage.setItem('selectMenu',JSON.stringify(Object.assign(res.data.menuInfo[0],{childList:[child]})));
                            _this.props.history.push({pathname:'/app/strateMonitor/ShortTerm'});
                        }
                    }else{
                        message.warning(res.msg)
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <div className="login-name">登录</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名 (admin)" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                // rules: [{ required: true, message: '请输入密码(密码不能小于6位)!', min:6 }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码 (password)" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('type', {
                                initialValue: '1',
                                rules: [{ required: true, message: '登录角色' }]
                            })(
                                <Select>
                                    <Option value="0">分析师</Option>
                                    <Option value="1">管理员</Option>
                                    <Option value="2">运营管理员</Option>
                                    <Option value="3">投研管理员</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;