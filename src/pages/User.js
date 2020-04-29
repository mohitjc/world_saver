import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import UserProfile from '../components/user/UserProfile';

import { singleUser } from '../store/actions/userActions';

const User = ({ match, data, singleUser }) => {
  // console.log('data singleUser', data);
  const { id } = match.params;
  const token = localStorage.getItem('token');
  useEffect(() => {
    singleUser(id, token);
  }, [singleUser]);
  // console.log('userId', id);
  return (
    <Layout>
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Profile" />
          <UserProfile data={data} />
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.user.data,
  isRequesting: state.user.isRequesting,
  isSuccess: state.user.isSuccess,
  isError: state.user.isError
});

export default connect(
  mapStateToProps,
  { singleUser }
)(User);
