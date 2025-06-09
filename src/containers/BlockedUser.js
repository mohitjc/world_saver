import React, { useEffect, useState } from 'react';
import moment, { months } from 'moment';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ApiClient from '../api-client';

function BlockedUser() {
  const [data, setdata] = useState([]);
  const user = useSelector((state) => state.user);
  const [Blokeduser, setBlokedUser] = useState([]);

  const GetBlockedUsers = () => {
    let blockedArray = [];
    ApiClient.get('https://endpoint.crowdsavetheworld.com/blocklist').then(
      (res) => {
        if (res?.success) {
          setdata(res?.data);
          res.data.map((itm) => {
            blockedArray.push(`${itm?.id}`);
          });
          setBlokedUser(blockedArray);
        }
      }
    );
  };

  const UnblockUser = (id) => {
    console.log(id);
    const FilterBlocked = Blokeduser?.filter((itm) => itm != id);

    ApiClient.put('https://endpoint.crowdsavetheworld.com/block', {
      id: user?.id,
      blocked_users: FilterBlocked,
    }).then((res) => {
      if (res.success) {
        toast.success('User unblocked successfuly');
        GetBlockedUsers();
      }
    });
  };

  useEffect(() => {
    GetBlockedUsers();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="mt-2 shadow p-3 ">
          <h5>Blocked Users</h5>
          <div className="d-flex"></div>
          <div className="table-responsive booking_t mt-3">
            {!data.length <= 0 ? (
              <table className="table  ">
                <thead>
                  <tr>
                    <th className="booking_header">Full Name</th>
                    <th className="booking_header">Username</th>
                    {/* <th className="booking_header">Price</th> */}
                    {/* <th className="booking_header">StartDate</th> */}
                    <th className="booking_header">Blocked Date</th>
                    {/* <th className="booking_header">No. of Reservation</th> */}
                    {/* <th className="booking_header">Created At</th> */}
                    {/* <th className="booking_header">Status</th> */}
                    <th className="booking_header">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((itm) => {
                    return (
                      <tr>
                        <td className="cursor-pointer">{itm.fullName}</td>
                        <td>{itm.username}</td>

                        <td>{moment(itm?.createdAt).format('DD-MMM-YYYY')}</td>
                        <td>
                          <button
                            title="Unblock"
                            type="button"
                            className="btn-icon btn"
                            onClick={() => {
                              UnblockUser(itm?.id);
                            }}
                          >
                            <i
                              class="fa fa-unlock"
                              color="green"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <>
                <h4>You Do not have any Blocked Users!!!!</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockedUser;
