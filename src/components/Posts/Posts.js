import React, { useEffect, useState } from 'react';
import Header from '../global/Header';
import MainSidebar from '../global/MainSidebar';
import SectionHeader from '../global/SectionHeader';
import Table from 'react-bootstrap/Table'
import { useSelector, useDispatch } from 'react-redux';


import './Posts.css'
import { allPost, deletePost } from '../../store/actions/userActions';
import swal from 'sweetalert';
import { ALL_POST, AXIOS_INSTANCE, DELETE_POST } from '../../store/constants';


const Posts = (props) => {
const [array, setArray] = useState([])
console.log(props, 'aksdhkl');
const newId =  array && array.map((items, id)=>{

return items._id

})

console.log(newId, 'asasa1111');
const obj = Object.fromEntries(newId);



// const idsq = newId&& newId.split("");
// console.log("split",idsq);
const dispatch = useDispatch();

    useEffect(()=>{
        handleInvite();
    },[])
    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const payload = { id: '613ef6871c19dd72e0cee0dc', model: 'createpost' };
        console.log(payload,'asdassasdasdadadadasda');

        swal({
          title: 'Are you sure?',
          text: 'you want to delete the user!',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            // deletePost(payload, token, (res)=>{
            //     console.log(res,'asdass');
            // });
            const getUrl = `${DELETE_POST}`;
    const config = { headers: { Authorization: `Bearer ${token}`} };
    console.log(config, 'config');

            AXIOS_INSTANCE.delete(getUrl, config,payload )
              .then((result) => {
                console.log(result,'result12');

                if (result.success) {
                    console.log('result');
                } else {
                  const errMsg =
                    result.error && result.error.message
                      ? result.error.message
                      : 'Something went wrong. Kindly try again later !!!';
                }
              })
          } else {
            return null;
          }
        });
      };
    const handleInvite = async() => {
        const getUrl = `${ALL_POST}/allposts`;

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    AXIOS_INSTANCE.get(getUrl, config)
     
      .then((data) => {
          console.log(data.data.data, 'data');
          setArray(data.data.data)
          var newArray = array.concat(data.data.data);

          console.log(newArray, 'newarr');
       
      })
        // setProject(project.id);
        // toggleModal(true);
      };
    return (<>



        <div id="app">
            <div className="main-wrapper">
                <div className="navbar-bg" />
                <MainSidebar />
                <Header />


            </div>
            <div className="table">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th >Posts</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {array && array.map((items, id)=>(
                        <tbody>
                           
                       {console.log(items._id, 'itemsid0')}

                        <tr>
                            <td>{id}</td>
                            <td>{items.user_post}</td>
                            <td>
                                <button
                                    type="button"
                                    className="badge badge-success"
                                // onClick={() => handleStatus('deactive')}
                                >
                                    Active
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-icon btn-primary mr-2"
                                // onClick={() => {
                                //     handAddFormToggle(false);
                                //     handleFormVisibilty();
                                //     getBlogId(item && item.id);
                                // }}
                                >
                                    <i className="far fa-edit" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-icon btn-danger"
                                    onClick={handleDelete}
                                    // onClick={handleDelete}
                                    // disabled={!!(item && item.type === 'custom')}
                                >
                                    <i className="fas fa-trash" />
                                </button>
                            </td>

                        </tr>
                        <tr>
                       
                     


                        </tr>
                        <tr>
                           
                     

                        </tr>
                    </tbody>
                    ))}
                    
                </Table>
            </div>
        </div>
    </>



    );
};

export default Posts;