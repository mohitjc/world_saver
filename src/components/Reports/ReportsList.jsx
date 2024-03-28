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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

function ReportsList() {
  const [isLoading, setLoading] = useState(false);
  const [listData, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(5);
  const [reportForm, setReportForm] = useState({});
  const history = useHistory();
  let [filters, setfilters] = useState({
    // count: 5,
    // page: 1,
    type: "post",
  });
  console.log(page, "=================");
  const GetData = (p = {}) => {
    setLoading(true);
    let filter = { ...filters, ...p };
    ApiClient.get("/reports", filter).then((res) => {
      if (res.data?.success) {
        setData(res?.data?.data);
        setTotal(res?.data?.total);
        setLoading(false);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData({ page: page });
  }, [page]);

  const DeleteReport = (id) => {
    setLoading(true);
    Axios.delete(
      `https://endpoint.crowdsavetheworld.com/delete/report?id=${id}`
    ).then((res) => {
      if (res?.data?.success) {
        setLoading(false);
        GetData();
        swal(res?.data?.message);
      }
      setLoading(false);
    });
  };

  const handleDelete = (id) => {
    // console.log(item, 'itemitemitem');

    // const token = localStorage.getItem('token');
    swal({
      title: "Are you sure?",
      text: "you want to delete the report!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DeleteReport(id);
      } else {
        return null;
      }
    });
  };

  return (
    <Layout title="Reports">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title={"Reports"} />

          <div className="row">
            <div className="col-12">
              {/* reports */}
              <div className="card">
                <div className="card-header">
                  <h4>
                    {/* <button
              className="btn btn-primary"
              onClick={() => {
                handleFormVisibilty();
                handAddFormToggle(true);
                // resetSingleCategory();
              }}
              type="button"
            >
              Add Userreports
            </button> */}
                  </h4>
                  {/* <div className="card-header-form">
                    <form>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          onChange={(e) => {
                            //   setKeyword(e.target.value);
                            //   setPage(1);
                          }}
                        />
                        <div className="input-group-btn">
                          <button className="btn btn-primary">
                            <i className="fas fa-search" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div> */}
                </div>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <tr>
                          <th>Full Name</th>
                          <th
                            //   onClick={() => toggleSort("fullName")}
                            style={{ cursor: "pointer" }}
                          >
                            Type{" "}
                          </th>
                          <th>Reason</th>

                          <th>Created At</th>

                          <th>Action</th>
                        </tr>
                        {listData?.map((itm) => {
                          return (
                            <tr>
                              <td
                                onClick={async () => {
                                  setReportForm(itm);
                                  await Swal.fire({
                                    title: "Report Details",
                                    html: `
                                    <label>Report Type</label>
                                    <p>${itm?.reportType}</p>
                                    <label class="mt-3">Reason</label>
                                      <p>${itm?.reason}</p>
                                    `,
                                    focusConfirm: false,
                                  });
                                }}
                              >
                                {itm?.reportedByDetails?.fullName || "--"}
                              </td>
                              <td>{itm?.reportType || "--"}</td>
                              <td>{itm?.reason || "--"}</td>
                              <td>
                                {moment(itm?.createdAt).format("DD MMM YYYY")}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-icon btn-danger"
                                  onClick={() => {
                                    handleDelete(itm?.id);
                                  }}
                                >
                                  <i className="fas fa-trash" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-icon btn-primary ml-2"
                                  onClick={() => {
                                    history.push(`/report/${itm?.eventId}`);
                                  }}
                                >
                                  <i className="fas fa-eye" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                      {/* {users && isEmpty(users) && <EmptyState />} */}
                    </div>
                  </div>
                )}
                <Pagination total={total} setPage={setPage} page={page} />
                {/* {users && !isEmpty(users) && (
          )} */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ReportsList;
