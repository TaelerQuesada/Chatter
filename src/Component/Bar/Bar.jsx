import React from 'react';
import BarButton from '../BarButton/BarButton';
class Bar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {}
    }
    
    render() {
        return  this.props.items.map(item => 
            <BarButton name={ item.name }></BarButton>)
    }   
}

export default Bar;