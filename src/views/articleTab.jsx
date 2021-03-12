import React, { Component } from 'react';
import { Table, message, Button, Form, Input, Modal, DatePicker, Select, Radio, Icon } from 'antd';
import ip from '@model/api';
import common from '@utils/common';
import { getCookie } from '../helpers/cookies';

const { confirm } = Modal;

const { TextArea } = Input;

const dateFormat = 'YYYY-MM-DD';

const OPTIONS2 = [
    {
        value: '',
        label: '全部'
    },
    {
        value: '0',
        label: '未发布'
    },
    {
        value: '1',
        label: '已发布'
    }
];

class ArticleTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            addArticleInfo: {},
            articleInfo: {},
            articleDto: {
                title: null,
                publisherName: null,
                articleState: null,
                startDate: null,
                endDate: null,
                page: 1,
                size: 10,
            },
            total: 0,
            articleList: [],
            visible1: false,
            visible2: false,
            columns: [
                {
                    title: '文章标题',
                    width: 200,
                    dataIndex: 'title'
                },{
                    title: '发布状态',
                    width: 150,
                    dataIndex: 'articleState',
                    render: articleState => {
                        return articleState === 1 ? '已发布' : '未发布'
                    }
                },{
                    title: '发布日期',
                    width: 150,
                    render: articleInfo => {
                        return articleInfo.articleState === 1 ? common.unixToDate(articleInfo.publishedTime) : ''
                    }
                },{
                    title: '创建人',
                    width: 100,
                    dataIndex: 'publisherName'
                },{
                    title: '摘要',
                    width: 200,
                    dataIndex: 'introduction'
                },{
                    title: '图',
                    width: 300,
                    dataIndex: 'imgSrc'
                },{
                    title: '是否推荐',
                    width: 100,
                    dataIndex: 'isBanner',
                    render: isBanner => {
                        if(isBanner === 0){
                            return '否'
                        }else if(isBanner === 1){
                            return '是'
                        }
                    }
                },{
                    title: '操作',
                    width: 260,
                    render: articleInfo => {
                        return (
                            <div>
                                <Button type="primary" onClick={() => this.showDetails(articleInfo)}>详情</Button>&nbsp;
                                <Button type="danger" onClick={() => this.delete(articleInfo)}>删除</Button>&nbsp;
                                <Button onClick={() => this.edit(articleInfo)}>编辑</Button>
                            </div>
                        )
                    }
                }
            ],
            selectedItems1: [],
            selectedItems2: [],
            OPTIONS1: [],
            formLayout: 'horizontal',
            fileList: [],
            title: '',
            dialogTitle: ''
        }
    }

    componentDidMount() {
        this.getArticleList();
        this.getArticleCreaterList();
        this.getRecommend();
    }

    getArticleList() {
        let _this = this;
        ip.getArticleList(this.state.articleDto,res => {
            if(res.success){
                _this.setState({
                    articleList: res.data.list,
                    total: res.data.totalCount
                });
            }else{
                message.warning(res.msg);
            }
        })
    }

    getArticleCreaterList(){
        let _this = this;
        ip.getArticleCreaterList(res => {
            if(res.success){
                var data = [];
                res.data.forEach(item => {if(item){data.push(item)}});
                _this.setState({OPTIONS1: data});
            }else{
                message.warning(res.msg);
            }
        })
    }

    getRecommend(){
        let _this = this;
        ip.getRecommend(res => {
            if(res.success){
                _this.setState({title:res.data.title})
            }else{
                message.warning(res.msg);
            }
        })
    }

    // 回调函数,当前页面
    changePage(current){
        let data = Object.assign({}, this.state.articleDto, { page: current });
        this.setState({
            articleDto: data,
        },() => {
            this.getArticleList()
        })
    }

    // 回调函数,每页显示多少条
    changePageSize(current, size){
        let data = Object.assign({}, this.state.articleDto, { size: size }, {page: 1});
        this.setState({
            articleDto: data,
        },() => {
            this.getArticleList()
        })
    }

    showModel = () => {
        this.setState({visible2: true,dialogTitle: '新增文章',addArticleInfo:{}});
    }

    operateTySubscribe = type => {
        let _this = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(_this.state.dialogTitle === '新增文章'){
                    Object.assign(_this.state.addArticleInfo,
                        { publisherName:getCookie('alphaguUserName') },
                        { articleState:type },
                        { title:values.title },
                        { content:values.content },
                        { imgSrc:values.imgSrc },
                        { introduction:values.introduction },
                        { isBanner:values.isBanner })
                    ip.uploadArticle(_this.state.addArticleInfo,res => {
                        if(res.success){
                            message.success("添加成功");
                            _this.getArticleList();
                            _this.getRecommend();
                            _this.setState({visible2: false});
                            _this.props.form.resetFields();
                        }else{
                            message.warning(`${res.msg}`);
                        }
                    })
                }else if(_this.state.dialogTitle === '编辑文章'){
                    Object.assign(_this.state.addArticleInfo,
                        { articleState:type },
                        { title:values.title },
                        { content:values.content },
                        { imgSrc:values.imgSrc },
                        { introduction:values.introduction },
                        { isBanner:values.isBanner })
                    ip.updateArticle(_this.state.addArticleInfo,res => {
                        if(res.success){
                            message.success("编辑成功");
                            _this.getArticleList();
                            _this.getRecommend();
                            _this.setState({visible2: false});
                            _this.props.form.resetFields();
                        }else{
                            message.warning(`${res.msg}`);
                        }
                    })
                }
            }
        })
    }

    handleGetInputValue = event => {
        let value = event.target.value;
        let _this = this;
        value === '' ? Object.assign(_this.state.articleDto,{title:null}) : Object.assign(_this.state.articleDto,{title:value});
    }

    getStartDate = (e,date) => {
        let articleDto = Object.assign(this.state.articleDto,{startDate:date});
        this.setState({articleDto:articleDto})
        if(this.state.articleDto.endDate && date > this.state.articleDto.endDate){
            message.warning('开始日期要小于结束日期');
        }
    }

    getEndDate = (e,date) => {
        let articleDto = Object.assign(this.state.articleDto,{endDate:date});
        this.setState({articleDto:articleDto})
        if(this.state.articleDto.startDate && date < this.state.articleDto.startDate){
            message.warning('开始日期要小于结束日期');
        }
    }

    search = () => {
        let _this = this;
        let articleDto = Object.assign(_this.state.articleDto,{page:1});
        this.setState({
            articleDto:articleDto
        });
        this.getArticleList();
    }

    handleCancel = e => {
        this.setState({ visible2: false });
        this.props.form.resetFields();
    }

    delete(articleInfo){
        let _this = this;
        confirm({
            title: '确认删除这篇文章吗?',
            content: '',
            onOk() {
                ip.deleteArticle('?id='+articleInfo.id,res => {
                    if(res.data){
                        message.success('删除成功');
                        _this.getArticleList();
                    }else{
                        message.warning('删除失败');
                    }
                })
            },
            onCancel() {},
        });
    }

    edit(articleInfo){
        this.setState({visible2: true,dialogTitle:'编辑文章',addArticleInfo:articleInfo});
    }

    showDetails(articleInfo){
        this.setState({articleInfo:articleInfo,visible1: true});
    }

    handleChange1 = selectedItems => {
        let articleDto = Object.assign(this.state.articleDto,{publisherName:selectedItems});
        this.setState({
            articleDto: articleDto
        })
    }

    handleChange2 = selectedItems => {
        let articleDto = Object.assign(this.state.articleDto,{articleState:selectedItems});
        this.setState({
            articleDto: articleDto
        })
    }

    upload() {
        const input = document.getElementById('input')
        input.click()
    }

    change(e) {
        var _this = this;
        //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
        var AllowImgFileSize = 2100000;
        //拿到上传的图片
        var file = e.target.files[0];
        var files = file.name.split('.')
        var name = files[files.length - 1]
        var type = ['gif', 'png', 'jpg', 'svg', 'jpeg']
        // 判断图片格式
        if (type.indexOf(name) === -1) {
            message.info(`不支持.${name}格式`)
            return
        }
        // 判断图片大小
        if (AllowImgFileSize < file.result) {
            message.info('上传失败，请上传不大于2M的图片！');
            return
        }
        //将文件以Data URL形式读入页面
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let dataURL = reader.result;
            let image_base64=dataURL.split(",")[1];
            image_base64 = image_base64.replace("data:image/png;base64,","");
            let pictureindex = dataURL.indexOf(',');
            let picture = dataURL.substring(pictureindex+1);
            ip.uploadPic('name='+file.name+'&picture='+picture,res => {
                if(res.success){
                    let addArticleInfo = Object.assign(_this.state.addArticleInfo,{imgSrc:res.data});
                    _this.setState({addArticleInfo:addArticleInfo})
                }else{
                    message.warning(res.msg);
                }
            })
        }
    }

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const { getFieldDecorator } = this.props.form;
        const { selectedItems1 } = this.state;
        const { selectedItems2 } = this.state;
        const filteredOptions1 = this.state.OPTIONS1.filter(o => !selectedItems1.includes(o));
        const filteredOptions2 = OPTIONS2.filter(o => !selectedItems2.includes(o));
        const { addArticleInfo } = this.state;

        var inputStyle = { display:'none' };

        return (
            <div>
                <div className="table-search">
                    <Form>
                        <Form.Item label="文章标题">
                            <Input onChange={this.handleGetInputValue} placeholder="请输入文章标题" />
                        </Form.Item>
                        <Form.Item label="发布开始日期">
                            <DatePicker onChange={this.getStartDate} format={dateFormat}/>
                        </Form.Item>
                        <Form.Item label="发布结束日期">
                            <DatePicker onChange={this.getEndDate} format={dateFormat}/>
                        </Form.Item>
                        <Form.Item label="创建人">
                            <Select placeholder="请选择创建人" style={{ width: 200,marginRight: 10 }} onChange={this.handleChange1}>
                                <Select.Option key="" value="">全部</Select.Option>
                            {filteredOptions1.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label=" 发布状态">
                            <Select placeholder="请选择发布状态" style={{ width: 200,marginRight: 10 }} onChange={this.handleChange2}>
                            {filteredOptions2.map(item => (
                                <Select.Option key={item.value} value={item.value}>
                                    {item.label}
                                </Select.Option>
                            ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label=" " className="table-search-button">
                            <Button type="primary" onClick={this.search}>查询</Button>&nbsp;
                            <Button type="primary" onClick={this.showModel} icon="plus">发布文章</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table
                    rowKey="id"
                    scroll={{x:800}}
                    columns={this.state.columns}
                    dataSource={this.state.articleList}
                    bordered
                    title={() => {return (
                        <span className="table-title">
                            <span>当前推荐文章：{this.state.title}</span>
                        </span>
                    )}}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: () => `共${this.state.total}条`,
                        pageSize: this.state.articleDto.size,
                        current: this.state.articleDto.page,
                        total: this.state.total,
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
                    <p>文章标题：{this.state.articleInfo.title}</p>
                    <p>文章图标：<img className="model-dialog-img" src={this.state.articleInfo.imgSrc}/></p>
                    <p>创建人：{this.state.articleInfo.publisherName}</p>
                    <p>文章链接：{this.state.articleInfo.content}</p>
                </Modal>
                {/* 发布框 */}
                <Modal
                    layout={formLayout}
                    className="model-dialog"
                    title={this.state.dialogTitle}
                    visible={this.state.visible2}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form className="model-form">
                        <Form.Item label="文章标题" {...formItemLayout}>
                            {getFieldDecorator('title',  {
                                rules: [{ required: true, message: '文章标题不能为空，且标题长度不超过45',}],
                                initialValue: addArticleInfo.title
                                })(<Input placeholder="请输入文章标题" />)}
                        </Form.Item>
                        <Form.Item label="摘要" {...formItemLayout}>
                            {getFieldDecorator('introduction',  {
                                rules: [{ required: true, message: '摘要不能为空'}],
                                initialValue: addArticleInfo.introduction
                                })(<Input placeholder="请输入摘要" />)}
                        </Form.Item>
                        <Form.Item label="文章图标" {...formItemLayout}>
                            {getFieldDecorator('imgSrc', {
                                rules: [{ required: true, message: '文章图标不能为空'}],
                                initialValue: addArticleInfo.imgSrc})(<Input disabled />)}
                            <input onChange={this.change.bind(this)} accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" style={inputStyle} id="input" type="file" />
                            <Button onClick={this.upload.bind(this)}>
                                <Icon type="upload" />点击上传
                            </Button>
                        </Form.Item>
                        <Form.Item label="是否推荐" {...formItemLayout}>
                            {getFieldDecorator('isBanner', {
                                rules: [{ required: true, message: '请选择是否推荐'}],
                                initialValue: addArticleInfo.isBanner
                                })(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                  </Radio.Group>)}
                        </Form.Item>
                        <Form.Item label="文章链接" {...formItemLayout}>
                            {getFieldDecorator('content',  {
                                rules: [{ required: true, message: '文章链接不能为空'}],
                                initialValue: addArticleInfo.content
                                })(<TextArea autoSize={{ minRows: 4 }} placeholder="请输入文章链接" />)}
                        </Form.Item>
                        <Form.Item label="" className="model-form_button">
                            <Button type="primary" onClick={() => {this.operateTySubscribe(0)}}>保存</Button>
                            <Button type="primary" onClick={() => {this.operateTySubscribe(1)}}>保存并发布</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(ArticleTab)
