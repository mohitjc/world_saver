import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import UserProfile from '../components/user/UserProfile';

import { singleCategory } from '../store/actions/categoryActions';
import CategoryProfile from '../components/categories/CategoryProfile';

const SkillView = ({ match, data, singleCategory }) => {
  const { categoryId } = match.params;
  // console.log('data data', data);
  const token = localStorage.getItem('token');
  useEffect(() => {
    singleCategory(categoryId, token);
  }, [singleCategory]);
  return (
    <Layout>
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Category" />
          <CategoryProfile data={data} />
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.category.data,
  isRequesting: state.category.isRequesting,
  isSuccess: state.category.isSuccess,
  isError: state.category.isError
});

export default connect(
  mapStateToProps,
  { singleCategory }
)(SkillView);
