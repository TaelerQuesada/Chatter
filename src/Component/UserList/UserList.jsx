import React from 'react';
import './UserList.scss'
class UserList extends React.Component {
    render() {
        return (
            <div className="userlist">
                <text>Online Users</text>
                <br />
                { this.props.users.map(user => (
                    <div key={ user.connectionId }>
                        <text>{user.username}</text>
                        <br />
                    </div>
                ))}
            </div>
        )
    }
}

export default UserList