import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';
import { saveCommentOnThreadAction } from '../../actions/posts/PostsActions';
import UploadImageOnComment from '../global/UploadImageOnComment';
import { saveCommentAction } from '../../actions/posts/PostsActions';

const Posts = ({
  updatecomment,
  comment,
  post,
  user,
  getPostComments,
  CommentOnThread,
  firstReply,
  deleteComment = () => { },
  editPost = () => { },
  update,
  editPostId,
  setShowCommentReplyId = () => { },
  showCommentReplyId,
}) => {



  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setComment] = useState('');
  const [commentID, setCommentingID] = useState('');



  const [commentId, setCommentId] = useState('');

  const [imageUploading, setUploadImageStatus] = useState(false);
  const [commentImage, setCommentImage] = useState('');

  useEffect(() => {
    setShowCommentBox(false);
    editPostId == post.id
      ? setComment(comment.post_comment || comment.comment || '')
      : setComment('');

    onSubmitComment()
  }, [editPostId]);

  // useEffect(() => {
  //   setComment()
  // }, [commentText])

  // const update = () => {

  // }
  const onImageUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentImage(image);
  };

  const onSubmitComment = (e) => {

    e.preventDefault();
    const payload = {
      image: commentImage,
      comment_id: commentId,
      comment: commentText,
      id: commentID

    };

    dispatch(
      saveCommentOnThreadAction(payload, userReducer.access_token, (res) => {


        if (res.success) {

          setCommentingID(res.data.id);
          setComment('');
          getPostComments();
          firstReply();
        }
      })
    );
  };

  const toggleCommentBox = (id) => {
    setShowCommentBox(!showCommentBox);
    setCommentId(id);
    setShowCommentReplyId(id);
  };


  return (
    <div className="comentItem">
      {/* <div className="acomment--avatar">
        <a>
          <img
            src={user.image ? `${apiUrl + user.image}` : person}
            className="avtar-md"
            alt={`${user.fullName}`}
          />
        </a>
      </div> */}
      {/* <a href="#" className="mr-2">
        {user.fullName}
      </a> */}
      <div className="acomment--info">
        <p className="commentDesc mb-1">
          {editPostId !== comment.id && comment.comment}
        </p>
        {/* 
        {comment.image && (
          <img
            src={apiUrl + comment.image ? `${apiUrl + comment.image}` : person}
            className="w-100 mb-2"
          />
        )} */}
        <div
          className="acomment--header fs--14"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <p className="mb-0">
            <span className="dattime ml-0">
              <Moment format="MM/DD/YYYY">
                1976-04-19T12:59-0500
                {/* {comment.updatedAt} */}
              </Moment>
            </span>
          </p>

          {/* <div>
            <span className="edit-comment" onClick={() => editPost(post.id)}>
              edit
            </span>

            <span
              className="delete-comment"
              onClick={() => deleteComment(comment.id)}
            >
              delete
            </span>
          </div> */}
        </div>

        <div className="acomment--content">
          {/*  UPDATE COMMENT INPUT */}
          {editPostId === post.id
            ? ''
            : showCommentBox && (
              <form
                className="commentForm"
                onSubmit={(e) => update(e, commentText)}
              >
                <input
                  type="text"
                  placeholder="Your reply please...111"
                  className="form-control"
                  value={commentText}
                  onChange={(e) => setComment(e.target.value)}
                  autoFocus
                />
                {
                  commentText !== ''
                    ?
                    <button type="submit" className="btn btn-sm btn-primary ml-2">
                      update
                    </button>
                    :
                    <button type="submit" className="btn btn-sm btn-primary ml-2" disabled>
                      update
                    </button>
                }

              </form>
            )}

          {editPostId !== comment.id && (
            <span className="sub" onClick={() => toggleCommentBox(post.id)}>
              Reply
            </span>
          )}

          {/* ADD/UPDATE COMMENT */}
          {editPostId !== comment.id
            ? ''
            : showCommentBox && (
              <form className="commentForm mt-2" onSubmit={onSubmitComment}>
                <input
                  type="text"
                  placeholder="Your reply please..."
                  className="form-control"
                  value={commentText}
                  onChange={(e) => setComment(e.target.value)}
                />
                <UploadImageOnComment
                  onImageUploadSuccess={onImageUploadSuccess}
                />
                {
                  commentText !== ''
                    ?
                    <button
                      type="submit"
                      disabled={imageUploading}
                      className="btn btn-sm btn-primary"
                    >
                      {imageUploading ? 'uploading ...' : 'Reply'}
                    </button>
                    :
                    <button
                      type="submit"
                      disabled={imageUploading}
                      className="btn btn-sm btn-primary"

                    >
                      {imageUploading ? 'uploading ...' : 'Reply'}
                    </button>
                }

              </form>
            )}
        </div>
      </div>

      <div className="clearfix"></div>

      {/* COMMENT REPLIES */}

      <div className="replyList">

        {comment.childComments &&
          comment.childComments.map((x, i) => (
            <div className="acomment--item" key={i}>
              <div className="acomment--avatar">
                <a>
                  <img
                    src={x.createdBy.image ? `${apiUrl}${user.image}` : person}
                    className="avtar-md"
                    alt={`${x.createdBy.fullName}`}
                  />
                </a>
              </div>
              <div className="acomment--info">
                <div className="acomment--header">

                  <p className="mb-0">
                    <a href="#">{x.createdBy.fullName}</a>
                    <span className="dattime">
                      {moment(x.updatedAt).format('MM/DD/YYYY hh:mm a')}
                    </span>
                  </p>
                  <div>
                    <span
                      className="edit-comment"
                      onClick={() => editPost(x.id)}
                    >
                      Edit
                    </span>
                    <span
                      className="delete-comment"
                      onClick={() => deleteComment(x.id)}
                    >
                      Delete
                    </span>
                  </div>


                </div>

                <div className="acomment--content">
                  <p className="commentDesc">
                    {editPostId !== x.id && x.comment}{' '}
                    {x.image && (
                      <img src={apiUrl + x.image} className="w-100 mb-2" />
                    )}
                    {editPostId === x.id && (
                      <form
                        className="commentForm"
                        onSubmit={(e) => update(e, commentText)}
                      >
                        <input
                          type="text"
                          placeholder="Your reply please..."
                          className="form-control"
                          value={commentText || x.comment}
                          onChange={(e) => setComment(e.target.value)}
                          autoFocus
                        />
                        {
                          commentText !== ''
                            ?
                            <button
                              type="submit"
                              className="btn btn-sm btn-primary ml-2"
                            >
                              update
                            </button>
                            :
                            <button
                              type="submit"
                              className="btn btn-sm btn-primary ml-2"
                              disabled
                            >
                              update
                            </button>

                        }

                      </form>
                    )}
                  </p>
                </div>
              </div>

              <div className="clearfix"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
