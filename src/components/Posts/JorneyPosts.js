import React from 'react';
import JorneyPost from './JorneyPost';

const JorneyPosts = (props) => {
    const token = props.user.access_token;

    return (
        <>
            <div className="activity--list" key={1}>

                {
                    props.posts == ""

                        ?
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            No data....
                        </div>
                        :
                        <div className="activityItemUl">
                            {(!props.posts || props.posts.length === 0) && (
                                <div className="activity--item">
                                    <div className="activity--info fs--14">
                                        <div className="activity--content">

                                        </div>
                                    </div>
                                </div>
                            )}
                            {props.posts.map((postItem, i) => {
                                return (

                                    (postItem.project_id && props.hideJurneyPost) ? <></> : <>
                                        <div key={i}>
                                            <JorneyPost
                                                key={`postitems-key-${i}`}
                                                post={postItem}
                                                openFriendModal={props.openFriendModal}
                                                projectData={props.projectData}
                                                getprojectPosts={props.getprojectPosts}
                                                getUserById={props.getUserById}
                                                memberDetails={props.memberDetails}
                                                deleteonepost={props.deleteonepost}
                                                getUserWallPosts={props.getUserWallPosts}
                                                CommentOnThread={props.CommentOnThread}
                                                firstReply={props.firstReply}
                                                DeleteoneComment={props.DeleteoneComment}

                                                user={props.user}
                                                commentHandler={props.commentHandler}
                                                token={token}


                                            />

                                        </div>



                                    </>
                                );
                            })}
                        </div>

                }


            </div>
        </>
    );

};

export default JorneyPosts;
