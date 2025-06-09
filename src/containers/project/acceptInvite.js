import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const AcceptInvite = (props) => {
  const history = useNavigate();
  useEffect(() => {
    const token = props.user.access_token;
    const {id}=useParams()
    const params = { inviteId: id};
    props.acceptInvitations(params, (res) => {
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
  // acceptInvitations,
})(AcceptInvite);
