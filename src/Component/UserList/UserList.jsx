import React from 'react';
import './UserList.scss'
class UserList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="userlist">
                <text>Online Users</text>
                <br />
                { this.props.users.map(user => (
                    <div>
                        <text>{user}</text>
                        <br />
                    </div>
                ))}
            </div>
        )
    }
}

export default UserList