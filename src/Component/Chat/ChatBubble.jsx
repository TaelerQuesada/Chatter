import React from 'react'
import './Chat.css'
class ChatBubble extends React.Component {

    render() {
        return (
            <div>
                <text className="bubble"> {this.props.item.text}</text>
                { this.props.item.isLast &&
                    <text className="bubbleName">
                        { this.props.item.username }
                    </text>
                }
            </div>
        )
    }
}

export default ChatBubble