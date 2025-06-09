import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { createPost } from '../../store/actions/createPostActions';
// import { allPosts } from '../../store/actions/allPostsActions';

const CreatePost = () => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const isRequesting = false;
  // const { data, isRequesting, isSuccess, isError } = useSelector(
  //   (state) => state.createPost
  // );

  // useEffect(() => {
  //   if (isSuccess) {
  //     // dispatch(allPosts(token));
  //     setMessage('');
  //   }
  // }, [dispatch, isSuccess, token]);

  const handleSubmit = () => {
    // dispatch(createPost({ user_post: message, image: 'jhgjhjhg.jpg' }, token));
  };

  return (
    <div className="mb-3">
      <div className="position-relative postinput p-3 bg-white">
        <div className="d-flex justify-content-between">
          <div className="">
            <div className="activity--avatar float-initial mr-0">
              <a href="member-activity-personal.html">
                <img src="../assets/img/person.png" alt="" />
              </a>
            </div>
          </div>
          <textarea
            className="form-control border-0"
            placeholder="What do you want to share with your friends and the world, Samuel?"
            value={message}
            onChange={(e) => setMessage(e.target.value)
            }
          ></textarea>
        </div>
        <div className="text-right">
          <button className="btn btn-primary mr-2">
            <i className="fas fa-photo-video"></i> Photo / Video
          </button>

          <button className="btn btn-secondary" onClick={handleSubmit}>
            {isRequesting ? 'Posting..' : 'Share with'}
            <i className="fas fa-share"></i>
          </button>
        </div>
      </div>
    </div >
  );
};

export default CreatePost;
