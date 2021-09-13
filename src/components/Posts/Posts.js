import React from 'react';
import Header from '../global/Header';
import MainSidebar from '../global/MainSidebar';
import SectionHeader from '../global/SectionHeader';
import Table from 'react-bootstrap/Table'
import './Posts.css'

const Posts = () => {
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
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
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
                                // disabled={!!(item && item.type === 'custom')}
                                >
                                    <i className="far fa-edit" />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-icon btn-danger"
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
                </Table>
            </div>
        </div>
    </>



    );
};

export default Posts;