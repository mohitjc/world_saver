import React, { useEffect, useState } from 'react';
import ApiClient from '../../api-client';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

function Booking() {
  const [event, setevent] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const [del, setdel] = useState(false);
  const { id } = useParams();

  const GetMyBookings = (myEvent) => {
    let filters = {
      page: 1,
      count: 20,
      isDeleted: false,
      event_id: id,
    };
    if (myEvent) {
      filters = {
        page: 1,
        count: 20,
        isDeleted: false,
        event_id: id,
        addedBy: user?.id,
      };
    }
    ApiClient.get(
      `https://endpoint.crowdsavetheworld.com/eventbookings`,
      filters
    ).then((res) => {
      setevent(res.data);
    });
  };
  useEffect(() => {
    ApiClient.get(
      `https://endpoint.crowdsavetheworld.com/eventbookings?page=1&count=200&search=&isDeleted=&booking_status&event_id=${id}`
    ).then((res) => {
      setevent(res.data);
    });
  }, [del]);

  const ChangeStatus = (id, status) => {
    ApiClient.put('eventbooking', { id: id, booking_status: 'accepted' }).then(
      (res) => {
        toast.success(res?.message);
      }
    );
  };
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
        <h5>Bookings</h5>
        <div className="d-flex">
          <button
            onClick={() => {
              GetMyBookings();
            }}
            className="btn btn-primary"
          >
            {' '}
            All Bookings
          </button>
          <button
            onClick={() => {
              GetMyBookings(true);
            }}
            className="btn btn-primary ml-2"
          >
            {' '}
            My Bookings
          </button>
        </div>
        <div className="table-responsive booking_t mt-3">
          {!event.length <= 0 ? (
            <table className="table  ">
              <thead>
                <tr>
                  <th className="booking_header">Title</th>
                  <th className="booking_header">Event Type</th>
                  <th className="booking_header">Price</th>
                  <th className="booking_header">StartDate</th>
                  <th className="booking_header">EndDate</th>
                  <th className="booking_header">No. of Reservation</th>
                  <th className="booking_header">Created At</th>
                  {/* <th className="booking_header">Status</th> */}
                  <th className="booking_header">Action</th>
                </tr>
              </thead>
              <tbody>
                {event.map((itm) => {
                  return (
                    <tr>
                      <td
                        className="cursor-pointer"
                        onClick={() => {
                          history(`/event/${itm.event_id}`);
                        }}
                      >
                        {itm.title}
                      </td>
                      <td>{itm.event_type}</td>
                      <p className="ml-2 mb-0">
                        {itm.cost
                          ? '$' + itm.cost * itm.no_of_reservation
                          : '--'}
                      </p>
                      <td>
                        {' '}
                        {months[
                          new Date(itm && itm.event_start_date).getMonth()
                        ] +
                          ' ' +
                          new Date(itm && itm.event_start_date).getDate() +
                          ', ' +
                          new Date(itm && itm.event_start_date).getFullYear()}
                      </td>
                      <td>
                        {' '}
                        {months[
                          new Date(itm && itm.event_end_date).getMonth()
                        ] +
                          ' ' +
                          new Date(itm && itm.event_end_date).getDate() +
                          ', ' +
                          new Date(itm && itm.event_end_date).getFullYear()}
                      </td>
                      <td className="text-center">{itm.no_of_reservation}</td>
                      <td>
                        {' '}
                        {months[new Date(itm && itm.createdAt).getMonth()] +
                          ' ' +
                          new Date(itm && itm.createdAt).getDate() +
                          ', ' +
                          new Date(itm && itm.createdAt).getFullYear()}
                      </td>
                      {/* <td onClick={ChangeStatus(itm?.id)}>
                        {itm.booking_status}
                      </td> */}
                      <td>
                        <button
                          type="button"
                          className="btn-icon delit_btn"
                          onClick={() => {
                            ApiClient.delete(
                              `https://endpoint.crowdsavetheworld.com/eventbooking?id=${itm.id}`
                            ).then((res) => {
                              toast.success(res.message);
                              setdel(true);
                              if (del == true) {
                                setdel(false);
                              }
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
              <h4>You Do not have any Event Booking!!!!</h4>
              <a
                onClick={() => {
                  history('/events');
                }}
              >
                Click Here To Book Events
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
