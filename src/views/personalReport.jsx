import React, { Component } from 'react';
import { Input, Button, message, Table } from 'antd';
import ip from '@model/api';

const { TextArea } = Input;

class PersonalReport extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sql: null,
            sqlId: null,
            type: null,
            sqlList: [],
            columns: [],
            queryList: [],
            queryListDto: {
                page: 1,
                size: 10,
                type: ''
            },
            total: 0,
            sqlColumns: [
                {
                    title: 'ID',
                    dataIndex: 'id'
                },{
                    title: 'sql语句',
                    render: (sql) => {
                        return ( <Button type="link" onClick={() => { return this.editSql(sql)}}>{sql.sqlDetail}</Button> )
                    }
                }
            ]
        };
    }

    componentDidMount(){
        let type = this.props.match.params.type;
        let queryListDto = Object.assign(this.state.queryListDto,{ type: type });
        this.setState({queryListDto: queryListDto, sql: null, sqlId: null, sqlList: [], columns: []});
        this.getQueryList();

        // 路由监听
        // const history = this.props.history;
        // this.unListen = history.listen(route => {
        //     let type = route.pathname.split('/');
        //     if(type[3]){ this.setState({type: type[3]}) }
        //     console.log(this.state.type)
        // });
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        let type = nextProps.match.params.type;
        let queryListDto = Object.assign(this.state.queryListDto,{ type: type });
        this.setState({queryListDto: queryListDto, sql: null, sqlId: null, sqlList: [], columns: []});
        this.getQueryList();
    }

    // componentWillUnmount(){
    //     // 移除监听
    //     this.unListen();
    // }

    getQueryList(){
        let _this = this;
        ip.getQueryList(this.state.queryListDto, res => {
            if(res.success){
                _this.setState({
                    queryList: res.data.list,
                    total: res.data.totalCount
                })
            }else{
                message.warning(res.msg);
            }
        })
    }

    changePage(current){
        let data = Object.assign(this.state.queryListDto, { page: current });
        this.setState({
            queryListDto: data
        },() => {
            this.getQueryList()
        })
    }

    changePageSize(current, size){
        let data = Object.assign(this.state.queryListDto, { size: size }, { page: 1 })
        this.setState({
            queryListDto: data
        },() => {
            this.getQueryList()
        })
    }

    handleGetInputValue = event => {
        let value = event.target.value;
        value === '' ? this.setState({sql:null}) : this.setState({sql:value});
    }

    search = () => {
        let _this = this;
        let params = {
            type: this.state.queryListDto.type,
            sql: this.state.sql
        };
        if(this.state.sql !== '' && this.state.sql !== null){
            ip.querySql(params, res => {
                if(res.success){
                    if(res.data.length > 0){
                        _this.setState({sqlList:res.data});
                        let columns = [];
                        Object.keys(_this.state.sqlList[0]).forEach(item => {
                            let col = {
                                title: item,
                                dataIndex: item
                            }
                            columns.push(col);
                        })
                        _this.setState({columns:columns});
                    }else{
                        message.warning('无数据');
                    }
                }else{
                    message.warning(res.msg);
                }
            })
        }else{
            message.warning('请先填写sql语句');
        }
    }

    save = () => {
        let _this = this;
        if(this.state.sql !== '' && this.state.sql !== null){
            ip.querySql('?sql=' + this.state.sql + '&type='+this.state.queryListDto.type,res => {
                if(res.success){
                    if(res.data.length > 0){
                        let param = {sqlDetail: _this.state.sql,type: _this.state.queryListDto.type};
                        ip.saveSql(param,result => {
                            if(result){
                                _this.getQueryList();
                            }else{
                                message.warning(res.msg);
                            }
                        })
                    }else{
                        message.warning('无数据');
                    }
                }else{
                    message.warning(res.msg);
                }
            })
        }else{
            message.warning('请先填写sql语句');
        }
    }

    update = () => {
        let _this = this;
        if(this.state.sql !== '' && this.state.sql !== null){
            if(this.state.sqlId !== null){
                let params = {id: this.state.sqlId, sqlDetail: this.state.sql, type: this.state.queryListDto.type};
                ip.updateSql(params, res => {
                    if(res.success){
                        _this.getQueryList();
                    }else{
                        message.warning(res.msg);
                    }
                })
            }else{
                message.warning('请先保存');
            }
        }else{
            message.warning('请先填写sql语句');
        }
    }

    editSql(sql) {
        this.setState({sql: sql.sqlDetail, sqlId: sql.id});
    }

    render() {
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
                                <span>sql语句列表</span>
                            </span>
                        )}}
                        pagination={{
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: () => `共${this.state.total}条`,
                            pageSize: this.state.queryList.size,
                            current: this.state.queryList.page,
                            total: this.state.total,
                            onShowSizeChange: (current, size) => this.changePageSize(current, size),
                            onChange: (current) => this.changePage(current)
                        }}
                    />
                </div>
                <div className="personal-report-right">
                    <div className="personal-report-up">
                        <TextArea value={this.state.sql} rows={6} onChange={() => this.handleGetInputValue(event)} />
                        <Button type="primary" onClick={this.search}>查询</Button>&nbsp;
                        <Button type="primary" onClick={this.save}>保存</Button>&nbsp;
                        <Button type="primary" onClick={this.update}>更新</Button>
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

export default PersonalReport
