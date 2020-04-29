import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import UserProfile from '../components/user/UserProfile';

import { singleBlog } from '../store/actions/blogsActions';
import CategoryProfile from '../components/categories/CategoryProfile';
import QuestionProfile from '../components/questions/QuestionProfile';
import BlogProfile from '../components/blogs/BlogProfile';

const BlogView = ({ match, data, singleBlog }) => {
  const { blogId } = match.params;
  // console.log('data data', data);
  const token = localStorage.getItem('token');
  useEffect(() => {
    singleBlog(blogId, token);
  }, [singleBlog]);
  return (
    <Layout>
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Blog" />
          <BlogProfile data={data} />
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.blog.data,
  isRequesting: state.blog.isRequesting,
  isSuccess: state.blog.isSuccess,
  isError: state.blog.isError
});

export default connect(
  mapStateToProps,
  { singleBlog }
)(BlogView);
