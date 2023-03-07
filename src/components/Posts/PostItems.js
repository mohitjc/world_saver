import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getSuccess } from '../../store/actions';
import { allPost } from '../../store/actions/userActions';
import { ALL_POST, AXIOS_INSTANCE, DELETE_POST, GET_POSTS, POST_API } from '../../store/constants';
import { checkHttpStatus, parseJSON } from '../../utils/helpers';

const PostItems = ({
    item,
    index,
    handAddFormToggle,
    handleFormVisibilty,
    deleteUser,
    deletePost,
    getUserId,
    changeStatus,
    getStatus,
    page,
    count,
    posts
}) => {

    const handleInvite = async () => {
        const getUrl = `${ALL_POST}/allposts`;

        //  const getUrl = `${USER_API}?type=${type}&search=${search}&page=${page}&count=${10}&roles=${roles}&sortBy=${sortType} ${sort}`;
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        AXIOS_INSTANCE.get(getUrl, config)
            .then((data) => {
                console.log(data.data.total, 'dat65656a');
          

            })
    };
    
        const handleDelete = () => {
            console.log(item, 'itemitemitem');
            const payload = { id: item && item.id, model: "createpost" };
            const token = localStorage.getItem('token');

            swal({
                title: 'Are you sure?',
                text: 'you want to delete the post!',
                icon: 'warning',
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                console.log(willDelete, 'willDelete');
                if (willDelete) {
                    const getUrl = `${DELETE_POST}`;
                    const config = { headers: { Authorization: `Bearer ${token}` }, data: payload };
                    console.log(config, 'config');

                    AXIOS_INSTANCE.delete(getUrl, config)
                        .then((result) => {
                            console.log(result, 'result12');
                            window.location.reload()
                            handleInvite()

                            if (result.success) {
                                console.log('result');
                            } else {
                                const errMsg =
                                    result.error && result.error.message
                                        ? result.error.message
                                        : 'Something went wrong. Kindly try again later !!!';
                            }
                        })




                    // deleteUser(item && item.id, token);
                    // deletePost(payload, token)

                } else {
                    return null;
                }
            });
        };
        console.log(item, 'asdasd');

        // console.log('page * count ', page, count);
        // console.log('page * count ', page * count);
        // console.log('page * count ', page * count - (count - 1));
        return (
            <tr>
                <td>{index + page * count - (count - 1)}</td>
                <td>
                    <Link to={`/replypost/${item && item.id}`}>
                        {item && item.user_post ? item.user_post : '___'}
                    </Link>
                </td>


                <td>

                    <button
                        type="button"
                        className="btn btn-icon btn-danger"
                        onClick={handleDelete}
                    >
                        <i className="fas fa-trash" />
                    </button>
                </td>
            </tr>
        );
    };

    export default PostItems;
