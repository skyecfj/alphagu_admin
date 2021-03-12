import React, { Component } from 'react';
import { Input, Button, message, Table, Card, Form, DatePicker, InputNumber } from 'antd';
import ip from '@model/api';
import ParamFormItem from '../components/form/systemReportParams';

const dateFormat = 'YYYY-MM-DD';

class SystemReport extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sql: null,
            sqlId: null,
            type: null,
            sqlList: [],
            columns: [],
            queryList: [],
            sqlColumns: [
                {
                    title: 'ID',
                    dataIndex: 'id'
                },
                {
                    title: '类型',
                    dataIndex: 'type',
                    render: (type) => {
                        return ( type === 1 ? 'APP' :  'TY' )
                    }
                },
                {
                    title: '定制名',
                    render: (info) => {
                        return ( <Button type="link" onClick={() => { return this.editSql(info)}}>{info.title}</Button> )
                    }
                }
            ],
            formLayout: 'vertical',
            cardVisible: 'none',
            defaultVisible: 'block',
            systemReportSqlParams: []
        };
    }

    componentDidMount(){
        this.getSystemReportList()
    }

    getSystemReportList(){
        let _this = this;
        ip.getSystemReportList(res => {
            if(res.success){
                _this.setState({queryList: res.data});
            }else{
                message.warning(res.msg)
            }
        })
    }

    search = () => {
        let _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values['startDate']){
                    values['startDate'] = values['startDate'].format('YYYY-MM-DD')
                }
                if(values['endDate']){
                    values['endDate'] = values['endDate'].format('YYYY-MM-DD')
                }
                let sqlParams = [];
                Object.keys(values).forEach(item => {
                    let selsqlParam = this.state.systemReportSqlParams.filter(val => val.value === item);
                    let sqlParam = {
                        value: item,
                        name: values[item],
                        type: selsqlParam[0].type,
                        param: selsqlParam[0].param
                    }
                    if(values[item]){
                        sqlParams.push(sqlParam);
                    }
                })
                let params = {
                    id: this.state.sqlId,
                    type: this.state.type,
                    sqlParams: JSON.stringify(sqlParams)
                }
                ip.personalizedCustomization(params, res => {
                    if(res.success){
                        _this.setState({sqlList: res.data});
                        if(res.data.length > 0){
                            let columns = [];
                            Object.keys(_this.state.sqlList[0]).forEach(item => {
                                let col = {
                                    title: item,
                                    dataIndex: item
                                }
                                columns.push(col);
                            })
                            _this.setState({columns: columns});
                        }else{
                            message.warning('无数据');
                        }
                    }else{
                        message.warning(res.mag)
                    }
                })
            }
        })
    }

    editSql(info) {
        if(info.sqlParams){
            this.setState({
                cardVisible: 'block',
                defaultVisible: 'none',
                type: info.type,
                systemReportSqlParams: JSON.parse(info.sqlParams),
                sqlId: info.id
            })
        }else{
            this.setState({
                cardVisible: 'none',
                defaultVisible: 'block',
            })
        }
    }

    render() {
        const { vertical } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="personal-report">
                <div className="personal-report-left">
                    <Table
                        className="personal-report-table"
                        rowKey="id"
                        columns={this.state.sqlColumns}
                        dataSource={this.state.queryList}
                        bordered
                        title={() => {return (
                            <span className="table-title">
                                <span>个性化定制列表</span>
                            </span>
                        )}}
                    />
                </div>
                <div className="personal-report-right">
                    <div className="personal-report-up">
                        <Card className="table-search">
                            <p style={{display: this.state.defaultVisible}}>请选择定制</p>
                            <Form style={{display: this.state.cardVisible}} layout={vertical}>
                                {
                                    this.state.systemReportSqlParams.map(sqlParam => {
                                        return ( <ParamFormItem
                                            key={sqlParam.value}
                                            sqlParam={sqlParam}
                                            getFieldDecorator={getFieldDecorator} /> )
                                    })
                                }
                            </Form>
                        </Card>
                        <Button type="primary" onClick={this.search}>查询</Button>
                    </div>
                    <div className="personal-report-down">
                        <Table
                            rowKey="id"
                            columns={this.state.columns}
                            dataSource={this.state.sqlList}
                            bordered
                            scroll={{ x: 800 }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Form.create()(SystemReport)