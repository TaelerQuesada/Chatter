import React from 'react'
import ChatBubble from './ChatBubble.jsx'
import './Chat.css'
class Chat extends React.Component {

    render() {
        return (
            <div className="container">
                { this.props.bubbles.map(item => (
                    <ChatBubble
                        className="bubble"
                        item={ item }    
                    />
                )) }
            </div>
        )
    }
    
}

export default Chat