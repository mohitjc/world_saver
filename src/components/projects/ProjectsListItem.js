import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import Posts from '../Posts/Posts';

const ProjectsListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteSkill,
  getSkillId,
  changeStatus,
  getStatus,
  page,
  count,
  handleInvite,
}) => {
  console.log(page,"handlepage");
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    swal({
      title: 'Are you sure?',
      text: 'you want to delete the project!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteSkill({ model: 'project', id: item && item.id }, token);
      } else {
        return null;
      }
    });
  };

  const handleStatus = (status) => {
    const token = localStorage.getItem('token');
    const obj = {
      model: 'project',
      id: item && item.id,
      status,
    };
    getStatus(status);
    changeStatus(obj, token);
  };

  return (
    <>

    <tr>
      <td>{index + page * count - (count - 1)}</td>
      <td>
        <Link to={`/project/${item && item.id}`}>
          {item && item.name ? item.name : '___'}
        </Link>
      </td>

      <td>
        {item && item.createdAt
          ? dayjs(item.createdAt).format('MMM DD YYYY')
          : '___'}
      </td>
      <td>
        {item && item.status === 'deactive' ? (
          <button
            type="button"
            className="badge badge-warning"
            onClick={() => handleStatus('active')}
          >
            Deactive
          </button>
        ) : (
          <button
            type="button"
            className="badge badge-success"
            onClick={() => handleStatus('deactive')}
          >
            Active
          </button>
        )}
      </td>
      <td>
        {item && item.status && item.status === 'active' && (
          <button
            type="button"
            className="btn btn-icon btn-info mr-2"
            onClick={() => handleInvite(item)}
            // disabled={!!(item && item.type === 'custom')}
          >
            <i className="fas fa-envelope" />
          </button>
        )}
        <button
          type="button"
          className="btn btn-icon btn-primary mr-2"
          onClick={() => {
            handAddFormToggle(false);
            handleFormVisibilty();
            getSkillId(item && item.id);
          }}
          // disabled={!!(item && item.type === 'custom')}
        >
          <i className="far fa-edit" />
        </button>
        <button
          type="button"
          className="btn btn-icon btn-danger"
          onClick={handleDelete}
          disabled={!!(item && item.type === 'custom')}
        >
          <i className="fas fa-trash" />
        </button>
      </td>
    </tr>
    <Posts
    page={page}
    />
    </>
  );
};

export default ProjectsListItem;
