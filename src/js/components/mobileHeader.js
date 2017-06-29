//手机端

import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { Menu, Icon, Modal, Button, message, Tabs, Checkbox, Form, Input } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class MobileHeader extends React.Component{
    constructor(){
        super();
        this.state= {
            modalVisible: false, //登录框的初始状态不可见;
            current: 'headline', //导航栏的默认状态;
            action: 'login',
            isLogin: false, //是否登录  用来切换窗口
            userNickName: '', //登录名称 默认为空
            userId: 0
        };
    };

    /*
     handleClick(e){
     if(e.key == 'register'){
     this.setState({
     current: 'register',
     modalVisible: true
     })
     }else{
     this.setState({
     current:e.key
     })
     }
     };*/
    //表单的onSubmit事件  触发提交
    handleSubmit = (e) =>{
        //点击注册 提交数据
        e.preventDefault(); //阻止事件默认行为;
        let myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();//获取输入的表单信息
        console.log(formData);

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" +
            this.state.action +  //这里来辨别是login  还是register
            "&username=" + formData.userName +
            "&password=" + formData.password +
            "&reg_userName=" + formData.reg_userName +
            "&reg_password=" + formData.reg_password +
            "&reg_passwordConfirm=" + formData.reg_passwordConfirm,
            myFetchOptions)
            .then(response => response.json())
            .then((json) => {
                this.setState({
                    userNickName:json.NickUserName,
                    userId: json.userId
                })
            });
        //如果登录成功，则要切换是否登陆的状态
        if(this.state.action == 'login'){
            this.setState({
                isLogin: true
            })
        }
        message.success('请求成功');
        this.setState({
            modalVisible: false
        });

    };
    handleCancel = () =>{
        this.setState({
            modalVisible: false
        });
    };
    handleOk = (e) => {
        //console.log(e);
        this.setState({
            modalVisible: false
        })
    };
    //Tabs选项卡注册与登录的切换
    handleTabsChange = (key) =>{
        if(key == 1){
            this.setState({
                action: 'login'
            });
        }else{
            this.setState({
                action: 'register'
            });
        }
    };
    //移动端点击登录注册的按钮让对话框显示
    handleLogin = () =>{
        this.setState({
            modalVisible: true
        })
    };
    render(){
        let { getFieldDecorator } = this.props.form; //接收页面传来的参数
        const userShow = this.state.isLogin?
            <Link to={`/usercenter`}>
                <Icon type="inbox"/>
            </Link>:
            <Icon type="setting" onClick = { this.handleLogin.bind(this) }/>;
        return(
            <div id="mobile">
                <header>
                    <Link to={`/`}>
                        <img src="./src/images/logo.png" alt="logo" />
                        <span>React-xc</span>
                    </Link>
                    { userShow } {/* 点击登录 */}
                </header>
                <Modal title="用户信息" wrapClassName="vertical-center-modal" visible={ this.state.modalVisible } onCancel={ this.handleCancel.bind(this) } onOk={ this.handleOk.bind(this) } okText="关闭" footer={null}>
                    <Tabs type="card" onChange={ this.handleTabsChange.bind(this) }>
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={ this.handleSubmit.bind(this) }>
                                <FormItem label="账户">
                                    { getFieldDecorator('userName')(<Input type="text" placeholder="请输入您的帐号"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    { getFieldDecorator('password')(<Input type="password" placeholder="请输入您的密码"/>
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>

                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit = { this.handleSubmit.bind(this) } >
                                <FormItem label="账户">
                                    { getFieldDecorator('reg_userName')(<Input type="text" placeholder="请输入您的帐号"/>
                                    )}
                                </FormItem>
                                <FormItem label="密码">
                                    { getFieldDecorator('reg_password')(<Input type="password" placeholder="请输入您的密码"/>
                                    )}
                                </FormItem>
                                <FormItem label="确认密码">
                                    { getFieldDecorator('reg_passwordConfirm')(<Input type="password" placeholder="请确认您的密码"/>
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>

                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default  MobileHeader = Form.create({})(MobileHeader);