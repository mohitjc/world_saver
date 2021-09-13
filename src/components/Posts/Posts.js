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
                            <td>Otto</td>git checkpu
                            <button type="button" class="btn btn-info">Edit</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            
                           
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                        
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    </>



    );
};

export default Posts;