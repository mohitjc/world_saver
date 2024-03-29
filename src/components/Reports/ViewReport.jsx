import React, { useEffect, useState } from "react";
import Loading from "../global/Loader";
import Layout from "../global/Layout";
import MainSidebar from "../global/MainSidebar";
import SectionHeader from "../global/SectionHeader";
import ApiClient from "../apiClient";
import moment from "moment";
import Pagination from "../global/Pagination";
import swal from "sweetalert";
import Axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

function ViewReport() {
  const [isLoading, setLoading] = useState(false);
  const [listData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const history = useHistory();

  console.log(page, "=================");
  const GetData = () => {
    setLoading(true);

    ApiClient.get(`/post?post_id=${id}`).then((res) => {
      if (!res.data) {
        history.goBack();
      }
      if (res?.data?.success) {
        setData(res?.data?.data);
        setComments(res?.data?.data?.comments);
        setTotal(res?.data?.total);
        setLoading(false);
        //   history.goBack();
      } else {
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const DeletePost = () => {
    setLoading(true);
    Axios.delete(
      `https://endpoint.crowdsavetheworld.com/delete?id=${id}&model=createpost`
    ).then((res) => {
      if (res?.data?.success) {
        setLoading(false);
        swal(res?.data?.message);
        history.goBack();
      }
      setLoading(false);
    });
  };

  const DeleteCOmment = (CommentID) => {
    setLoading(true);
    Axios.delete(
      `https://endpoint.crowdsavetheworld.com/deleteComment?id=${CommentID}`
    ).then((res) => {
      if (res?.data?.success) {
        swal(res?.data?.message);
        GetData()
        setLoading(false);
      }
      setLoading(false);
    });

  };

  const handleDelete = (id) => {
    // console.log(item, 'itemitemitem');

    // const token = localStorage.getItem('token');
    swal({
      title: "Are you sure?",
      text: "you want to delete this Post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DeletePost();
      } else {
        return null;
      }
    });
  };

  return (
    <Layout title="Post">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title={"Post"} />
          {isLoading ? (
            <Loading />
          ) :
            <div class="mt-4 mb-5">
              <div class="container">
                <div class="col-md-8 mb-4">
                  <section class="border-bottom mb-4">
                    <img
                      src={
                        listData?.images
                          ? `https://endpoint.crowdsavetheworld.com/${listData?.images[0]?.imagePath}`
                          : `https://mdbootstrap.com/img/Photos/Slides/img%20(144).jpg`
                      }
                      class="img-fluid shadow-2-strong rounded mb-4"
                      alt=""
                    />

                    <div class="row align-items-center mb-4">
                      <div class="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "70px",
                            height: "70px",
                          }}
                          src={
                            listData?.createdBy?.image
                              ? `https://endpoint.crowdsavetheworld.com/` +
                              listData?.createdBy?.image
                              : `https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg`
                          }
                          height="35"
                          alt=""
                          loading="lazy"
                        />
                        <span>
                          {" "}
                          Published{" "}
                          <u>
                            {moment(listData?.createdAt).format("DD-MMM-YYYY")}
                          </u>{" "}
                          by
                        </span>
                        <a href="" class="text-dark">
                          {listData?.createdBy?.fullName}
                        </a>
                      </div>
                      <button
                        type="button"
                        className="btn btn-icon btn-danger"
                        onClick={() => {
                          handleDelete();
                          // handleDelete(itm?.id);
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </section>

                  <section class="border-bottom mb-4 pb-4">
                    <div class="row">
                      <div class="col-3">
                        <img
                          src={
                            listData?.createdBy?.image
                              ? `https://endpoint.crowdsavetheworld.com/` +
                              listData?.createdBy?.image
                              : `https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg`
                          }
                          class="img-fluid shadow-1-strong rounded"
                          alt=""
                        />
                      </div>

                      <div class="col-9">
                        <p class="mb-2">
                          <strong>{listData?.createdBy?.fullName}</strong>
                        </p>
                        <a href="" class="text-dark">
                          <i class="fab fa-facebook-f me-1"></i>
                        </a>
                        <a href="" class="text-dark">
                          <i class="fab fa-twitter me-1"></i>
                        </a>
                        <a href="" class="text-dark">
                          <i class="fab fa-linkedin me-1"></i>
                        </a>
                        <p>{listData?.createdBy?.aboutme}</p>
                      </div>
                    </div>
                  </section>

                  <section class="border-bottom mb-3">
                    <p class="text-center">
                      <strong>Comments: {comments?.length}</strong>
                    </p>

                    {comments &&
                      comments?.map((itm) => {
                        return (
                          <div class="row mb-4">
                            <div class="col-2">
                              <img
                                style={{
                                  borderRadius: "50%",
                                  width: "50px",
                                  height: "50px",
                                }}
                                src={
                                  itm?.createdBy?.image
                                    ? `https://endpoint.crowdsavetheworld.com/` +
                                    itm?.createdBy?.image
                                    : `https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg`
                                }
                                alt=""
                              />
                            </div>

                            <div class="col-10">
                              <p class="mb-2">
                                <strong>{itm?.createdBy?.fullName}</strong>
                              </p>
                              <p>{itm?.post_comment}</p>
                              <p>
                                {moment(itm?.createdAt).format("DD-MMM-YYYY")}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-icon btn-danger"
                              onClick={() => {
                                DeleteCOmment(itm?.id);
                                // handleDelete(itm?.id);
                              }}
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        );
                      })}
                  </section>
                </div>
              </div>
            </div>
          }
        </section>
      </div>
    </Layout>
  );
}

export default ViewReport;
