import React from 'react';
import { Card } from 'antd';
import { Router, Route, Link, browerHistory } from 'react-router';

export default class PcNewsImage extends React.Component{
    constructor(){
        super();
        this.state = {
            news: ''
        }
    };
    componentWillMount(){
        let myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    news: json
                })
            })
    };
    render(){
        const { news } = this.state;
        const imgStyle = {
            display: 'block',
            width: this.props.imgWidth,
            height: '90px'
        };
        const h3Style = {
            width: this.props.imgWidth,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        };
        const newsList = news.length
            ? news.map(( item, index ) => (
            <div key={ index } className="imageblock">
                <Link to={`details/${ item.uniquekey }`} target="_blank">
                    <div className="custom-image">
                        <img alt={ item.title } style={ imgStyle } src={ item.thumbnail_pic_s }/>
                    </div>
                    <div className="custom-card">
                        <h3 style={ h3Style }>{ item.title }</h3>
                        <p style={ h3Style }>{ item.author_name }</p>
                    </div>
                </Link>
            </div>
        ))
            : '没有加载到任何新闻';
        return(
            <div className="topNewsList">
                <Card title={ this.props.cardTitle } bordered={true} style={{ width: this.props.width }}>
                    <ul>
                        { newsList }
                    </ul>
                </Card>
            </div>
        )
    }
}
