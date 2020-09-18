import React from 'react'
import './Chat.css'
class ChatBubble extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            item: this.props.item
        }
    }

    render() {
        return (
            <div>
                <text>{ this.state.item.username }</text>
                <text className="bubble"> { this.state.item.text }</text>
            </div>
        )
    }
}

export default ChatBubble