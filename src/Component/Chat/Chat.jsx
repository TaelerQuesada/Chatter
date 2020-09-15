import React from 'react'
import ChatBubble from './ChatBubble'
import './Chat.css'
class Chat extends React.Component {

    render() {
        return (
            <div className="container">
                { this.props.bubbles.map(item => (
                    <ChatBubble
                        className="bubble"
                        text={ item }    
                    />
                )) }
            </div>
        )
    }
    
}

export default Chat