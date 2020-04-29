import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import Yup, {
  object as yupObject,
  string as yupString,
  number as yupNumber
} from 'yup';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

import { isNull } from 'lodash';
import {
  questionsAdd,
  questionsUpdate,
  singleQuestion,
  resetAddQuestion,
  resetUpdateQuestion,
  questions
} from '../../store/actions/questionsActions';

const QuestionsForm = ({
  handleFormVisibilty,
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  isRequesting,
  isUpdateRequesting,
  isSuccess,
  isUpdateSuccess,
  isError,
  errors,
  touched,
  questions,
  data,
  isAddForm,
  reloadToggle,
  setReloadToggle,
  questionId,
  singleQuestion,
  singleQuestionData,
  resetAddQuestion,
  resetUpdateQuestion
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isSuccess) {
      swal('New question added!', '', 'success');
      handleFormVisibilty();
      resetAddQuestion();
      setReloadToggle(!reloadToggle);
    }
    if (isError) {
      swal(data && data.data && data.data.message, '', 'warning');
      // handleFormVisibilty();
      resetUpdateQuestion();
      // setReloadToggle(!reloadToggle);
    }
    if (isUpdateSuccess) {
      swal('Question updated!', '', 'success');
      handleFormVisibilty();
      resetUpdateQuestion();
      setReloadToggle(!reloadToggle);
    }
  }, [isSuccess, isError, isUpdateSuccess]);

  useEffect(() => {
    if (!isAddForm) {
      singleQuestion(questionId, token);
      // swal('New user added!', '', 'success');
    }
  }, [singleQuestion]);

  // console.log('data', data);

  return (
    <div className="">
      <button className="btn btn-primary mb-3" onClick={handleFormVisibilty}>
        View Questions
      </button>
      <div className="card">
        <form
          onSubmit={handleSubmit}
          className="needs-validation"
          noValidate=""
        >
          <div className="card-header">
            <h4>{isAddForm ? 'Add' : 'Edit'} questions</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-4 col-12">
                <label>Name</label>
                <input
                  type="text"
                  name="question"
                  className="form-control"
                  // value="john"

                  value={values.question}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.question && touched.question && (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.question}
                  </div>
                )}
              </div>
            </div>

            {/* <div className="row">
              <div className="form-group col-12">
                <label>Bio</label>
                <textarea className="form-control summernote-simple">
                  asdkahjs
                </textarea>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="form-group mb-0 col-12">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name="remember"
                    className="custom-control-input"
                    id="newsletter"
                  />
                  <label className="custom-control-label" htmlFor="newsletter">
                    Subscribe to newsletter
                  </label>
                  <div className="text-muted form-text">
                    You will get new information about products, offers and
                    promotions
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleFormVisibilty}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary   ${
                isRequesting || isUpdateRequesting
                  ? 'btn-progress disabled'
                  : ''
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const QuestionsFormFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ singleQuestionData }) => {
    // console.log('singleQuestionData', singleQuestionData);
    return {
      question: (singleQuestionData && singleQuestionData.ques.question) || '',
      type: (singleQuestionData && singleQuestionData.ques.type) || ''
    };
  },

  validationSchema: yupObject().shape({
    question: yupString()
      .max(50)
      .required()
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    // const { router } = props;
    const token = localStorage.getItem('token');
    // console.log('state values', values);
    if (props.isAddForm) {
      props.questionsAdd(
        {
          question: values.question,
          type: 'common'
        },
        token
      );
    } else {
      props.questionsUpdate(
        {
          question: values.question,
          type: values.type
        },
        props.questionId,
        token
      );
    }

    // resetForm();
  },

  displayName: 'QuestionForm' // helps with React DevTools
})(QuestionsForm);

const mapStateToProps = state => ({
  data: state.questionAdd.data,
  isRequesting: state.questionAdd.isRequesting,
  isUpdateRequesting: state.questionUpdate.isRequesting,
  isSuccess: state.questionAdd.isSuccess,
  isUpdateSuccess: state.questionUpdate.isSuccess,
  isError: state.questionAdd.isError,
  singleQuestionData: state.question.data
});

export default connect(
  mapStateToProps,
  {
    questionsAdd,
    questionsUpdate,
    singleQuestion,
    resetAddQuestion,
    resetUpdateQuestion,
    questions
  }
)(QuestionsFormFormik);
