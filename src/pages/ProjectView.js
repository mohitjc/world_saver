import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import UserProfile from '../components/user/UserProfile';

import { singleCategory } from '../store/actions/categoryActions';
import CategoryProfile from '../components/categories/CategoryProfile';
import { singleSkill, skills } from '../store/actions/skillsActions';

const ProjectView = ({ match, data, singleSkill }) => {
  const { projectId } = match.params;
  console.log('data data', data);
  const token = localStorage.getItem('token');
  useEffect(() => {
    singleSkill(projectId, token);
  }, [projectId, singleSkill, token]);
  return (
    <Layout>
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title={data && data.name} />
          <CategoryProfile data={data} />
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.skill.data,
  isRequesting: state.skill.isRequesting,
  isSuccess: state.skill.isSuccess,
  isError: state.skill.isError
});

export default connect(mapStateToProps, { singleSkill })(ProjectView);
