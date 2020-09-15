import React from 'react'
import './Chat.css'
class ChatBubble extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: this.props.text
        }
    }

    render() {
        return (
            <div className="bubble">
                <text>{ this.state.text }</text>
            </div>
        )
    }
}

export default ChatBubble