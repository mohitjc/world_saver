import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import CategoryForm from '../components/categories/CategoryForm';
import {
  skills,
  resetSingleSkill,
  deleteSkill,
  resetDeleteSkill
} from '../store/actions/skillsActions';
import { changeStatus, resetStatus } from '../store/actions/changeStatusActions';
import SkillsListing from '../components/skills/SkillsListing';
import SkillsForm from '../components/skills/SkillsForm';

const Skills = ({
  skills,
  data,
  resetSingleSkill,
  deleteSkill,
  resetDeleteSkill,
  isDeleteSuccess,
  isDeleteError,
  changeStatus,
  resetStatus,
  isChangeStatusSuccess,
  isChangeStatusError,
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
    skills(
      token,
      type,
      page,
      count,
      sortType,
      sort ? 'asc' : 'desc',
      searchKeyword
    );
  }, [skills, reloadToggle, page, sort, searchKeyword, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      swal('Skill has been deleted!', {
        buttons: false,
        timer: 1500
      });
    }

    if (isDeleteError) {
      swal('Something went wrong!', {
        buttons: false,
        timer: 1500
      });
    }
    resetDeleteSkill();
  }, [isDeleteSuccess, isDeleteError]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Skill has been activated'
          : 'Skill has been deactivated',
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
  }, [isChangeStatusSuccess, isChangeStatusError]);

  const [formVisibility, setFormVisibilty] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [skillId, setSkillId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getSkillId = id => {
    setSkillId(id);
  };

  const getSearchKeyword = value => {
    setSearchKeyword(value);
  };

  const getStatus = value => {
    setStatus(value);
  };

  const toggleSort = value => {
    setSortType(value);
    setSort(!sort);
  };

  // console.log('status', status);
  return (
    <Layout title="Skills">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Skills" />
          {!formVisibility ? (
            <SkillsListing
              handleFormVisibilty={handleFormVisibilty}
              skills={data && data.data && data.data.skill}
              total={data && data.data && data.data.total}
              handAddFormToggle={handAddFormToggle}
              getSkillId={getSkillId}
              // UserListing={UserListing}
              resetSingleSkill={resetSingleSkill}
              deleteSkill={deleteSkill}
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
            <SkillsForm
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              skillId={skillId}
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
  data: state.skills.data,
  isRequesting: state.skills.isRequesting,
  isSuccess: state.skills.isSuccess,
  isError: state.skills.isError,
  isDeleteSuccess: state.deleteSkill.isSuccess,
  isDeleteError: state.deleteSkill.isError,
  isChangeStatusSuccess: state.status.isSuccess,
  isChangeStatusError: state.status.isError
});

export default connect(
  mapStateToProps,
  {
    skills,
    resetSingleSkill,
    deleteSkill,
    resetDeleteSkill,
    changeStatus,
    resetStatus
  }
)(Skills);
