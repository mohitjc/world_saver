import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { truncate } from 'lodash';

const ArticleListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteBlog,
  getBlogId,
  changeStatus,
  getStatus,
  page,
  count
}) => {
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    swal({
      title: 'Are you sure?',
      text: 'you want to delete the blog!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteBlog({ model: 'blogs', id: item && item.id }, token);
      } else {
        return null;
      }
    });
  };

  const handleStatus = status => {
    const token = localStorage.getItem('token');
    const obj = {
      model: 'blogs',
      id: item && item.id,
      status
    };
    getStatus(status);
    changeStatus(obj, token);
  };

  return (
    <tr>
      <td>{index + page * count - (count - 1)}</td>
      <td>
        <Link to={`/blog/${item && item.id}`}>
          {item && item.title ? item.title : '___'}
        </Link>
      </td>
      <td>
        {' '}
        {truncate(item && item.description ? item.description : '___', {
          length: 20,
          separator: ''
        })}
      </td>
      <td>{item && item.slug ? item.slug : '___'}</td>

      {/* <td>{item && item.createdAt ? item.createdAt : '___'}</td> */}
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
        <button
          type="button"
          className="btn btn-icon btn-primary mr-2"
          onClick={() => {
            handAddFormToggle(false);
            handleFormVisibilty();
            getBlogId(item && item.id);
          }}
          disabled={!!(item && item.type === 'custom')}
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
  );
};

export default ArticleListItem;
