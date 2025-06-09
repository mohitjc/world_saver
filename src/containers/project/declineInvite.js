import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { rejectInvitations } from '../../actions/notifications';
import { useNavigate, useParams } from 'react-router-dom';

const DeclineInvite = (props) => {
  const history = useNavigate();
  const {id}=useParams()
  // const token = localStorage.getItem("headertoken")

  let headertoken = props.user.access_token;
  useEffect(() => {
    // const token = props.user.access_token;
    const params = { inviteId: id };
    props.rejectInvitations(params, headertoken, (res) => {
      //  (res, "declinereq")
      if (res.success) {
        history('/dashboard');
      }
    });
  }, []);

  return <></>;
};

// export default ProjectModal;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  rejectInvitations,
})(DeclineInvite);
