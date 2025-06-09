import React, { useState, useEffect, useRef } from 'react';
import { useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
// SOCKET
import { socketConnection } from '../../../utilities/socket';
// ACTIONS
import { getFriendChat } from '../../../actions/user';
import Axios from 'axios';
import { useSidebar } from '../../provider/Porvider';
import { Anchorme } from 'react-anchorme';

const ChatWrapper = ({ user, close, id, getFriendChat }) => {
  const [message, setMessage] = useState('');
  const [messageList, updateMessageList] = useState([]);
  const [readmessages, setReadmessages] = useState();
  const { setCourseId, setChaptersId } = useSidebar();
  const [isMin, setMin] = useState(false);

  useEffect(() => {
    if (readmessages) {
      readmessages.forEach((items) => {
        setCourseId(items?.to || '');
        setChaptersId(items?.from || '');
      });
    }
  }, [readmessages]);

  const userReducer = useSelector((state) => state.user);
  const chatBoxRef = useRef();
  useEffect(() => {
    socketConnection.on('receive-message', (data) => {
      console.log(data, 'data');
      chatBoxRef.current &&
        chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
      if (
        (data.to == user.email && data.from == userReducer.email) ||
        (data.from == user.email && data.to == userReducer.email)
      )
        updateMessageList((pre) => {
          pre.push(data);
          return [...pre];
        });
    });
  }, []);

  useEffect(() => {
    getActiveFriendChat();
  }, [id]);

  function getActiveFriendChat(data) {
    const token08 = localStorage.getItem('headertoken');
    getFriendChat(
      { user_id: userReducer.id, friend_id: user.id },
      token08,
      (res) => {
        if (res.success) {
          setReadmessages(res.messages.messages);
          updateMessageList(res.messages.messages || []);
          updateStatus();
        }
      }
    );
  }

  const updateStatus = () => {
    const token08 = localStorage.getItem('headertoken');
    const getUrl = `https://chat.crowdsavetheworld.com/admin/update_readStatus?receiver=${userReducer.email}&sender=${user.email}`;
    Axios.put(getUrl, `Bearer ${token08}`).then((result) => {
      let el = document.getElementById('ChatNotification');
      if (el) el.click();
      let el2 = document.getElementById('getFriendListJs');
      if (el2) el2.click();
      chatBoxRef.current &&
        chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);
    });
  };

  const minimize = () => {
    setMin(!isMin);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      to: user.email,
      from: userReducer.email,
      message: message,
    };

    socketConnection.emit('new-message', data);
    updateStatus();
    setMessage('');
  };

  return (
    <>
      <div className="msg_box shadow">
        <div className="msg_head">
          <div onClick={() => {}}>
            <Link to={`/${user.username}`}>{user && user.fullName} </Link>
          </div>

          <div>
            <span
              className="minusbutt cursor-pointer"
              onClick={() => minimize()}
            >
              <i
                className={`fa ${!isMin ? 'fa-minus' : 'fa-plus'}`}
                aria-hidden="true"
              ></i>
            </span>
            <span className="close1 ml-2" onClick={() => close(id)}>
              <i className={`fa fa-times`} aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className={`msg_wrap ${isMin ? 'd-none hidecls' : ''}`}>
          <div className="msg_body" id="msg_body" ref={chatBoxRef}>
            {messageList.map((msg, index) => {
              return (
                <>
                  {msg.to || msg.from == user.email ? (
                    <div
                      key={index}
                      id={'index' + index}
                      className={
                        user.email === msg.to ? 'user-right' : 'user-left'
                      }
                    >
                      {/* <img src={msg.img} /> */}
                      <div className="text">
                        <Anchorme
                          style={{
                            color: 'blue',
                          }}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {msg.message}
                        </Anchorme>
                        <div className="timedate">
                          {moment(msg.date_time).format('MM/DD/YYYY hh:mm a')}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
          </div>
          <form onSubmit={formSubmitHandler}>
            <div className="msg_footer">
              <input
                type="text"
                placeholder="Enter message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="btn" disabled={!message}>
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getFriendChat,
})(ChatWrapper);
