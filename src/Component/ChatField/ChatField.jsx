import React from 'react';
import './Field.css'
import Arrow from '../../Assets/up-arrow-svgrepo-com.svg'
class ChatField extends React.Component {

    render() {
        return (
            <div className="bottom">
                <form onSubmit={this.props.handleSubmit} autoComplete="off">
                    <input
                        className="input"
                        id="name"
                        type="text"
                        placeholder={'Enter message...'}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                    <button 
                        type="submit"
                        className="button" >
                             <img src={ Arrow } className='submitarrow' />
                    </button>
                </form>
            </div>
        )
    }
}

export default ChatField