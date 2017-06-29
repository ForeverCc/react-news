import React from 'react';
import { Row, Col } from 'antd';

export default class PcFooter extends React.Component{
    render(){
        return(
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col className='footer' span={20}>&copy;&nbsp;React demo by xc! 2017</Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    }
}
