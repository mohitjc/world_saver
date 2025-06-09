import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import ListNotifications from './ListNotifications';
import { Alert } from 'reactstrap';

const Notifications = (props) => {

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  // const { invitations } = useSelector((state) => state);

  // useEffect(() => {
  //   dispatch(getInvitations());
  // }, []);

  // if (invitations.length == 0) {
  //   return (
  //     <Alert color="dark">No new invites. Kindly check again later !!!</Alert>
  //   );
  // }


  const invitations = props.user.notifications && props.user.notifications.data;
  const [myInvitation, setmyInvitation] = useState(invitations)


  useEffect(() => {
    setmyInvitation(myInvitation)
  }, [myInvitation])
  return (
    <div className="main--content col-md-8 pb--60" data-trigger="stickyScroll">
      <h2>My Notifications</h2>
      {myInvitation &&
        myInvitation.length > 0 &&
        myInvitation.map((invitation, key) => {
          // console.log(invitation, 'invitation');



          return (

            <>
              <ListNotifications
                index={key}
                key={'project' + key}
                invitation={invitation}
                setmyInvitation={setmyInvitation}
                userId={props.user.id}
                accessToken={props.user.access_token}
              />

            </>
          );

        })}

      {myInvitation && myInvitation.length <= 0 && (
        <Alert color="dark">No new invites. Kindly check again later !!!</Alert>
      )}

    </div>

  );

};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  Notifications,
})(Notifications);
