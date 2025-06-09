import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { apiUrl } from '../../environment';
import person from '../../assets/img/person.png';
import { saveCommentOnThreadAction } from '../../actions/posts/PostsActions';
import UploadImageOnComment from '../global/UploadImageOnComment';
import { saveCommentAction } from '../../actions/posts/PostsActions';

const JorneyComments = ({
  post,
  getprojectPosts,
  comment,
  key,
  deleteComment = () => { },
  edit = () => { },
  update,
  childUpdate,
  editCommentId,
  setShowCommentReplyId = () => { },
}) => {
  const dispatch = useDispatch();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setComment] = useState('');
  const [commentText1, setComment1] = useState('');
  const [imageUploading, setUploadImageStatus] = useState(false);
  const [commentImage, setCommentImage] = useState('');
  const [commentVideo, setCommentVideo] = useState('');

  useEffect(() => {

    setShowCommentBox(false);
    editCommentId == comment.id
      ? setComment(comment.post_comment)
      : setComment1(comment.comment);
  }, [editCommentId]);


  const onImageUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentImage(image);
  };

  const onSubmitComment = (e) => {
    const threadComment = localStorage.getItem('headertoken')
    e.preventDefault();
    const payload = {

      comment_id: comment.id,
      comment: commentText,
      post_id: post.id,
      image: commentImage,
      video: commentVideo
    };
    // setLoader(true)
    dispatch(
      saveCommentOnThreadAction(payload, threadComment, (res) => {
        if (res.success) {
          setComment(res.comment);
          setComment('')
          setComment1('')
          setCommentImage()
          setCommentVideo()
          setShowCommentBox(!showCommentBox);
          getprojectPosts();
        }
      })
    );
  };

  const toggleCommentBox = (id, e) => {
    setShowCommentBox(!showCommentBox);
    setShowCommentReplyId(id);
    setComment('');
    setCommentImage()
  };


  const onVideoUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing)
    setCommentVideo(image)
  }


  return (
    <>
      <div className="comentItem" key={key}>
        <div className="acomment--avatar">
          <a>
            <img
              src={post.createdBy.image ? apiUrl + comment.createdBy.image : person}
              className="avtar-md"
            />
          </a>
        </div>
        <a href="#" className="mr-2">


          {comment.createdBy.fullName}

        </a>
        <div className="acomment--info">
          <p className="commentDesc mb-1">
            {editCommentId !== comment.id && comment.post_comment}
          </p>

          {comment.image && (
            <img
              src={comment.image ? `${apiUrl + comment.image}` : person}
              className="w-100 mb-2"
            />
          )}


          {comment && comment.video && (

            <video

              controls
              autoPlay
              playsInline
              className="w-100 mb-3 mt-2"
              post
              muted
              src={`${apiUrl + comment.video}`}
            />
          )}
          <div
            className="acomment--header fs--14"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <p className="mb-0">
              <span className="dattime">
                <Moment format="MM/DD/YYYY">
                  {comment.createdAt}
                </Moment>
              </span>
            </p>

            {post.createdBy.id == localStorage.getItem('userID') ?
              <div>
                <span className="edit-comment" onClick={() => edit(comment.id)}>
                  Edit
                </span>

                <span
                  className="delete-comment"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </span>
              </div>
              :


              ""

            }




          </div>

          <div className="acomment--content">
            {/*  UPDATE COMMENT INPUT */}
            {editCommentId == comment.id && (
              <form
                className="commentForm"
                onSubmit={(e) => update(e, commentText)}
              >
                <input
                  type="text"
                  placeholder="Your reply please..."
                  className="form-control"
                  value={commentText}
                  onChange={(e) => setComment(e.target.value)}
                  autoFocus
                />
                {
                  commentText !== ''

                    ?
                    <button type="submit" className="btn btn-sm btn-primary ml-2">
                      Update
                    </button>

                    :

                    <button type="submit" className="btn btn-sm btn-primary ml-2" disabled>
                      Update
                    </button>
                }

              </form>
            )}

            {editCommentId !== comment.id && (
              <span
                className="sub"
                onClick={(e) => toggleCommentBox(e, showCommentBox, comment.id)}
              >
                Reply
              </span>
            )}

            {/* ADD/UPDATE COMMENT */}
            {showCommentBox && (
              <form className="commentForm mt-2" onSubmit={onSubmitComment}>
                <input
                  type="text"
                  // placeholder="Share a comment with this journey..."
                  className="form-control"
                  value={commentText}
                  onChange={(e) => setComment(e.target.value)}
                />
                <UploadImageOnComment
                  onImageUploadSuccess={onImageUploadSuccess}
                  onVideoUploadSuccess={onVideoUploadSuccess}
                  multiple={false}
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

          {comment.childComment &&
            comment.childComment.map((x, i) => (
              // console.log(x, "Jorney chils"),

              <div className="acomment--item" key={i}>
                {/* <p>{x.comment}fdfdfdgfdddddddddddddddddddddddd</p> */}
                <div className="acomment--avatar">
                  <a>
                    <img
                      src={post.createdBy.image ? apiUrl + x.createdBy.image : person}
                      className="avtar-md"
                      alt={`${x.createdBy.fullName}`}
                    />
                  </a>
                </div>
                <div className="acomment--info">
                  <div className="acomment--header d-flex reply_header">
                    <p className="mb-0">
                      <a href="#">{x.createdBy.fullName}</a>
                      <span className="dattime">
                        {moment(x.updatedAt).format('MM/DD/YYYY hh:mm a')}
                      </span>
                    </p>


                    {post.createdBy.id == localStorage.getItem('userID') ?
                      <div>
                        <span className="edit-comment" onClick={() => edit(x.id)}>
                          Edit
                        </span>
                        <span
                          className="delete-comment"
                          onClick={() => deleteComment(x.id)}
                        >
                          Delete
                        </span>

                      </div>
                      :


                      ""

                    }




                  </div>

                  <div className="acomment--content">
                    <p className="commentDesc">
                      {editCommentId !== x.id && x.comment}
                      {x.image && (
                        <img src={apiUrl + x.image} className="w-100 mb-2" />
                      )}


                      {x && x.video && (

                        <video

                          controls
                          autoPlay
                          playsInline
                          className="w-100 mb-3 mt-2"
                          post
                          muted
                          src={`${apiUrl + x.video}`}
                        />
                      )}
                      {editCommentId == x.id && (
                        <form
                          className="commentForm"
                          onSubmit={(e) => childUpdate(e, commentText1)}
                        >
                          <input
                            type="text"
                            placeholder="Your reply please..."
                            className="form-control"
                            value={commentText1 || x.comment}
                            onChange={(e) => setComment1(e.target.value)}
                            autoFocus
                          />
                          {
                            commentText1 !== ''
                              ?
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary ml-2"
                              >
                                Update
                              </button>
                              :
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary ml-2"
                                disabled
                              >
                                Update
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
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

// export default PostItem;
export default connect(mapStateToProps, {

  saveCommentAction,
})(JorneyComments);
