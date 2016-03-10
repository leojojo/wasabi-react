import React from 'react'
import { Link } from 'react-router'

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

compnentDidMount() {
this.setState({
  message: ''
});
}

  render() {
    console.log('Chat props',this.props);
    return(
        <div>
        <div>
        {this.props.Chat.map = (user, message, timestamp) => {
          return(
                <div>
                  <span>{user}</span>
                  <span>{message}</span>
                  <span>{timestamp}</span>
                </div>
              )
          }
        }
        </div>

        <div>
        <input type='text' 
        onBlur={this.handleInputChange} 
        />
        <button type='button' onClick={this.props.onSend.bind(this, this.state.message)}>send</button>
        </div>
        </div>
        )
  }

  handleInputChange = (event) => {
    this.setState({
      message: event.target.value
    });
  }
}
