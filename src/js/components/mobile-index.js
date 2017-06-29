import React from 'react';
import MobileHeader from './mobileHeader';
import MobileFooter from './mobileFooter';
import MobileNav from './mobileNav';

export default class MobileIndex extends React.Component{
    render(){
        return(
            <div>
                <MobileHeader/>
                <MobileNav/>
                <MobileFooter/>
            </div>
        );
    }
}
