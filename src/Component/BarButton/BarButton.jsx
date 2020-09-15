import React from 'react';
class BarButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
       console.log(this.state.name + " clicked!")
    }

    render() {
    return <button onClick={ this.handleClick }>{ this.state.name }</button>
    }
}

export default BarButton;