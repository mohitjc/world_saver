import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Card, Avatar, Input, Typography } from 'antd';
import './index.css';

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoggedIn: false,
      messages: [],
    };

  }

  onButtonClicked = (value) => {
    client.send(
      JSON.stringify({
        type: 'message',
        msg: value,
        user: this.state.userName,
      })
    );
    this.setState({ searchVal: '' });
  };
  componentDidMount() {
    this.setState({ userName: this.props.user.fullName });
    client.onopen = () => {

    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);

      if (dataFromServer.type === 'message') {
        this.setState((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.msg,
              user: dataFromServer.user,
            },
          ],
        }));
      }
    };
  }

  render() {
    return (
      <div className="main" id="wrapper">
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 50,
            }}
            id="messages"
          >
            {this.state.messages.map((message) => (
              <Card
                key={message.msg}
                style={{
                  margin: '16px 4px 0 4px',
                  alignSelf:
                    this.state.userName === message.user
                      ? 'flex-end'
                      : 'flex-start',
                }}
                loading={false}
              >
                <Meta
                  avatar={
                    <Avatar
                      style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                    >
                      {message.user[0].toUpperCase()}
                    </Avatar>
                  }
                  title={message.user + ':'}
                  description={message.msg}
                />
              </Card>
            ))}
          </div>
          <div className="bottom">
            <Search
              placeholder="input message and send"
              enterButton="Send"
              value={this.state.searchVal}
              size="large"
              onChange={(e) => this.setState({ searchVal: e.target.value })}
              onSearch={(value) => this.onButtonClicked(value)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
