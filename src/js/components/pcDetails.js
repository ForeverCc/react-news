import React from 'react';
import PcHeader from './pcHeader';
import PcFooter from './pcFooter';
import Comment from './comment';
import PcNewsImage from './pcNewsImages'
import { Col, Row, BackTop } from 'antd';

export default class PcNewsDetails extends React.Component{
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
            <div>
                <PcHeader />
                <Row>
                    <Col span={1}>
                    </Col>
                    <Col span={14}  className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={ this.createMarkUp() }>
                        </div>
                        <hr />
                        <Comment uniquekey = { this.props.params.uniquekey }/>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={6}>
                        <PcNewsImage count={60} type="guoji" width="276px" cardTitle="国际头条" imgWidth="112px"/>
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
                <PcFooter/>
                <BackTop/> {/*返回顶部的组件;*/}
            </div>
        )
    }
}
