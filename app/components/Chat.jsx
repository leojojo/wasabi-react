import React from 'react'
import { Link } from 'react-router'

export default class ChatBox extends React.Component {
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
          <table id="log">
          <tr>
            <th>USER</th>
            <th>MESSAGE</th>
            <th>TIMESTAMP</th>
          </tr>
            {this.props.Chat.map( (data, index) => {
                return(
                  <div key={index}>
                  <tr>
                    <td>{data.user}</td>
                    <td>{data.message}</td>
                    <td>{data.timestamp}</td>
                  </tr>
                  </div>
                )
              })
            }
        </table>
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
  /*
     handleInputChange = (event) => {
     this.setState({
     message: event.target.value
     });
     }*/
}
