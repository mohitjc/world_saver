import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import { isNull } from 'lodash';

import {
    posts,
    resetSingleUser,
    deleteUser,
    resetDeleteUser,
    deletePost,
} from '../../store/actions/userActions';

import {
    changeStatus,
    resetStatus
} from '../../store/actions/changeStatusActions';
import Posts from './Posts';
import Layout from '../global/Layout';
import MainSidebar from '../global/MainSidebar';
import SectionHeader from '../global/SectionHeader';
import UserForm from '../user/UserForm';

const PostData = ({
    posts,
    data,
    resetSingleUser,
    deleteUser,
    deletePost,
    resetDeleteUser,
    isDeleteSuccess,
    isDeleteError,
    isChangeStatusSuccess,
    isChangeStatusError,
    changeStatus,
    resetStatus,
    isSuccess,
    location,
    isRequesting
}) => {
    const [allUsers, setAllUsers] = useState(null);
    const token = localStorage.getItem('token');
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    const [type, setType] = useState('');
    const [sortType, setSortType] = useState('createdAt');
    const [sort, setSort] = useState(false);
    const [roles, setRoles] = useState(location.state && location.state.role);
    const [reloadToggle, setReloadToggle] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [status, setStatus] = useState(null);
    // const [currentCount, setCurrentCount] = useState(count);
    console.log(posts, "pagepage");

    useEffect(() => {
        if (isNull(location.state && location.state.role)) {
            posts(
                token,
                type,
                page,
                count,
                sortType,
                '',
                sort ? 'asc' : 'desc',
                searchKeyword
            );
        } else {
            posts(
                token,
                type,
                page,
                count,
                sortType,
                roles,
                sort ? 'asc' : 'desc',
                searchKeyword
            );
        }
    }, [
        posts,
        reloadToggle,
        page,
        sort,
        roles,
        searchKeyword,
        isDeleteSuccess,
        location.state,
        token,
        type,
        count,
        sortType
    ]);

    useEffect(() => {
        if (isDeleteSuccess) {
            swal('User has been deleted!', {
                buttons: false,
                timer: 1500
            });
        }

        if (isDeleteError) {
            swal('User has been deleted');
        }
        resetDeleteUser();
    }, [isDeleteError, isDeleteSuccess, resetDeleteUser]);

    useEffect(() => {
        if (isChangeStatusSuccess) {
            swal(
                status === 'active'
                    ? 'User has been activated'
                    : 'User has been deactivated',
                {
                    buttons: false,
                    timer: 1500
                }
            );
            setReloadToggle(!reloadToggle);
            resetStatus();
        }

        if (isChangeStatusError) {
            swal('Something went wrong!', {
                buttons: false,
                timer: 1500
            });
            resetStatus();
        }
    }, [
        isChangeStatusSuccess,
        isChangeStatusError,
        status,
        reloadToggle,
        resetStatus
    ]);

    const [formVisibility, setFormVisibilty] = useState(false);
    const [isAddForm, setIsAddForm] = useState(false);
    const [userId, setUserId] = useState(null);

    const handleFormVisibilty = () => {
        setFormVisibilty(!formVisibility);
    };

    const handAddFormToggle = bool => {
        setIsAddForm(bool);
    };

    const getUserId = id => {
        setUserId(id);
    };

    const getSearchKeyword = value => {
        setSearchKeyword(value);
    };

    const getStatus = value => {
        setStatus(value);
    };

    const toggleSort = value => {
        setSort(!sort);
        setSortType(value);
    };

    const handleTitleChange = () => {
        if (roles === 'U') {
            return 'Users';
        }
        if (roles === 'A') {
            return 'Admins';
        }
        if (location.state && location.state.role === null) {
            return 'All Users';
        }
    };

    // console.log('roles', location.state && location.state.role);
    return (
        <Layout title="Posts">
            <MainSidebar />
            <div className="main-content">

                <section className="section">
                    <SectionHeader title={handleTitleChange()} />
                    {!formVisibility ? (
                        <>
                            <Posts
                                handleFormVisibilty={handleFormVisibilty}
                                users={data && data.result}
                                total={data && data.total}
                                handAddFormToggle={handAddFormToggle}
                                getUserId={getUserId}
                                isRequesting={isRequesting}
                                // UserListing={UserListing}
                                resetSingleUser={resetSingleUser}
                                deleteUser={deleteUser}
                                deletePost={deletePost}
                                sort={sort}
                                posts={posts}
                                setSort={setSort}
                                setPage={setPage}
                                page={page}
                                count={count}
                                getSearchKeyword={getSearchKeyword}
                                changeStatus={changeStatus}
                                getStatus={getStatus}
                                toggleSort={toggleSort}
                            />

                        </>
                    ) : (
                        <>

                            <UserForm
                                handleFormVisibilty={handleFormVisibilty}
                                isAddForm={isAddForm}
                                userId={userId}
                                setReloadToggle={setReloadToggle}
                                reloadToggle={reloadToggle}
                            />
                        </>
                    )}
                </section>
            </div>
        </Layout>
    );
};

const mapStateToProps = state => (
    console.log(state, 'state1'),

    {
        data: state.Posts.data,
        isRequesting: state.Posts.isRequesting,
        isSuccess: state.Posts.isSuccess,
        isError: state.Posts.isError,
        isDeleteSuccess: state.deletePost.isSuccess,
        isDeleteError: state.deletePost.isError,
        isChangeStatusSuccess: state.status.isSuccess,
        isChangeStatusError: state.status.isError
    });

export default connect(mapStateToProps, {
    posts,
    resetSingleUser,
    deleteUser,
    deletePost,
    resetDeleteUser,
    changeStatus,
    resetStatus
})(withRouter(PostData));
