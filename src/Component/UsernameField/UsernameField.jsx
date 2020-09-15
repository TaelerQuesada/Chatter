import React from 'react'
import { ReactComponent as Logo } from '../../Assets/up-arrow-svgrepo-com.svg'
import './UsernameField.css'

class UsernameField extends React.Component {
    render() {
        return (
            <div className="center">
                <form onSubmit={ this.props.handleSubmit } autoComplete="off">
                    <input
                        id="name"
                        type="text"
                        placeholder={ 'Enter username' }
                        value={ this.props.value }
                        onChange={ this.props.onChange }
                    />
                    <button
                        type="submit"
                        className="botton">
                            
                        Send
                    </button>
                </form>
            </div>
        )
    }
}

export default UsernameField