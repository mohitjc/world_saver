import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatePost from './CreatePost';
import TimeLine from './TimeLine';
import Story from '../Story/stroy';

// import { allPosts } from '../../store/actions/allPostsActions';

const Main = () => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  // const { data, isRequesting, isSuccess, isError } = useSelector(
  //   (state) => state.allPosts
  // );

  useEffect(() => {
    // dispatch(allPosts(token));
  }, [dispatch, token]);

  return (
    <div className="main--content col-md-8 pb--60" data-trigger="stickyScroll">
      
      <CreatePost />
      {/* <TimeLine data={data} /> */}
    </div>
  );
};

export default Main;
