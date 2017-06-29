import React from 'react';
import { Router, Route, Link, browserHistory} from 'react-router'
import { Row, Col } from 'antd';
import { Card,Menu,  Button, message, Form,Tabs, Input, notification } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Comment extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:''  //评论
        };
    }
    //获取
    componentDidMount(){
        let myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey, myFetchOptions)
            .then( response => response.json() )
            .then( json => {
                this.setState({
                    comments: json
                });
            });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        let myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();
        // console.log(formData) //可以取到
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData.remark, myFetchOptions)             .then(response => response.json())
        .then(json => {
            this.componentDidMount();
        })
    };
    //收藏功能
    handleValue = () =>{
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey, myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            //收藏成功以后进行一下全局的提醒
            notification['success']({message: '提醒', description: '收藏此文章成功'});
        });
    };

    render(){
        let { getFieldDecorator } = this.props.form; //接收页面传来的参数
        const  { comments } = this.state;
        const  commentList = comments.length
            ?
                comments.map((commentItem, index)=>{
                    return(
                        <Card key={index} title={ commentItem.UserName } extra={<a href="#">发布于 {commentItem.datetime}</a>}>
                            <p>{ commentItem.Comments }</p>
                        </Card>)
                }).reverse()
            :
                '没有加载到任何评论';

        return(
            <div className="comment">
                <Row>
                    <Col span={24}>
                        <div className="comment-list">
                            { commentList }
                        </div>
                        <Form onSubmit={ this.handleSubmit.bind(this) }>
                            <FormItem label="您的评论">
                                { getFieldDecorator('remark', { initialValue: ''})(<Input type="textarea" placeholder="亲，随便写点什么吧"/>)
                                }
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={ this.
                                handleValue.bind(this) }>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Comment  = Form.create({})(Comment);
