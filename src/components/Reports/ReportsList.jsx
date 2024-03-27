import React, { useState } from "react";
import Loading from "../global/Loader";
import Layout from "../global/Layout";
import MainSidebar from "../global/MainSidebar";
import SectionHeader from "../global/SectionHeader";

function ReportsList() {
  const [isLoading, setLoading] = useState(false);
  return (
    <Layout title="Posts">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title={"Reports"} />

          <div className="row">
            <div className="col-12">
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
              Add User
            </button> */}
                  </h4>
                  <div className="card-header-form">
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
                  </div>
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
                        <tr>
                          <td>Vikas Rajput</td>
                          <td>Adult Content</td>
                          <td>Report Reason description</td>
                          <td>29 Feb 2028</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-icon btn-danger"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </td>
                        </tr>
                      </table>
                      {/* {users && isEmpty(users) && <EmptyState />} */}
                    </div>
                  </div>
                )}
                {/* {users && !isEmpty(users) && (
            <Pagination total={total} setPage={setPage} page={page} />
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
