import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import UserProfile from '../components/user/UserProfile';

import { singleQuestion } from '../store/actions/questionsActions';
import CategoryProfile from '../components/categories/CategoryProfile';
import QuestionProfile from '../components/questions/QuestionProfile';

const QuestionView = ({ match, data, singleQuestion }) => {
  const { questionId } = match.params;
  // console.log('data data', data);
  const token = localStorage.getItem('token');
  useEffect(() => {
    singleQuestion(questionId, token);
  }, [singleQuestion]);
  return (
    <Layout>
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Question" />
          <QuestionProfile data={data && data.ques} />
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.question.data,
  isRequesting: state.question.isRequesting,
  isSuccess: state.question.isSuccess,
  isError: state.question.isError
});

export default connect(
  mapStateToProps,
  { singleQuestion }
)(QuestionView);
