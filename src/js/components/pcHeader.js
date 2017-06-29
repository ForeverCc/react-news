//PC端头部组件

import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import {Row, Col} from 'antd';
import {
    Menu,
    Icon,
    Modal,
    Button,
    message,
    Tabs,
    Checkbox,
    Form,
    Input
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PcHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false, //登录框的初始状态不可见;
            current: 'headline', //导航栏的默认状态;
            action: 'login',
            isLogin: false, //是否登录  用来切换窗口
            userName: '',
            userid: 0
        }
    }
    //即将加载组件时，防止刷新会返回原来的未登录状态
    componentWillMount() {

        if (localStorage.userid != '') {
            this.setState({isLogin: true, userName: localStorage.userName, userid: localStorage.userid});
        }
    }
    componentWillUnmount() {
        this.setState({isLogin: false});
    }
    //Menu的状态切换
    handleClick = (e) => {
        if (e.key == 'register') {
            this.setState({current: 'register', modalVisible: true});
        } else {
            this.setState({current: e.key});
        }
    };
    //数据提交
    handleSubmit(e) {
        //点击注册 提交数据
        e.preventDefault(); //阻止事件默认行为;
        let myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue(); //获取输入的表单信息
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.reg_userName + "&r_password=" + formData.reg_password + "&r_confirmPassword=" + formData.reg_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({userName: json.NickUserName, userid: json.UserId});
            localStorage.userid = json.UserId;
            localStorage.userName = json.NickUserName;
        });

        //如果登录成功，则要切换是否登陆的状态
        if (this.state.action == 'login') {
            this.setState({isLogin: true})
        }
        message.success('请求成功');
        this.setState({modalVisible: false});

    };
    //我在代码中已经取消了对话框的底部按钮;这两个函数参考一下;
    handleCancel() {
        this.setState({modalVisible: false});
    };
    handleOk(e) {
        //console.log(e);
        this.setState({modalVisible: false})
    };
    handleTabsChange = (key) => {
        if (key == 1) {
            this.setState({action: 'login'});
        } else {
            this.setState({action: 'register'});
        }
    };
    //退出功能;
    loginOut = () => {
        localStorage.userid = '';
        localStorage.userName = '';
        this.setState({isLogin: false})
    };
    render() {
        let {getFieldDecorator} = this.props.form; //接收页面传来的参数
        const userLogin = this.state.isLogin
            ? <Menu.Item key="loginOut" className="register">
                    <Link target="_blank" to={`/usercenter`}>
                        <Button type="dashed" htmlType="button">{this.state.userName}</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="ghost" htmlType="button" onClick={this.loginOut.bind(this)}>退出</Button>
                </Menu.Item>
            : <Menu.Item key="register" className="register">
                <Icon type="user"/>注册/登录
            </Menu.Item>;
        return (
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>React-xc</span>
                        </a>
                    </Col>
                    <Col span={18}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="headline">
                                <Icon type="appstore"/>
                                <Link to={`/`}>头条</Link>
                            </Menu.Item>
                            <Menu.Item key="international">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="china">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="society">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="fun">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="sport">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="technology">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="fashion">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userLogin}
                        </Menu>
                        <Modal title="用户信息" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={this.handleCancel.bind(this)} onOk={this.handleOk.bind(this)} okText="关闭" footer={null}>
                            <Tabs type="card" onChange={this.handleTabsChange.bind(this)}>
                                <TabPane tab="登录" key="1">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('userName')(<Input type="text" placeholder="请输入您的帐号"/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(<Input type="password" placeholder="请输入您的密码"/>)}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>

                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('reg_userName')(<Input type="text" placeholder="请输入您的帐号"/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('reg_password')(<Input type="password" placeholder="请输入您的密码"/>)}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('reg_confirmPassword')(<Input type="password" placeholder="请确认您的密码"/>)}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>

                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header>
        )
    }
}

export default PcHeader = Form.create({})(PcHeader);
