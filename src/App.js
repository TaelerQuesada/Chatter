import React from 'react';
import './App.css';
import ChatRoom from '../src/Component/ChatRoom/ChatRoom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  } 


  render() {
    return (
      <div className="App">
        <ChatRoom/>
      </div>
    )
  }
}

  export default App;