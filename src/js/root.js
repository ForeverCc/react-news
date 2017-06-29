import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import PcIndex from './components/pc-index';
import PcNewsDetails from './components/pcDetails';
import PcUserCenter from './components/pcUserCenter';
import MobileUserCenter from './components/mobileUserCenter';
import MobileIndex from './components/mobile-index';
import MobileNewsDetails from './components/mobileDatails';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';//引入样式




export default class Root extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                {/*PC*/}
                <MediaQuery query='(min-device-width: 1224px)'>
                    <Router history = {hashHistory}>
                        <Route path="/" component = { PcIndex }>
                        </Route>
                        <Route path="/details/:uniquekey" component = { PcNewsDetails }>
                        </Route>
                        <Route path="/usercenter" component = { PcUserCenter }>
                        </Route>
                    </Router>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    {/*<MobileIndex/>*/}
                    <Router history = {hashHistory}>
                        <Route path="/" component = {MobileIndex}>
                        </Route>
                        <Route path="/details/:uniquekey" component = {MobileNewsDetails}>
                        </Route>
                        <Route path="/usercenter" component = { MobileUserCenter }>
                        </Route>
                    </Router>
                </MediaQuery>
            </div>
            )
        };
    }

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
