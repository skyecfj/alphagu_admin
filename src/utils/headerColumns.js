import React from 'react';
import { Button } from 'antd';

export default {
    adminColumns : [
        {
            title: '用户名',
            dataIndex: 'userName'
        },{
            title: '添加日期',
            dataIndex: 'createTime'
        },{
            title: '用户类型',
            dataIndex: 'userType'
        },{
            title: '邮箱',
            dataIndex: 'email'
        },{
            title: '手机号',
            dataIndex: 'phone'
        },{
            title: '操作',
            render: () => {
                return (
                    <span>
                        <Button type="link">编辑</Button>
                        <Button type="link">删除</Button>
                        <Button type="link">重置密码</Button>
                    </span>
                )
            }
        },
    ]
}
