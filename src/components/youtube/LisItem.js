import React, { useState } from 'react';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { items } from '../../store/actions/youtubeActions';
import { trimEnd } from 'lodash';

const ListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteItem,
  getId,
  page,
  Archive,
  featrued,
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


  const handleArchive = (id, status) =>{
    const token = localStorage.getItem('token');
    swal({
      title: 'Are you sure?',
      text: status?'you want to Un-Archive the user!':'you want to Archive the user!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willArchive => {
      if (willArchive) {
        console.log("id: ",id, " status: ",status)
        Archive({isArchive: !status}, id, token)
      } else {
        return null;
      }
    });

    
  }



  const handleFeature = (id) =>{
    const token = localStorage.getItem('token');
    swal({
      title: 'Are you sure?',
      text: 'you want to Feature this youtube!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willArchive => {
      if (willArchive) {
        console.log("id: ",id)
        featrued(id)
      } else {
        return null;
      }
    });
  }
 
  return (
    <tr>
      <td>{index + page * count - (count - 1)}</td>
      <td>{item && item.title ? item.title : '___'}</td>
      <td>{item && item.description ? item.description : '___'}</td>
      <td>{item && item.url ? item.url : '___'}</td>
    
      <td>
        <div className='d-flex ' style={{height:'12vh'}}>

        
        <button
          type="button"
          style={{width:'50px',height:'7vh'}}
          className="btn btn-icon btn-primary mr-2 mt-2"
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
          style={{width:'50px',height:'7vh'}}
          className="btn btn-icon btn-danger mr-2 mt-2"
          onClick={handleDelete}
        >
          <i className="fas fa-trash" />
        </button>

        <button
          type="button"
          style={{width:'98px',height:'7vh'}}
          className="btn btn-icon btn-secondary m-2 text-center"
          onClick={()=>handleArchive(item && item.id ,item && item.isArchive)}
        >
          {item && item.isArchive?'Un-Archive':'Archive'}
        </button>

        {item && item.isFeatured?<button
          type="button"
          // style={{height:'7vh'}}
          className=" btn btn-icon badge badge-success text-white mt-2"
          style={{height:'7vh',borderRadius:'5px',textAlign:'center',marginTop:'6px',width:'80px'}}
          
        >
          Featured
        </button>
        // <a className="badge badge-success text-white d-flex"   style={{height:'7vh',borderRadius:'5px',textAlign:'center',marginTop:'6px'}}>Featured</a>
        :<button
          type="button"
          style={{height:'7vh'}}
          className="btn btn-icon btn-secondary mt-2"
          onClick={()=>handleFeature(item && item.id)}
        >
          Feature
        </button>}

        
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
