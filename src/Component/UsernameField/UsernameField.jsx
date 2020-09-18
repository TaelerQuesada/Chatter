import React from 'react'
import './UsernameField.scss'

class UsernameField extends React.Component {
    render() {
        return (
            <div className="center">
                <div>{ this.props.label }</div>
                <form onSubmit={ this.props.handleSubmit } autoComplete="off">
                    <input
                        id="name"
                        type="text"
                        className="input"
                        placeholder={ 'Enter username' }
                        value={ this.props.value }
                        onChange={ this.props.onChange }
                    />
                    <button
                        type="submit"
                        className="submit">
                        Send
                    </button>
                </form>
            </div>
        )
    }
}

export default UsernameField