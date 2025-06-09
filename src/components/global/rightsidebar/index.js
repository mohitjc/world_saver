import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import ChatWrapper from '../chatwraper';
import { getFriends } from '../../../actions/user';
import { apiUrl } from '../../../environment';
import UserAvtar from '../../../assets/img/icon/user-avtar.png';
// SOCKET
import { socketConnection } from '../../../utilities/socket';

const RightSidebar = (props) => {
  const [chatwraper, setChatWrapper] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socketConnection.on('receive-message', (data) => {
      // console.log("socketConnection", data)
      if (props.user.email === data.to) {
        const updatedUser = users.map((x) => {
          if (x.email === data.from) {
            const isExist = chatwraper.find((y) => y.email === x.email);
            if (!isExist) x['unreadMsg'] = true;
            else x['unreadMsg'] = false;
          }
          return x;
        });

        // setUsers(() => [...updatedUser])
      }
    });
    getFriendList();
  }, []);

  const getFriendList = () => {
    const token0 = localStorage.getItem('headertoken');
    props.getFriends({ id: props.user.id }, token0, (res) => {
      if (res.success) {
        setUsers(res.friends);
      }
    });
  };
  const append = (array, setArray, data) => {
    if (array.length > 2) return false;
    let isError = false;
    chatwraper &&
      chatwraper.map((newdata) => {
        if (data.id == newdata.id) {
          isError = true;
          return false;
        }
      });

    if (!isError) {
      data['unreadMsg'] = false;
      setChatWrapper((preSate) => [...preSate, data]);
    }

    ChatNotification();
  };

  const ChatNotification = () => {
    let el = document.getElementById('ChatNotification');
    if (el) el.click();
  };

  const remove = (array, setArray, i) => {
    setArray(() => {
      const list = array.filter((item, j) => i !== j);
      return list;
    });
  };

  const close = (e) => {
    remove(chatwraper, setChatWrapper, e);
  };

  return (
    <>
      <a
        className="d-none"
        onClick={() => getFriendList()}
        id="getFriendListJs"
      ></a>
      <div className="rightsidebar shadow">
        <div className="message-heading">
          <h5>Messages</h5>
          <i
            className="fa fa-times close-btn"
            title="Close"
            onClick={() => props.setClose(false)}
          ></i>
        </div>
        {users && users.length ? (
          <div className="userlist userlist-height">
            {users &&
              users.map((user, i) => {
                const avtar = user.image ? `${apiUrl}${user.image}` : UserAvtar;
                return (
                  <a
                    style={{ textDecoration: 'none' }}
                    key={`frnd-name-${i}`}
                    className="user-item"
                    onClick={(e) => append(chatwraper, setChatWrapper, user)}
                  >
                    {user.count ? <p className="count">{user.count}</p> : ''}
                    <img src={avtar} />
                    <span>
                      {user.fullName}{' '}
                      {user.unreadMsg && <span className="message-alert" />}
                    </span>
                  </a>
                );
              })}
          </div>
        ) : (
          <div className="no_image">
            {/* <img src={no_image} /> */}
            No Messages.
          </div>
        )}
      </div>

      <div className="chat-wrapper">
        {chatwraper &&
          chatwraper.map((item, i) => {
            return (
              <div key={`chat-with-${i}`}>
                <ChatWrapper
                  key={`chat-with-${i}`}
                  id={i}
                  user={item}
                  close={close}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getFriends,
})(RightSidebar);
