import React from 'react';
import './ChatRoom.css'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ChatField from '../ChatField/ChatField.jsx'
import Chat from '../Chat/Chat.jsx'
import UserList from '../UserList/UserList.jsx'
import UsernameField from '../UsernameField/UsernameField.jsx'
import Canvas from '../Canvas/Canvas.jsx'

const clientURL = 'wss://s45vegoyui.execute-api.us-east-2.amazonaws.com/Test'

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            currentText: '',
            greeting: '',
            loggedIn: false,
            value: null,
            bubbles: [],
            users: []
        }

        this.client = new W3CWebSocket(clientURL)

        this.handleChange = this.handleChange.bind(this)
        this.handleChatSubmit = this.handleChatSubmit.bind(this)
        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this)

    }

    componentDidMount() {
        this.client.onopen = (message) => {
            console.log("WebSocket Client Connected")
        }
        this.client.onmessage = (message) => {
            const msg = JSON.parse(message.data)
            if (msg.type === "sendMessage") {
                console.log("Received message from server!");
                this.handleChatBubbles(false, msg.data)
            } else if (msg.type === "userlogin") {
                console.log("user login!")
                this.setState({
                    users: [...this.state.users, msg.data]
                })
            } else if (msg.type === "userdisconnect") {
                console.log("userdisconnect");
                this.setState((prevState) => ({
                    users: prevState.users.filter((_,i) => i.connectionId !== msg.data)
                }))
            }
        }
    }


    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    onEditorStateChange = (text) => {
        this.setState({ currentText: text.target.value });
    }

    handleChatSubmit(event) {
        event && event.preventDefault();
        console.log("HandleSubmit")
        if (this.state.currentText.length) {
            this.client.send(JSON.stringify({
                "action": "OnMessage",
                "message": {
                    "type": "message",
                    "text" :this.state.currentText,
                    "username": this.state.username
                }
            }))

            this.handleChatBubbles(true)
            this.clearField()
        }
    }

    //sentBySelf : boolean to determine if curr bubble was sent by the client or not.
    handleChatBubbles(sentBySelf, data) {
        const bubbles = this.state.bubbles;
        const previousBubble = bubbles[bubbles.length - 1]
        if (sentBySelf) {
            if (previousBubble && previousBubble.username === this.state.username) {
                previousBubble.isLast = false;
            }
            this.trimBubble()
            this.addBubble(previousBubble)
            this.addBubble({ 
                username: this.state.username,
                text: this.state.currentText,
                isLast: true
            })
        } else {
            if (previousBubble && previousBubble.username === data.username) {
                previousBubble.isLast = false;
            }
            this.trimBubble()
            this.addBubble(previousBubble)
            data.isLast = true;
            this.addBubble(data)
        }
    }

    trimBubble() {
        const bubbles = this.state.bubbles
        this.setState({
            bubbles: [
                ...bubbles.slice(0, bubbles.length - 1)
            ],
        })
    }

    addBubble(bubble) {
        this.setState({ 
            bubbles: [
                ...this.state.bubbles, bubble
            ]
         })
    }

    handleUsernameSubmit(event) {
        event && event.preventDefault()
        console.log("HandleUsernameSubmit")
        if (this.state.username.length) {
            this.client.send(JSON.stringify({
                "action": "OnMessage",
                "message": {
                    "type": "userlogin",
                    "username": this.state.username
                }
            }))
            this.setState({
                loggedIn : true
            })
        }
    }

    onUsernameStateChange = (text) => {
        this.setState({ username: text.target.value })
    }

    clearField() {
        this.setState({ currentText: '' })
    }

    render() {

        const isLoggedIn = this.state.loggedIn

        return (
            <div className="App">
                { isLoggedIn ?
                    <div className="flex-container">
                        <div className="chat-flex">
                            <Chat
                                bubbles={this.state.bubbles}
                            />
                        </div>
                        <Canvas
                            width={ 850 }
                            height={ 850 }   
                            client={ this.client }  
                        />
                        <UserList
                            className="user-list"
                            users={this.state.users}    
                        />
                        <ChatField
                            value={this.state.currentText}
                            onChange={this.onEditorStateChange}
                            handleSubmit={this.handleChatSubmit}
                        />
                    </div> :
                    <UsernameField
                        value={this.state.username}
                        label={ 'Username' }
                        onChange={this.onUsernameStateChange}
                        handleSubmit={this.handleUsernameSubmit}
                    />}
            </div>
        )
    }
}

export default ChatRoom