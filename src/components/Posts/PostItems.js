import React from 'react';
import PostItem from './PostItem';

const PostItems = (props) => {
  const { setPostData, user } = props;
  const token = props.user.access_token;
  return (
    <>
      <div className="activity--list">
        {/* <!-- Activity Items Start --> */}
        {
          props.posts == ""

            ?
            <div className="col-md-12 text-center" style={{
              position: 'absolute',
              left: '45%',
              width: '100%',
            }}>
              <div id="ctn" className="w-100">

              </div>
            </div>
            :
            <div className="activityItemUl">

              {props.posts.map((postItem, inddex) => {

                return (
                  <div key={inddex}>
                    <PostItem
                      inddex={inddex}
                      post={postItem}
                      updatePost={props.updatePost}
                      updateReply={props.updateReply}
                      togglePrviewImage={props.togglePrviewImage}
                      userimages={props.userimages}
                      UserVideos={props.UserVideos}
                      UserDocx={props.UserDocx}
                      userprofile={props.user}
                      setPostData={setPostData}
                      allData={props.posts}
                      getprojectPosts={props.getprojectPosts}
                      getUserById={props.getUserById}
                      memberDetails={props.memberDetails}
                      deleteonepost={props.deleteonepost}
                      Addfriend={props.Addfriend}
                      getUserWallPosts={props.getUserWallPosts}
                      CommentOnThread={props.CommentOnThread}
                      firstReply={props.firstReply}
                      DeleteoneComment={props.DeleteoneComment}
                      geUserPosts={props.geUserPosts}
                      user={props.user}
                      commentHandler={props.commentHandler}
                      token={token}
                    />
                  </div>
                );
              })}
            </div>

        }


      </div>
    </>
  );

};

export default PostItems;
