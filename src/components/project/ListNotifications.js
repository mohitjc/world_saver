import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardText, CardBody } from 'reactstrap';
import {
  acceptOrRejectInvitations,
  getInvitations,
} from '../../actions/notifications';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';

const CreatePost = ({ invitation, accessToken, userId }) => {
  localStorage.setItem('Token', accessToken);
  const [isloader, setLoader] = useState(false);
  const [image, setImage] = useState('');
  const [friendid, setfriendid] = useState({});

  const dispatch = useDispatch();

  const acceptInvitation = (invitation, event) => {
    let userid = localStorage.getItem('userID');
    let postObj = {
      notification_id: invitation.id,
      status: 'accepted',
      friendStatus: true,
    };

    const helper = (obj) => {
      const values = Object.values(obj);

      postObj.forEach((val) =>
        val && typeof val === 'object' ? helper(val) : addtoConsole(val)
      );
    };

    const addtoConsole = (val) => {};

    setfriendid(postObj);

    if (!invitation.project_id) {
      postObj['friend_id'] = invitation.sendBy.id;
      postObj['user_id'] = userId;
    } else {
      postObj['userId'] = userId;
      postObj['projectId'] = invitation.id;
    }

    dispatch(
      acceptOrRejectInvitations(postObj, accessToken, (success) => {
        if (success) {
          dispatch(getInvitations({ id: userId }));

          setImage(success.sendBy.image);
        }
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('Token', accessToken);
  }, []);

  const rejecttInvitation = (invitation) => {
    const postObj = {
      notification_id: invitation.id,
      status: 'rejected',
    };
    if (!invitation.project_id) {
      postObj['friend_id'] = invitation.sendBy.id;
      postObj['user_id'] = userId;
    } else {
      postObj['userId'] = userId;
      postObj['projectId'] = invitation.id;
    }
    dispatch(
      acceptOrRejectInvitations(postObj, accessToken, (success) => {
        if (success) {
          dispatch(getInvitations({ id: userId }));
        }
      })
    );
  };

  return (
    <div className="mb-3">
      <div className="position-relative postinput p-3 bg-white">
        <div className="d-flex">
          {/* {invitation.sendBy.image} */}
          <img
            src={invitation.sendBy.image ? apiUrl + image : person}
            className="profile-img mb-3"
          />
          {/* <img src={NotificationImg} className="profile-img mb-3" /> */}
          <Card className="border-0 ">
            <CardBody>
              <CardText>
                Would you like to accept invite for{' '}
                <b> {invitation.sendBy.fullName} </b>
                <label>Notification:</label>
                <p>{invitation.notification}</p>
              </CardText>
            </CardBody>
          </Card>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={(e) => {
              acceptInvitation(invitation, e);
              // invitation.splice(index, 1)
              // setmyInvitation([...invitation])
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-primary mr-2"
            onClick={() => rejecttInvitation(invitation)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
