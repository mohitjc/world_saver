import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ApiClient from "../apiClient";
import Loading from "../global/Loader";
// import { toast } from "react-toastify";

const UserListItem = ({
  item,
  index,
  handAddFormToggle,
  handleFormVisibilty,
  deleteUser,
  getUserId,
  changeStatus,
  getStatus,
  page,
  resetStatus,
  getAllUser,
  count,
}) => {
  console.log(page, "pagepage");
  const [form, setform] = useState({});
  const handleDelete = () => {
    console.log(item, "itemitemitem");

    const token = localStorage.getItem("token");
    swal({
      title: "Are you sure?",
      text: "you want to delete the user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(item && item.id, token);
      } else {
        return null;
      }
    });
  };

  const HandleCHangeStatus = (e) => {
    e.preventDefault();
    // Loading(TRUE)
    ApiClient.put("/changestatus/user", form).then((res) => {});
  };
  const HandleUpdateStatus = (status) => {
    let payload = {
      id: item?.id,
      reason: "",
      status: "active",
    };
    // Loading(TRUE)
    ApiClient.put("/changestatus/user", payload).then((res) => {
      // toast.success(res?.data?.message);
    });
  };

  const handleStatus = (status) => {
    const token = localStorage.getItem("token");
    const obj = {
      model: "users",
      id: item && item.id,
      status,
    };
    getStatus(status);
    changeStatus(obj, token);
  };

  // Guide button function
  const guidestatus = (item) => {
    console.log(item);
    const token = localStorage.getItem("token");
    const obj = {
      isGuide: item.isGuide ? false : true,
    };

    ApiClient.put("/user/" + item.id, obj).then((res) => {
      getAllUser();
    });
  };
  // console.log('page * count ', page, count);
  // console.log('page * count ', page * count);
  // console.log('page * count ', page * count - (count - 1));
  return (
    <tr>
      <td>{index + page * count - (count - 1)}</td>
      <td>
        <Link to={`/user/${item && item.id}`}>
          {item && item.fullName ? item.fullName : "___"}
        </Link>
      </td>
      <td>{item && item.email}</td>
      <td>{item && item.mobile ? item.mobile : "___"}</td>
      <td>
        {item && item.status === "deactive" ? (
          <button
            type="button"
            className="badge badge-warning"
            onClick={() => HandleUpdateStatus("active")}
          >
            Deactive
          </button>
        ) : (
          <button
            type="button"
            className="badge badge-success"
            onClick={() => {
              setform({ ...form, id: item?.id, status: "deactive" });
              document.getElementById("OpenStatusModal").click();
            }}
          >
            Active
          </button>
        )}
      </td>
      {/* Guide Button */}
      <td>
        {item.isGuide == true ? (
          <button
            type="button"
            className="badge badge-success"
            onClick={() => guidestatus(item)}
          >
            Unguide
          </button>
        ) : (
          <button
            type="button"
            className="badge badge-warning"
            onClick={() => guidestatus(item)}
          >
            Guide
          </button>
        )}
      </td>
      <div
        // style={{
        //   zIndex: 100000,
        // }}
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Reson to Deactive
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={HandleCHangeStatus}>
                <div>
                  <label>Reason</label>
                </div>
                <textarea className="text_area"
                  required
                  value={form?.reason}
                  onChange={(e) => {
                    setform({ ...form, reason: e.target.value });
                  }}
                  name=""
                  id=""
                  cols="40"
                  rows="10"
                ></textarea>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" ty class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <td>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-icon btn-primary "
            onClick={() => {
              handAddFormToggle(false);
              handleFormVisibilty();
              getUserId(item && item.id);
            }}
          >
            <i className="far fa-edit" />
          </button>
          <button
            type="button"
            className="btn  btn-icon btn-danger ml-2"
            onClick={handleDelete}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </td>

      <button
        style={{ display: "none" }}
        type="button"
        id="OpenStatusModal"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
    </tr>
  );
};

export default UserListItem;
