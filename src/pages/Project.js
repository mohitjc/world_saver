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
import {
  changeStatus,
  resetStatus
} from '../store/actions/changeStatusActions';
import { getCatByType } from '../store/actions/categoryActions';
import ProjectsListing from '../components/projects/ProjectsListing';
import ProjectsForm from '../components/projects/ProjectsForm';

const Project = ({
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
  isSuccess,
  isRequesting,
  getCatByType,
  catByTypeData
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
  }, [
    skills,
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
      swal('Project has been deleted!', {
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
  }, [isDeleteSuccess, isDeleteError, resetDeleteSkill]);

  useEffect(() => {
    if (isChangeStatusSuccess) {
      swal(
        status === 'active'
          ? 'Project has been activated'
          : 'Project has been deactivated',
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

  useEffect(() => {
    getCatByType('5eb4f8b871d9eb3ee7bc97f5', token);
  }, [getCatByType, token]);

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

  console.log('catByTypeData', catByTypeData);
  return (
    <Layout title="Projects">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Projects" />
          {!formVisibility ? (
            <ProjectsListing
              handleFormVisibilty={handleFormVisibilty}
              skills={data && data.result}
              total={data && data.total}
              handAddFormToggle={handAddFormToggle}
              getSkillId={getSkillId}
              isRequesting={isRequesting}
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
            <ProjectsForm
              handleFormVisibilty={handleFormVisibilty}
              isAddForm={isAddForm}
              skillId={skillId}
              setReloadToggle={setReloadToggle}
              reloadToggle={reloadToggle}
              catByTypeData={catByTypeData}
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
  isChangeStatusError: state.status.isError,
  catByTypeData: state.catByType.data
});

export default connect(mapStateToProps, {
  skills,
  resetSingleSkill,
  deleteSkill,
  resetDeleteSkill,
  changeStatus,
  resetStatus,
  getCatByType
})(Project);
