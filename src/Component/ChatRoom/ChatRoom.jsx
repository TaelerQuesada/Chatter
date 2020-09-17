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
            const dataFromServer = JSON.parse(message)
            console.log("Response: " + dataFromServer)
        }
        this.client.onmessage = (message) => {
            const res = JSON.parse(message)
            const msg = JSON.parse(res.data)
            if (msg.type === "sendMessage") {
                console.log("Received message from server!");
                this.setState({
                    bubbles: [...this.state.bubbles, msg.data]
                })
            } else if (msg.type === "userlogin") {
                console.log("user login!")
                this.setState({
                    users: [...this.state.users, msg.value]
                })
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
                "message": this.state.currentText
            }))
            this.clearField()
        }
    }

    handleUsernameSubmit(event) {
        event && event.preventDefault()
        console.log("HandleUsernameSubmit")
        if (this.state.username.length) {
            this.client.send(JSON.stringify({
                data: this.state.username,
                message: "userlogin"
            }))
            this.setState({
                loggedIn: true
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
                        onChange={this.onUsernameStateChange}
                        handleSubmit={this.handleUsernameSubmit}
                    />}
            </div>
        )
    }
}

export default ChatRoom