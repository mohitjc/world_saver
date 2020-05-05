import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import QuestionListing from '../components/questions/QuestionListing';
import QuestionForm from '../components/questions/QuestionsForm';
import {
  questions,
  resetSingleQuestion,
  deleteQuestion,
  resetDeleteQuestion
} from '../store/actions/questionsActions';
import {
  changeStatus,
  resetStatus
} from '../store/actions/changeStatusActions';
import TypeListing from '../components/types/TypeListing';
import TypeForm from '../components/types/TypeForm';

const Types = ({
  data,
  questions,
  resetSingleQuestion,
  deleteQuestion,
  resetDeleteQuestion,
  isDeleteSuccess,
  isChangeStatusSuccess,
  isChangeStatusError,
  isDeleteError,
  changeStatus,
  resetStatus,
  isSuccess
}) => {
  const token = localStorage.getItem('token');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [type, setType] = useState('I');
  const [sort, setSort] = useState(false);
  const [sortType, setSortType] = useState('createdAt');
  const [reloadToggle, setReloadToggle] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [status, setStatus] = useState(null);
  // const [currentCount, setCurrentCount] = useState(count);

  useEffect(() => {
    questions(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [
    questions,
    reloadToggle,
    page,
    sort,
    searchKeyword,
    isDeleteSuccess,
    token,
    type,
    count,
    sortType
  ]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Question has been deleted!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteQuestion();
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetDeleteQuestion();
    }
  }, [isDeleteSuccess, isDeleteError, resetDeleteQuestion]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Questions has been activated'
          : 'Questions has been deactivated',
        {
          buttons: false,
          timer: 1500
        }
      );
      setReloadToggle(!reloadToggle);
      resetStatus();
    }

    if (isChangeStatusError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
      resetStatus();
    }
  }, [
    isChangeStatusSuccess,
    isChangeStatusError,
    status,
    reloadToggle,
    resetStatus
  ]);

  const [formVisibility, setFormVisibilty] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getQuestionId = id => {
    setQuestionId(id);
  };

  const getSearchKeyword = value => {
    setSearchKeyword(value);
  };

  const getStatus = value => {
    setStatus(value);
  };

  const toggleSort = value => {
    setSort(!sort);
    setSortType(value);
  };

  // console.log('isDeleteError', isDeleteError);
  return (
    <Layout title="Types">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Types" />
          {!formVisibility ? (
            <TypeListing
              handleFormVisibilty={handleFormVisibilty}
              questions={data && data.data && data.data.ques}
              total={data && data.data && data.data.total}
              handAddFormToggle={handAddFormToggle}
              getQuestionId={getQuestionId}
              // UserListing={UserListing}
              resetSingleQuestion={resetSingleQuestion}
              deleteQuestion={deleteQuestion}
              sort={sort}
              setSort={setSort}
              setPage={setPage}
              page={page}
              count={count}
              getSearchKeyword={getSearchKeyword}
              changeStatus={changeStatus}
              getStatus={getStatus}
              toggleSort={toggleSort}
            />
          ) : (
            <TypeForm
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              questionId={questionId}
              setReloadToggle={setReloadToggle}
              reloadToggle={reloadToggle}
            />
          )}
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.questions.data,
  isRequesting: state.questions.isRequesting,
  isSuccess: state.questions.isSuccess,
  isError: state.questions.isError,
  isDeleteSuccess: state.deleteQuestion.isSuccess,
  isDeleteError: state.deleteQuestion.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError
});

export default connect(mapStateToProps, {
  questions,
  resetSingleQuestion,
  deleteQuestion,
  resetDeleteQuestion,
  changeStatus,
  resetStatus
})(Types);
