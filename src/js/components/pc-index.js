import React from 'react';
import PcHeader from './pcHeader';
import PcNewsContainer from './pcNewsContainer';
import PcFooter from './pcFooter';

export default class PcIndex extends React.Component{
    render(){
        return(
            <div>
                <PcHeader/>
                <PcNewsContainer/>
                <PcFooter/>
            </div>
        );
    }
}
