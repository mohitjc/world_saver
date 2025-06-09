import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { apiUrl } from '../../environment';
// import person from '../../assets/img/person.png';
import person from '../../assets/img/person.png';
import { toast } from 'react-toastify';

// import { saveCommentOnThreadAction } from '../../actions/posts/PostsActions';
import UploadImageOnComment from '../global/UploadImageOnComment';
import { saveCommentAction } from '../../actions/posts/PostsActions';

const DashboardComments = ({
  comment,
  post,
  user,
  index,
  deleteComment = () => {},
  edit = () => {},
  update,
  togglePrviewImage,
  childUpdate,
  editCommentId,
  onChildComment,
  setComment,
  commentText,
  setCommentImage,
  commentImage,
  setCommentVideo,
  commentVideo,
  setShowCommentBox,
  showCommentBox,
  loader,
  showCommentReplyId,
  setShowCommentReplyId = () => {},
}) => {
  const { isLoading } = useSelector((state) => state.loader);
  const [commentText1, setComment1] = useState('');
  const [userID, setUserId] = useState(localStorage.getItem('userID'));
  const [imageUploading, setUploadImageStatus] = useState(false);
  useEffect(() => {
    editCommentId == comment.id
      ? setComment(comment.post_comment)
      : setComment1(comment.comment);
  }, [editCommentId]);

  useEffect(() => {
    setUserId(localStorage.getItem('userID'));
  }, [user]);

  const onImageUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentImage(image);
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    const payload = {
      comment_id: comment.id,
      comment: commentText,
      image: commentImage,
      video: commentVideo,
    };

    onChildComment(payload, index);
  };

  const toggleCommentBox = (id) => {
    if (!userID) {
      toast.success('Please login first');
      return;
    }
    if (showCommentReplyId == id && showCommentBox) {
      setShowCommentBox(false);
    } else {
      setShowCommentBox(true);
    }

    setShowCommentReplyId(id);
    setComment('');
    setCommentImage();
  };

  const onVideoUploadSuccess = (isProcessing, image) => {
    setUploadImageStatus(isProcessing);
    setCommentVideo(image);
  };

  // return <>{JSON.stringify(post)}<br />
  // </>
  return (
    <>
      <div className="comentItem 3">
        <div className="acomment--avatar">
          <a>
            <img
              src={
                comment.createdBy && comment.createdBy.image
                  ? comment.createdBy && apiUrl + comment.createdBy.image
                  : person
              }
              className="avtar-md"
              alt={`${comment.createdBy?.fullName}`}
            />
          </a>
        </div>

        <div className="d-flex justify-content-between">
          <a href="#" className="mr-2">
            {comment.createdBy && comment.createdBy.fullName}
            <span className="dattime">
              <Moment format="MM/DD/YYYY">
                {comment && comment.createdAt}
              </Moment>
            </span>
          </a>
          {comment.createdBy &&
          post.createdBy &&
          (comment.createdBy.id == userID || post.createdBy.id == userID) ? (
            <div className="reply1">
              {comment.createdBy.id == userID ? (
                <i
                  className="edit-comment fa fa-pen"
                  onClick={() => edit(comment && comment.id)}
                ></i>
              ) : (
                <></>
              )}

              <i
                className="delete-comment fa fa-trash"
                onClick={() => {
                  return deleteComment(comment && comment.id, index);
                }}
              ></i>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="acomment--info">
          <p className="commentDesc mb-1">
            {comment && editCommentId !== comment.id && comment.post_comment}
          </p>

          {comment && comment.image && (
            <img
              src={
                comment && comment.image ? `${apiUrl + comment.image}` : person
              }
              className="w-100 mb-2"
              onClick={() => {
                togglePrviewImage(
                  `${apiUrl}${comment.image}`,
                  post.createdBy && post.createdBy.username
                );
              }}
            />
          )}

          {comment && comment.video && (
            <video
              controls
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
          ></div>

          <div className="acomment--content">
            {editCommentId == comment.id && (
              <form
                className="commentForm reply1"
                onSubmit={(e) => update(e, commentText, index)}
              >
                <input
                  type="text"
                  placeholder="Your reply please..."
                  className="form-control"
                  value={commentText}
                  onChange={(e) => setComment(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!commentText}
                  className="btn btn-sm btn-primary ml-2"
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
              </form>
            )}

            {comment.createdBy &&
            (comment.isfriend == 'true' ||
              post.isShared ||
              post.createdBy.id == localStorage.getItem('userID')) &&
            comment.createdBy.id != localStorage.getItem('userID') ? (
              <span
                className="sub reply2"
                onClick={(e) => toggleCommentBox(comment.id)}
              >
                Reply
              </span>
            ) : (
              <></>
            )}

            {showCommentReplyId == comment.id && showCommentBox ? (
              <form
                className="commentForm mt-2 reply2"
                onSubmit={onSubmitComment}
              >
                <input
                  type="text"
                  className="form-control"
                  value={commentText}
                  onChange={(e) => setComment(e.target.value)}
                />
                <UploadImageOnComment
                  onImageUploadSuccess={onImageUploadSuccess}
                  onVideoUploadSuccess={onVideoUploadSuccess}
                  multiple={false}
                />
                <button
                  type="submit"
                  disabled={imageUploading || !commentText || loader}
                  className="btn btn-sm btn-primary"
                >
                  {imageUploading
                    ? 'Uploading ...'
                    : isLoading
                    ? 'Uploading...'
                    : 'Reply'}
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="clearfix"></div>

        <div className="replyList">
          {comment.childComment &&
            comment.childComment.map((x, i) => (
              <div className="acomment--item" key={i}>
                <div className="acomment--avatar">
                  <a>
                    <img
                      src={
                        x.createdBy && x.createdBy.image
                          ? x.createdBy && apiUrl + x.createdBy.image
                          : person
                      }
                      className="avtar-md"
                      alt={`${x.createdBy && x.createdBy.fullName}`}
                    />
                  </a>
                </div>
                <div className="acomment--info">
                  <div className="acomment--header d-flex reply_header">
                    <p className="mb-0">
                      <a href="#">{x.createdBy && x.createdBy.fullName}</a>
                      <span className="dattime">
                        {moment(x.updatedAt).format('MM/DD/YYYY hh:mm a')}
                      </span>
                    </p>

                    {user &&
                    x.createdBy &&
                    (x.createdBy.id == userID ||
                      post.createdBy.id == userID) ? (
                      <div className="reply2">
                        {x.createdBy.id == userID ? (
                          <span
                            className="edit-comment"
                            onClick={() => edit(x.id)}
                          >
                            Edit
                          </span>
                        ) : (
                          <></>
                        )}

                        <span
                          className="delete-comment"
                          onClick={() =>
                            deleteComment(x.id, index, 'reply2', i)
                          }
                        >
                          Delete
                        </span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="acomment--content">
                    <div className="commentDesc">
                      {editCommentId !== x.id && x.comment}
                      {x.image && (
                        <img
                          src={apiUrl + x.image}
                          className="w-100 mb-2"
                          onClick={() => {
                            togglePrviewImage(
                              `${apiUrl}${x.image}`,
                              x.createdBy.username
                            );
                          }}
                        />
                      )}

                      {x && x.video && (
                        <video
                          controls
                          playsInline
                          className="w-100 mb-2 mt-2"
                          post
                          muted
                          src={`${apiUrl + x.video}`}
                        />
                      )}
                      {editCommentId == x.id && (
                        <form
                          className="commentForm reply2"
                          onSubmit={(e) =>
                            childUpdate(e, commentText1, index, i)
                          }
                        >
                          <input
                            type="text"
                            placeholder="Your reply please..."
                            className="form-control"
                            value={commentText1 || x.comment}
                            onChange={(e) => setComment1(e.target.value)}
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary ml-2"
                            disabled={!commentText1 || isLoading}
                          >
                            {isLoading ? 'Updating...' : 'Update'}
                          </button>
                        </form>
                      )}
                    </div>
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
});

// export default PostItem;
export default connect(mapStateToProps, {
  saveCommentAction,
})(DashboardComments);
