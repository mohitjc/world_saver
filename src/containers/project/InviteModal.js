import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { sendInvites } from '../../actions/project';
import Modal from 'react-modal';
import { Media, Col, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import userImg from './user.png';
import { apiUrl } from '../../environment';
import ApiClient from '../../api-client';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '22rem',
  },
};

const InviteModal = ({
  isOpen,
  user,
  handleModal,
  userRoles,
  selectedProject,
  sendInvite1,
  isAddFriendModal,
}) => {
  const [emails, set_emails] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  const setOptions = (friends) => {
    const arr = [];
    if (friends && friends.length) {
      friends.map((frd) => {
        if (frd.email) {
          arr.push({
            id: frd.id,
            value: frd.email,
            label: frd.fullName,
            image: frd.image,
          });
        }
      });
    }
    return arr;
  };

  const setRoleOptions = (roles) => {
    const arr = [];
    if (roles && roles.length > 0) {
      roles.map((role) => {
        arr.push({
          id: role.id,
          value: role.id,
          label: role.name,
        });
      });
    }
    return arr;
  };
  const userID = localStorage.getItem('userID');


  const getFriends = () => {
    let url = `${apiUrl}/friends?id=` + user.id;
    if (userID) {
      ApiClient.get(url, {}).then((res) => {
        if (res?.success) {
          setUserList(res?.friends);
          //console.log('ssss', res);
        }
      });
    }

  };

  const setEmails = (value) => {
    //console.log('valkue', value);
    set_emails(value);
  };

  const setRole = (role) => {
    setSelectedRole(role.id);
  };

  const CustomOption = (props) => {
    const { innerProps, innerRef } = props;
    return (
      <Media ref={innerRef} {...innerProps}>
        <Media left>
          <Image
            src={props.data.image ? `${apiUrl}/${props.data.image}` : userImg}
            roundedCircle
            className="invite-img"
          />
        </Media>
        <Media
          body
          style={{
            marginLeft: '1rem',
            marginBottom: '5px',
          }}
        >
          <Media heading> {props.data.label}</Media>
          <div style={{ color: 'grey', marginTop: '-5px' }}>
            {props.data.value}
          </div>
        </Media>
      </Media>
    );
  };

  return (
    <>
      <a data-toggle="modal" id="inviteBtn" data-target="#inviteModal"></a>
      <div className="modal fade" id="inviteModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div>
              <h3 className="email-tital">Select Friend</h3>
              {!isAddFriendModal ? (
                <label className="p-3">Please select users</label>
              ) : (
                ''
              )}
              <div className="px-3">
                <Select
                  options={setOptions(userList)}
                  isMulti={true}
                  onChange={(e) => setEmails(e)}
                  components={{ Option: CustomOption }}
                />

                {/* {!isAddFriendModal ?
                  <>
                    <label className="p-3">Please select a role</label>
                    <Select
                      options={setRoleOptions(userRoles)}
                      onChange={(e) => setRole(e)}
                    />
                  </>
                  : <></>
                } */}
              </div>

              <div className="text-right p-3">
                <Button
                  variant="secondary"
                  id="inviteClose"
                  data-dismiss="modal"
                  onClick={handleModal}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  className="invite primary-btn ml-3"
                  onClick={() =>
                    sendInvite1({
                      projectId: selectedProject,
                      users: emails,
                      role: selectedRole,
                      isAddFriendModal,
                    })
                  }
                >
                  Send Invite
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteModal;
