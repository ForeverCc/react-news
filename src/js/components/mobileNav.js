import React from 'react';
import { Tabs,Carousel } from 'antd';
import MobileList from './mobileList'
const  TabPane = Tabs.TabPane;


export default class MobileNav extends React.Component{
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
            <Tabs>
                <TabPane tab="头条" key="1">
                    <div className="carousel">
                        <Carousel { ...carouselSettings }>
                            <div><img src="./src/images/carousel_1.jpg" alt="1"/> </div>
                            <div><img src="./src/images/carousel_2.jpg" alt="1"/> </div>
                            <div><img src="./src/images/carousel_3.jpg" alt="1"/> </div>
                            <div><img src="./src/images/carousel_4.jpg" alt="1"/> </div>
                        </Carousel>
                    </div>
                    <MobileList count={20} type="top"/>
                </TabPane>
                <TabPane tab="社会" key="2">
                    <MobileList count={20} type="shehui"/>
                </TabPane>
                <TabPane tab="国内" key="3">
                    <MobileList count={20} type="guonei"/>
                </TabPane>
                <TabPane tab="国际" key="4">
                    <MobileList count={20} type="guoji"/>
                </TabPane>
                <TabPane tab="娱乐" key="5">
                    <MobileList count={20} type="yule"/>
                </TabPane>
            </Tabs>
        );
    }
}

