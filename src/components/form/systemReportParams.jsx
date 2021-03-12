import React, { Component } from 'react';
import { Input, Form, DatePicker, InputNumber } from 'antd';

const dateFormat = 'YYYY-MM-DD';

class ParamFormItem extends Component {
    render() {
        const { sqlParam, getFieldDecorator } = this.props;
        return (
            <Form.Item label={sqlParam.name}>
                {getFieldDecorator(sqlParam.value,
                sqlParam.type === 'Tel' ? {
                    rules: [{
                        pattern: new RegExp(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, "g"),
                        message: '请输入正确' + sqlParam.name
                    }],
                    } : (sqlParam.type === 'Int' ? {
                        rules: [{ type: 'number', message: '请输入数字'}]} : {}))(
                            sqlParam.type === 'Int' ? <InputNumber /> : ((sqlParam.type === 'startDate' || sqlParam.type === 'endDate') ? <DatePicker onChange={sqlParam.handle} format={dateFormat} /> : <Input placeholder={"请输入" + sqlParam.name} />)
                )}
            </Form.Item>
        )
    }
}

export default Form.create()(ParamFormItem)