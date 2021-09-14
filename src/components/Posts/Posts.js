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
    console.log(props, "props");
    const [array, setArray] = useState()

    const [newiddsf, setNewid] = useState()
    // const [generateid, setgenerateid] = useState([])

    // console.log(generateid, "generateid");


    console.log(array, "allpostsdata");
    // const removeIndex = array.findIndex(item => item._id === item._id);
    // // remove object
    // array.splice(removeIndex, 1);
    // console.log(removeIndex, "removeIndex");

    let iddata = [];
    console.log(iddata, "iddata");
    const [id, setid] = useState()
    console.log(id, 'array');
    const generateid = {}
    console.log(generateid, "generateid");
    array && array.map((items, id) => {
        const generateid = items._id
        // return  items._id

        // setgenerateid(items._id)
    })









    // var myArr = newid.split(" ");
    // console.log(myArr,"myArr");


    const dispatch = useDispatch();

    useEffect(() => {
        handleInvite();
    }, [])
    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const payload = { id: generateid, model: "createpost" };
        console.log(payload, 'asdassasdasdadadadasda');
        swal({
            title: 'Are you sure?',
            text: 'you want to delete the user!',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            console.log(willDelete, "willDelete");
            if (willDelete) {
                const getUrl = `${DELETE_POST}`;
                const config = { headers: { Authorization: `Bearer ${token}` }, data: payload };
                console.log(config, 'config');

                AXIOS_INSTANCE.delete(getUrl, config)
                    .then((result) => {
                        console.log(result, 'result12');

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
    const handleInvite = async () => {
        const getUrl = `${ALL_POST}/allposts`;

        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        AXIOS_INSTANCE.get(getUrl, config)
            .then((data) => {
                console.log(data.data.data, 'dat65656a');
                setArray(data.data.data);

            })
    };
    return (<>
        <div id="app">
            <div className="main-wrapper">
                <div className="navbar-bg" />
                <MainSidebar />
                <Header />
            </div>
            <div className="table">
                <h4>
                    <button
                        className="btn btn-primary"
                        // onClick={() => {
                        //   handleFormVisibilty();
                        //   handAddFormToggle(true);
                        //   resetSingleCategory();
                        // }}
                        type="button"
                    >
                        Add Posts
                    </button>
                    <div className="card-header-form">
                        <form>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                // onChange={e => {
                                //   setKeyword(e.target.value);
                                //   setPage(1);
                                // }}
                                />
                                <div className="input-group-btn ">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </h4>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th >Posts</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {array && array.map((items, id) => (
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
        {/* <Pagination/> */}
    </>



    );
};

export default Posts;