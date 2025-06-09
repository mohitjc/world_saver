import React, { useEffect, useState } from 'react';
import DashboardPostItems from './DashboardPostItems';
import ApiClient from '../../api-client';

const DashboardPost = (props) => {
  const { setPostData1, user } = props;
  const [BlokedUser, setBlokedUser] = useState([]);

  const token = props.user.access_token;
  const GetBlockedUsers = () => {
    let blockedArray = [];
    ApiClient.get('https://endpoint.crowdsavetheworld.com/blocklist').then(
      (res) => {
        if (res?.success) {
          res.data.map((itm) => {
            blockedArray.push(`${itm?.id}`);
          });
          setBlokedUser(blockedArray);
        }
      }
    );
  };
  useEffect(() => {
    GetBlockedUsers();
  }, []);
  return (
    <>
      <div className="activity--list">
        {/* <!-- Activity Items Start --> */}
        {props.posts == '' ? (
          <div
            className="col-md-12 text-center"
            style={{
              position: 'absolute',
              left: '45%',
              width: '100%',
            }}
          >
            <div id="ctn" className="w-100"></div>
          </div>
        ) : (
          <div className="activityItemUl">
            {(!props.posts || props.posts === 0) && (
              <div className="activity--item">
                <div className="activity--info fs--14">
                  <div className="activity--content"></div>
                </div>
              </div>
            )}

            {props.posts.map((postItem, inddex) => {
              return (
                <div key={inddex}>
                  <DashboardPostItems
                    index={inddex}
                    BlokedUser={BlokedUser}
                    post={postItem}
                    updatePost={props.updatePost}
                    updateThread={props.updateThread}
                    updateReply={props.updateReply}
                    togglePrviewImage={props.togglePrviewImage}
                    deletePost={props.deletePost}
                    setPostData1={setPostData1}
                    setLoader={props.setLoader}
                    allData={props.posts}
                    getprojectPosts={props.getprojectPosts}
                    getUserById={props.getUserById}
                    memberDetails={props.memberDetails}
                    deleteonepost={props.deleteonepost}
                    CommentOnThread={props.CommentOnThread}
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
        )}
      </div>
    </>
  );
};

export default DashboardPost;
