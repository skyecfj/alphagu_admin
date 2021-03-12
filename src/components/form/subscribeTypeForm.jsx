
import React, { Component } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const OPTIONS2 = [{
    id: 0,
    name: '日'
},{
    id: 1,
    name: '月'
},{
    id: 2,
    name: '年'
},{
    id: 4,
    name: '一小时'
}];

class SubscribeTypeForm extends Component{
    constructor(props){
        super(props)
    }
    getItemsValue = () => {
        var flag = false;
        var value = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {flag = !err})
        if(flag){
            return value
        }else{
            return false
        }
    }

    resetFields = () => {
        this.props.form.resetFields();
    }

    render(){
        const { form, subscribeType, typeTitle } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form className="model-form">
                <Form.Item label="订阅方案名">
                    {getFieldDecorator('name',  {
                        initialValue: subscribeType.name,
                        rules: [{ required: true, message: '请输入方案名'}]
                        })(<Input placeholder="请输入方案名" />)}
                </Form.Item>
                <Form.Item label="订阅方案说明">
                    {getFieldDecorator('detail',  {
                        initialValue: subscribeType.detail,
                        rules: [{ required: true, message: '请输入方案说明'}]
                        })(<TextArea rows={4} placeholder="请输入方案说明" />)}
                </Form.Item>
                <Form.Item label="方案计时类型">
                    {getFieldDecorator('type',  {
                        initialValue: subscribeType.type,
                        rules: [{ required: true, message: '请选择类型'}]
                        })(
                            <Select style={{ width: 200 }}>
                            {OPTIONS2.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="方案计时时长">
                    {getFieldDecorator('count',  {
                        initialValue: subscribeType.count,
                        rules: [{ required: true, message: '请输入计时时长'}]
                        })(<Input placeholder="请输入计时时长" />)}
                </Form.Item>
                <Form.Item label="原价">
                    {getFieldDecorator('costPrice',  {
                        initialValue: subscribeType.costPrice,
                        rules: [{ required: false, message: '请输入原价'}]
                        })(<Input placeholder="请输入原价" />)}
                </Form.Item>
                <Form.Item label="折扣价">
                    {getFieldDecorator('discountPrice',  {
                        initialValue: subscribeType.discountPrice,
                        rules: [{ required: false, message: '请输入折扣价'}]
                        })(<Input placeholder="请输入折扣价" />)}
                </Form.Item>
                <Form.Item label="渠道价">
                    {getFieldDecorator('channelPrice',  {
                        initialValue: subscribeType.channelPrice,
                        rules: [{ required: false, message: '请输入渠道价'}]
                        })(<Input placeholder="请输入渠道价" />)}
                </Form.Item>
                {
                    typeTitle === '新增' ?
                    <Form.Item label="是否展示">
                        {getFieldDecorator('isDisplay',  {
                            initialValue: subscribeType.isDisplay,
                            rules: [{ required: true, message: '请选择是否展示'}]
                            })(
                                <Radio.Group>
                                    <Radio value={1}>展示</Radio>
                                    <Radio value={0}>不展示</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    : ''
                }
            </Form>
        )
    }
}

export default Form.create()(SubscribeTypeForm)