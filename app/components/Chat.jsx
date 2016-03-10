import React from 'react'
import { Link } from 'react-router'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }
  render() {
    console.log('Chat props',this.props);
    return(
        <div>
        <div>
          <input type='text' onChange={this.handleInputChange}
          />
          <button type='button' onClick={this.props.onSend.bind(this, this.state.message)}>send</button>
        </div>
        </div>
        )
  }

  handelInputChange = (event) => {
      this.setState({
        message: event.target.value
      });
  }
}
