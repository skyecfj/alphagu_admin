import React, { Component } from 'react';
import { Table, message, Button, Modal } from 'antd';
import ip from '@model/api';

const { confirm } = Modal;

class OrderExcept extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            columns: [
                {
                    title: '订单号',
                    dataIndex: 'code'
                },{
                    title: '支付方式',
                    dataIndex: 'paymentType',
                    render: (paymentType) => {
                        if(paymentType === 0){
                            return (<span>支付宝</span>)
                        }else if(paymentType === 1){
                            return (<span>微信</span>)
                        }
                    }
                },{
                    title: '订单状态',
                    dataIndex: 'state',
                    render: (state) => {
                        if(state === 0){
                            return (<span>待支付</span>)
                        }else if(state === 1){
                            return (<span>已支付</span>)
                        }else if(state === 2){
                            return (<span>已取消</span>)
                        }
                    }
                },{
                    title: '补单操作人名称',
                    dataIndex: 'oprator'
                },{
                    title: '订阅方案名',
                    dataIndex: 'subscribeName'
                },{
                    title: '产品说明',
                    dataIndex: 'tradeDescription'
                },{
                    title: '流转至订单系统的结果',
                    dataIndex: 'orderStatus'
                },{
                    title: '操作',
                    render: (info) => {
                        return <Button type="primary" onClick={() => this.updateStatus(info)}>处理为正常订单</Button>
                    }
                }
            ],
            orderExceptList: []
        }
    }

    componentDidMount(){
        this.getExceptOrderList();
    }

    getExceptOrderList(){
        let _this = this;
        ip.exceptOrderList(res => {
            if(res.success){
                _this.setState({orderExceptList: res.data.list})
            }else{
                message.warning(res.msg);
            }
        })
    }

    updateStatus(info){
        confirm({
            title: '警告',
            content: '确认处理为正常订单?',
            onOk() {
                ip.setOrderNormal('?code='+info.code, res => {
                    if(res.success){
                        message.success(res.data);
                    }else{
                        message.warning(res.msg);
                    }
                })
            },
            onCancel() {},
          });
    }

    render() {
        return (
            <div>
                <Table
                rowKey="id"
                columns={this.state.columns}
                dataSource={this.state.orderExceptList}
                bordered
                title={() => {return (
                    <span className="table-title">
                        <span>异常订单信息列表</span>
                    </span>
                )}} />
            </div>
        )
    }

}

export default OrderExcept