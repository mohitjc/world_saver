import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../global/Pagination';
import EmptyState from '../global/EmptyState';
import SkillsListItem from './ProjectsListItem';
import Loading from '../global/Loader';
import InviteModal from './InviteModal';
import { usersList } from './../../store/actions/userActions';

const ProjectsListing = ({
  handleFormVisibilty,
  handAddFormToggle,
  getSearchKeyword,
  getSkillId,
  resetSingleSkill,
  deleteSkill,
  skills,
  sort,
  setSort,
  total,
  setPage,
  page,
  count,
  changeStatus,
  getStatus,
  toggleSort,
  isRequesting,
}) => {
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    getSearchKeyword(keyword);
  }, [getSearchKeyword, keyword]);
  // console.log('total', total);
  const dispatch = useDispatch();

  const [openModal, toggleModal] = useState(false);
  const [selectedProject, setProject] = useState('');
  const userList = useSelector((state) => state.inviteListUser.data);
  // handle invite modal
  const handleInvite = (project) => {
    console.log('project', project);
    dispatch(usersList());
    setProject(project.id);
    toggleModal(true);
  };
  const handleModal = (status) => {
    toggleModal(false);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleFormVisibilty();
                  handAddFormToggle(true);
                  resetSingleSkill();
                }}
                type="button"
              >
                Add Project
              </button>
            </h4>
            <div className="card-header-form">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setPage(1);
                    }}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {isRequesting ? (
            <Loading />
          ) : (
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tr>
                    <th>#</th>
                    <th
                      onClick={() => toggleSort('name')}
                      style={{ cursor: 'pointer' }}
                    >
                      Name
                      <i className={`fas fa-chevron-${sort ? 'down' : 'up'}`} />
                    </th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  {skills &&
                    skills.map((item, index) => (
                      <SkillsListItem
                        key={item.id}
                        item={item}
                        index={index}
                        handAddFormToggle={handAddFormToggle}
                        handleFormVisibilty={handleFormVisibilty}
                        handleInvite={handleInvite}
                        getSkillId={getSkillId}
                        deleteSkill={deleteSkill}
                        changeStatus={changeStatus}
                        getStatus={getStatus}
                        page={page}
                        count={count}
                      />
                    ))}
                </table>
                {isEmpty(skills) && <EmptyState />}
              </div>
            </div>
          )}
          {skills && !isEmpty(skills) && (
            <Pagination total={total} setPage={setPage} />
          )}
        </div>
      </div>
      {openModal && userList && (
        <InviteModal
          isOpen={openModal}
          handleModal={handleModal}
          userList={userList}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectsListing;
