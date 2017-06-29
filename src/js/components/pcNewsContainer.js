//PC端的新闻页面容器;

import React from 'react';
import PcNews from './pcNews';
import PcNewsImage from './pcNewsImages';
import PcProducts from './pcProducts';
import { Row, Col, Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;

export default class PcNewsContainer extends React.Component{
    constructor(){
        super();
    }
    render(){
        //配置轮播图
        const carouselSettings = {
           dots: true,
           infinite: true,
           speed: 500,
           slidesToShow: 1,
           slidesToScroll: 1,
           autoplay: true,
           autoplaySpeed: 2000
           //arrows: true
        };
        return(
           <Row>
               <Col span={1}></Col>
               <Col span={22} className="container">
                   <div className="left">
                       <div className="carousel">
                           <Carousel { ...carouselSettings }>
                               <div><img src="./src/images/carousel_1.jpg" alt="1"/> </div>
                               <div><img src="./src/images/carousel_2.jpg" alt="1"/> </div>
                               <div><img src="./src/images/carousel_3.jpg" alt="1"/> </div>
                               <div><img src="./src/images/carousel_4.jpg" alt="1"/> </div>
                           </Carousel>
                       </div>
                       <div>
                           <PcNewsImage count={6} type="guoji" width="400px" cardTitle="国际头条" imgWidth="112px"/>
                       </div>
                   </div>
                   <div>
                       <Tabs className="tabs_news">
                           <TabPane tab="头条新闻" key="1">
                               <PcNews count={22} type="top" width="100%" bordered="false"/>
                           </TabPane>
                           <TabPane tab="国际" key="2">
                               <PcNews count={22} type="guoji" width="100%" bordered="false"/>
                           </TabPane>
                       </Tabs>
                       <Tabs className="tabs_product">
                           <TabPane tab="产品列表">
                               <PcProducts/>
                           </TabPane>
                       </Tabs>
                   </div>
                   <div>
                       <PcNewsImage count={16} type="guonei" width="100%" cardTitle="国内新闻" imgWidth="140px"/>
                   </div>
                   <div>
                       <PcNewsImage count={16} type="yule" width="100%" cardTitle="娱乐新闻" imgWidth="140px"/>
                   </div>
               </Col>
               <Col span={1}></Col>
           </Row>
       );
        }
}
