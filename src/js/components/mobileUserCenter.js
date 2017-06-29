import React from 'react';
import MobileHeader from './mobileHeader';
import MobileFooter from './mobileFooter';
import { Row, Col, Menu, Card,  Button, message, Tabs, Form, Input, notification } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {

        }
    }
    //获取
    componentDidMount(){

    }

    render(){
        return(
            <div>
                <MobileHeader />
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏" key="1">

                            </TabPane>
                            <TabPane tab="我的评论" key="2">

                            </TabPane>
                            <TabPane tab="设置头像" key="13">

                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>

                <MobileFooter/>
            </div>

        )
    }
}


