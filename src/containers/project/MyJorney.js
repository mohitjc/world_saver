import React, { useEffect, useState } from 'react';
import ApiClient from '../../api-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function MyJorney() {
  const [event, setevent] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const token = localStorage.getItem('token');
  const [del, setdel] = useState(false);
  useEffect(() => {
    ApiClient.get(
      `
      https://endpoint.crowdsavetheworld.com/myjournylist`,
      token
    ).then((res) => {
      setevent(res?.data);
      setdel(false);
    });
  }, [del]);

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div className="container mt-4">
      <div className="mt-2 shadow p-3 ">
        <h2 className="heading">Journey</h2>
        <div className="table-responsive tb-middle" style={{ width: '100%' }}>
          {!event.length <= 0 ? (
            <table style={{ width: '100%' }} className="table ">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Slug</th>
                  <th>Created At</th>
                  <th>Updated At</th>

                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {event.map((itm) => {
                  return (
                    <tr>
                      <td
                        className="cursor-pointer"
                        onClick={() => {
                          history(`/journey/${itm.slug}`);
                        }}
                      >
                        {itm.name.substr(0, 10)}
                        {'...'}
                      </td>
                      <td>{itm.description.substr(0, 10)}</td>
                      <td>{itm.address.substr(0, 20) + '...' || '--'}</td>

                      <td>{itm.slug}</td>
                      <td>
                        {' '}
                        {months[new Date(itm && itm.createdAt).getMonth()] +
                          ' ' +
                          new Date(itm && itm.createdAt).getDate() +
                          ', ' +
                          new Date(itm && itm.createdAt).getFullYear()}
                      </td>
                      <td>
                        {' '}
                        {months[new Date(itm && itm.updatedAt).getMonth()] +
                          ' ' +
                          new Date(itm && itm.updatedAt).getDate() +
                          ', ' +
                          new Date(itm && itm.updatedAt).getFullYear()}
                      </td>
                      <td>{itm.status}</td>

                      <td>
                        {' '}
                        <button
                          type="button"
                          className="btn btn-icon btn-primary mr-2 my-2"
                          onClick={() => {
                            history(`/myjourney/${itm.id}`);
                          }}
                        >
                          <i className="far fa-edit" />
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          className="btn btn-icon btn-danger "
                          onClick={(e) => {
                            e.preventDefault();
                            ApiClient.delete(
                              `https://endpoint.crowdsavetheworld.com/myjourney?id=${itm.id} `
                            ).then((res) => {
                              console.log(res);
                              toast.success(res?.message);
                              setdel(true);
                            });
                          }}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <h4>You Do not have any Journey!!!!</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyJorney;
