import React from 'react';
import './ChatRoom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ChatField from '../ChatField/ChatField'
import Chat from '../Chat/Chat'
import UserList from '../UserList/UserList'
import UsernameField from '../UsernameField/UsernameField'

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
                this.setState({
                    bubbles: [...this.state.bubbles, msg.data]
                })
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
            this.setState({
                bubbles: [
                    ...this.state.bubbles, 
                    {
                        username: this.state.username,
                        text: this.state.currentText
                    }
                ]
            })
            this.clearField()
        }
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
                        <UserList
                            className="user-list"
                            users={this.state.users} />
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