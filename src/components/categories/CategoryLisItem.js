import React from 'react';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import categoryModel from '../../models/category.model'
const CategoryListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteCategory,
  getCategoryId,
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
        deleteCategory(item && item.id, token);
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


  return (
    <tr>
     
      <td>{index + page * count - (count - 1)}</td>
      <td>{item && item.name ? item.name : '___'}</td>
    
      <td>
        {categoryModel.find(item && item.category)}
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
        <button
          type="button"
          className="btn btn-icon btn-primary mr-2"
          onClick={() => {
            handAddFormToggle(false);
            handleFormVisibilty();
            getCategoryId(item);
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

export default CategoryListItem;
