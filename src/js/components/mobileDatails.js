import React from 'react';
import MobileHeader from './mobileHeader';
import MobileFooter from './mobileFooter';
import Comment from './comment';
import { Col, Row, BackTop } from 'antd';

export default class MobileNewsDetails extends React.Component{
    constructor(){
        super();

        this.state = {
            eachNews: ''//每条新闻的内容
        }
    }
    //获取
    componentDidMount(){
        let myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=' + this.props.params.uniquekey, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    eachNews: json
                });

                document.title = this.state.eachNews.title + '-React News | React Demo'
            })
    }
    //设置
    createMarkUp = () =>{
        return { __html: this.state.eachNews.pagecontent }; //读取
    };
    render(){
        return(
            <div id="mobileDatailsContainer">
                <MobileHeader />
                <div className="ucmobileList">
                    <Row>
                        <Col span={24}  className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={ this.createMarkUp() }>
                            </div>
                            <hr />
                            <Comment uniquekey = { this.props.params.uniquekey }/>
                        </Col>
                    </Row>
                    <BackTop/> {/*返回顶部的组件;*/}
                </div>
                <MobileFooter/>
            </div>
        )
    }
}
