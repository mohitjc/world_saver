import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const UserListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteUser,
  getUserId,
  changeStatus,
  getStatus,
  page,
  count
}) => {
  const handleDelete = () => {
    console.log(item, 'itemitemitem');

    const token = localStorage.getItem('token');
    swal({
      title: 'Are you sure?',
      text: 'you want to delete the user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteUser(item && item.id, token);
      } else {
        return null;
      }
    });
  };

  const handleStatus = status => {
    const token = localStorage.getItem('token');
    const obj = {
      model: 'users',
      id: item && item.id,
      status
    };
    getStatus(status);
    changeStatus(obj, token);
  };

  // console.log('page * count ', page, count);
  // console.log('page * count ', page * count);
  // console.log('page * count ', page * count - (count - 1));
  return (
    <tr>
      <td>{index + page * count - (count - 1)}</td>
      <td>
        <Link to={`/user/${item && item.id}`}>
          {item && item.fullName ? item.fullName : '___'}
        </Link>
      </td>
      <td>{item && item.username}</td>
      <td>{item && item.mobile ? item.mobile : '___'}</td>
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
            getUserId(item && item.id);
          }}
        >
          <i className="far fa-edit" />
        </button>
        <button
          type="button"
          className="btn btn-icon btn-danger"
          onClick={handleDelete}
        >
          <i className="fas fa-trash" />
        </button>
      </td>
    </tr>
  );
};

export default UserListItem;
