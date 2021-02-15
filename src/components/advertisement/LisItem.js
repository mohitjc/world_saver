import React from 'react';
import swal from 'sweetalert';
import dayjs from 'dayjs';

const ListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteItem,
  getId,
  page,
  changeStatus,
  getStatus,
  count
}) => {
  const handleDelete = () => {
    const token = localStorage.getItem('token');
    swal({
      title: 'Are you sure?',
      text: 'you want to delete the user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        deleteItem(item && item.id, token);
      } else {
        return null;
      }
    });
  };

  const handleStatus = status => {
    const token = localStorage.getItem('token');
    const obj = {
      model: 'category',
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
      <td>{item && item.title ? item.title : '___'}</td>
      <td>{item && item.description ? item.description : '___'}</td>
      <td>{item && item.url ? item.url : '___'}</td>
      
      {/* <td>
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
      </td> */}
      <td>
        <button
          type="button"
          className="btn btn-icon btn-primary mr-2"
          onClick={() => {
            handAddFormToggle(false);
            handleFormVisibilty();
            getId(item && item.id);
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

export default ListItem;
