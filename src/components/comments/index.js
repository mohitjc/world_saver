import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { apiUrl } from '../../environment';
// import person from '../../assets/img/person.png';
import person from '../../assets/img/person.png';
import { saveCommentOnThreadAction } from '../../actions/posts/PostsActions';
import UploadImageOnComment from '../global/UploadImageOnComment';
import { saveCommentAction } from '../../actions/posts/PostsActions';

const Comments = ({
  Addfriend,
  comment,
  post,
  user,
  index,
  inddex,
  updateReply,
  deleteComment = () => { },
  edit = () => { },
  update,
  childUpdate,
  editCommentId,
  setShowCommentReplyId = () => { },
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.loader);
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
    // console.log(allData[index].comment[0], "[indddallDatadex].comment[0]");
    // allData[index].comment[0].childComment[0].comment = commentText

    // setPostData(allData)
    const tokenThreads = localStorage.getItem('headertoken');
    e.preventDefault();
    const payload = {
      comment_id: comment.id,
      comment: commentText,
      image: commentImage,
      video: commentVideo,
    };

    // setLoader(true)
    dispatch(
      saveCommentOnThreadAction(payload, tokenThreads, (res) => {
        if (res.success) {
          // setLoader(false)
          setCommentImage();
          setCommentVideo();
          setComment('');
          updateReply({ type: 'reply2', rIndex: index, index: inddex, comment: res.data.comment })
          setShowCommentBox(!showCommentBox);
        }
      })
    );
  };

  const toggleCommentBox = (id, e) => {
    setShowCommentBox(!showCommentBox);
    setShowCommentReplyId(id);

    setComment('');
    setCommentImage();
  };

  const onVideoUploadSuccess = (isProcessing, image, video) => {
    setUploadImageStatus(isProcessing);
    setCommentVideo(image);
  };

  return (
    <>
      <div className="comentItem 3 profileSide">
        <div className="acomment--avatar">
          <a>
            <img
              src={comment.createdBy.image
                ? apiUrl + comment.createdBy.image : person
              }
              className=""
              alt={`${user && user.fullName}`}
            />
          </a>
        </div>

        <div className="d-flex justify-content-between">
          <a href="#" className="mr-2">
            {comment.createdBy && comment.createdBy.fullName}
            {/* {comment.createdBy.fullName ? memberDetails.fullName : ""} */}
            <span className="dattime">
              <Moment format="MM/DD/YYYY">
                {comment && comment.createdAt}
              </Moment>
            </span>
          </a>
          {comment.createdBy &&
            comment.createdBy.id == user.id ||
            post.createdBy.id == user.id ? (
            <div className='reply1'>
              {comment.createdBy.id == user.id ? <span
                className="edit-comment"
                onClick={() => edit(comment && comment.id)}
              >
                Edit
              </span> : <></>}


              <span
                className="delete-comment"
                onClick={() => {
                  return deleteComment(comment && comment.id, index);
                }}
              >
                Delete
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="acomment--info">
          <p className="commentDesc mb-1">
            {editCommentId !== comment.id && comment.post_comment}
          </p>

          {comment && comment.image && (
            <img
              src={
                comment && comment.image ? `${apiUrl + comment.image}` : person
              }
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
          ></div>

          <div className="acomment--content">
            {/*  UPDATE COMMENT INPUT */}
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
                  className="btn btn-sm btn-primary ml-2"
                  disabled={!commentText || isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
              </form>
            )}


            {comment.isfriend === 'true' || Addfriend == true || comment.createdBy.id == localStorage.getItem('userID') ? (
              <span
                className="sub reply2"
                onClick={(e) => toggleCommentBox(e, showCommentBox, comment.id)}
              >
                Reply
              </span>
            ) : <></>}



            {/* ADD/UPDATE COMMENT */}
            {editCommentId === comment.id
              ? ''
              : showCommentBox && (
                <form className="commentForm mt-2 reply2" onSubmit={onSubmitComment}>
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
                    disabled={imageUploading || !commentText || isLoading}
                    className="btn btn-sm btn-primary"
                  >
                    {imageUploading ? 'uploading ...' : isLoading ? 'Reply...' : 'Reply'}
                  </button>
                </form>
              )}
          </div>
        </div>

        <div className="clearfix"></div>

        {/* COMMENT REPLIES */}

        <div className="replyList userReply">
          {comment.childComment &&
            comment.childComment.map(
              (x, indexxx) => (

                (
                  <div className="acomment--item" key={indexxx}>
                    <div className="acomment--avatar">
                      <a>
                        <img
                          src={
                            x.createdBy && x.createdBy.image
                              ? apiUrl + x.createdBy.image
                              : person
                          }

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

                        {x.createdBy.id == user.id || post.createdBy.id == user.id ? (
                          <div className='reply2'>
                            {x.createdBy.id == user.id ? <span
                              className="edit-comment"
                              onClick={() =>
                                edit(x.id)
                              }
                            >
                              Edit
                            </span> : <></>}


                            <span
                              className="delete-comment"
                              onClick={() => deleteComment(x.id, index, 'reply2', indexxx)}
                            >
                              Delete
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="acomment--content">
                        <p className="commentDesc">
                          {editCommentId !== x.id && x.comment}
                          {x.image && (
                            <img
                              src={apiUrl + x.image}
                              className="w-100 mb-2"
                            />
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
                              className="commentForm reply2"
                              onSubmit={(e) =>
                                childUpdate(e, commentText1, index, indexxx)
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
                                {isLoading ? 'Updating..' : 'Update'}
                              </button>
                            </form>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="clearfix"></div>
                  </div>
                )
              )
            )}
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
})(Comments);
