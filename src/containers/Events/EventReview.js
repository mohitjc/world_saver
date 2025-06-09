import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import globe from './globe.svg';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { ICON_LIST } from './../../components/common/constants';
import EventMap from '../../components/common/EventMap';
function EventReview() {
  const [event, setevent] = useState([]);
  const param = useParams();
  const history = useNavigate();
  const [data, setdata] = useState([]);
  const [num, setnum] = useState(1);
  const user = useSelector((state) => state.user);
  const [join, setjoin] = useState(true);
  const [rep, setrep] = useState(false);
  const [markers, setMarkers] = useState();
  const [spot, setspot] = useState(false);
  const [tags, settag] = useState([]);
  // const [journey, setjourney] = useState([]);
  const [book, setbook] = useState(false);
  const [report, setreport] = useState({
    reason: '',
    reportType: '',
    eventId: '',
    type: '',
  });
  const [form, setform] = useState({
    message: '',
    event_id: '',
    no_of_reservation: '',
    reservation_details: [],
  });
  const getPlaces = (obj) => {
    let markers = [];
    obj.map((obj, i) => {
      markers.push({
        id: obj.id,
        name: obj.title,
        address: obj.address === undefined ? '-' : obj.address,
        lat: obj.lat,
        lng: obj.lng,
        icon: ICON_LIST.icon2,
      });
    });
    setMarkers(markers);
  };
  useEffect(() => {
    let page = {
      // count: 10,
      page: 1,
    };
    ApiClient.get(`${apiUrl}/events`, page).then(
      (res) => {
        // setLoader(false);
        setevent(res.data);
      },
      (err) => {
        // setLoader(false);
      }
    );

    // ApiClient.get(
    //   `https://endpoint.crowdsavetheworld.com/eventbooking?id=${user.id}`
    // ).then((res) => { });
  }, []);

  const MapItem = (data) => {
    let marker = [];
    data.map((itm) => {
      marker.push({
        id: itm.id,
        name: itm?.title,
        slug: itm?.journey?.slug,
        title: itm?.journey?.name,
        lat: Number(itm?.lng),
        lng: Number(itm?.lat),
        address: itm.address,
        icon: ICON_LIST.icon2,
      });
      setMarkers(marker);
    });
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

  if (num < 0) {
    setnum(0);
  }
  useEffect(() => {
    console.log(markers);
  });
  useEffect(() => {
    const fltr = event.filter((itm) => itm.title == param.title);

    setdata(fltr);
    MapItem(fltr);
    console.log(
      '==============================================+++++++>>>>>>>>>>>>>>>>>>>>>>',
      fltr
    );
  }, [event]);

  const AddTag = () => {
    tags.push({
      name: '',
      number: '',
    });
    settag([...tags]);
  };

  const removetag = (index) => {
    settag([...tags.filter((itm, i) => i != index)]);
    setform({
      ...form,
      reservation_details: [...tags.filter((itm, i) => i != index)],
    });

    setnum(num - 1);
  };

  const updatetag = (index, key, value) => {
    let arr = tags;
    arr[index][key] = value;
    settag([...arr]);
    setform({
      ...form,
      reservation_details: [...arr],
      no_of_reservation: arr.length,
    });
    setnum(arr.length);

    if (num > data[0]?.sizeOfVenue) {
      toast.warn('You have Exceed the limit of booking');
    }
  };
  if (num > data[0]?.sizeOfVenue) {
    toast.warn('You have Exceed the limit of booking');
  }

  // useEffect(() => {
  //   ApiClient.get(
  //     `https://endpoint.crowdsavetheworld.com/getUserProjects?id=${user.id}`
  //   ).then((res) => {
  //     console.log(res);
  //     setjourney(res?.result.data);
  //   });
  // }, []);

  return (
    <div class="container pb-4" onClick={() => {}}>
      {data.map((itm) => {
        return (
          <div className="mt-2">
            <h2 className="heading">
              Event{' '}
              {itm?.addedBy == user?.id ? (
                <i
                  onClick={(e) => {
                    history(`/editevent/${itm?.id}`);
                  }}
                  className="fa fa-pen fs-6 ml-2"
                  title="Edit"
                ></i>
              ) : null}
            </h2>
            <div class=" mb-5 row ph_view ">
              <div className="col-md-10 mb-md-0 mb-3">
                <div className={` ${spot ? 'd-auto' : 'd-none'}`}>
                  <form style={{ width: '100%' }}>
                    {tags.map((itm, i) => {
                      return (
                        <div
                          className="row mb-3 border mt-4 p-2 mx-0 w-[120%] rounded"
                          onChange={(e) => {
                            if (num > data[0]?.sizeOfVenue) {
                              removetag(i);
                            }
                          }}
                        >
                          <h5>Person</h5>
                          <div className="col-md-12 mb-3">
                            <label>Name</label>
                            <input
                              type="text"
                              value={itm.name}
                              maxLength={20}
                              onInput={(object) => {
                                if (
                                  object.target.value.length >
                                  object.target.maxLength
                                ) {
                                  object.target.value =
                                    object.target.value.slice(
                                      0,
                                      object.target.maxLength
                                    );
                                }
                              }}
                              style={{ width: '100%', borderRadius: '5px' }}
                              className="form-control"
                              onChange={(e) => {
                                updatetag(i, 'name', e.target.value);
                              }}
                              required
                            />
                            <label className="mt-2">Mobile Number</label>
                            <input
                              type="number"
                              value={itm.number}
                              maxLength={10}
                              onInput={(object) => {
                                if (
                                  object.target.value.length >
                                  object.target.maxLength
                                ) {
                                  object.target.value =
                                    object.target.value.slice(
                                      0,
                                      object.target.maxLength
                                    );
                                }
                              }}
                              className="form-control"
                              style={{ width: '100%', borderRadius: '5px' }}
                              onChange={(e) => {
                                updatetag(i, 'number', e.target.value);
                              }}
                              required
                            />
                          </div>

                          <div className="col-md-12 mb-3 text-right">
                            <i
                              className="fa fa-trash text-danger pointer"
                              onClick={(e) => removetag(i)}
                            ></i>
                          </div>
                        </div>
                      );
                    })}
                    <div>
                      <button
                        type="button"
                        className="btn btn-success light_white mt-3"
                        onClick={AddTag}
                      >
                        <i class="fa fa-plus mr-2" aria-hidden="true"></i>Add
                        Person
                      </button>
                    </div>
                  </form>
                </div>
                <form className={`${rep ? 'd-auto' : 'd-none'}`}>
                  <div class="form-outline">
                    <label class="form-label" for="form12">
                      Report Type
                    </label>
                    <select
                      onChange={(e) => {
                        setreport({ ...report, reportType: e.target.value });
                      }}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select Report Type</option>

                      <option value="Spam">Spam</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="Copyright Claim">Copyright Claim</option>
                      <option value="Adult Content">Adult Content</option>
                    </select>
                  </div>
                  <div class="form-outline">
                    <label class="form-label mt-2" for="form12">
                      Your Message
                    </label>
                    <textarea
                      onChange={(e) => {
                        console.log(report);
                        setreport({ ...report, reason: e.target.value });
                      }}
                      type="text"
                      id="form12"
                      cols={45}
                      required
                      class="form-control"
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      type="btn"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        ApiClient.post(
                          'https://endpoint.crowdsavetheworld.com/report',
                          report
                        ).then((res) => {
                          toast.success(res.message);
                          setrep(false);
                        });
                      }}
                    >
                      Report
                    </button>
                  </div>
                </form>
                {itm?.featuredImage ? (
                  <img
                    className={`${spot || rep ? 'd-none' : 'd-auto event_img'}`}
                    src={
                      'https://endpoint.crowdsavetheworld.com' +
                      itm?.featuredImage
                    }
                    alt=""
                  />
                ) : (
                  <img
                    className={`${spot || rep ? 'd-none' : 'd-auto event_img'}`}
                    src="/assets/img/banner.jpg"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-2">
                {' '}
                <div
                  className={`form-floating mb-3  flex-column ${
                    rep ? 'd-none' : 'd-flex'
                  }`}
                  style={{
                    border: '2px solid #113b5e',
                    height: 'fit-content',
                    padding: '10px',
                    textAlign: 'center',
                    borderRadius: '5px',
                  }}
                >
                  {itm.eventType == 'free' ? (
                    <h6 className="ml-2">Free Webinar</h6>
                  ) : (
                    <h6 className="ml-2">Paid Webinar</h6>
                  )}
                  <div>
                    {itm.cost ? (
                      <h6 className="ml-2">${itm.cost * num}</h6>
                    ) : null}
                  </div>
                  <div className="d-flex justify-content-center  align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      cursor="pointer"
                      onClick={() => {
                        setnum(num - 1);
                      }}
                      fill="currentColor"
                      class="bi bi-dash bg-light mr-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>

                    {num}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      cursor="pointer"
                      onClick={() => {
                        setnum(num + 1);
                      }}
                      fill="currentColor"
                      class="bi bi-plus bg-light ml-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    {!spot ? (
                      <button
                        type="btn"
                        className="btn btn-primary"
                        onClick={() => {
                          setspot(true);

                          setform({ ...form, event_id: itm.id });
                        }}
                      >
                        Reserve a Spot
                      </button>
                    ) : (
                      <button
                        type="btn"
                        className="btn btn-primary"
                        onClick={() => {
                          setspot(true);
                          if (
                            form.event_id == '' ||
                            form.no_of_reservation == '' ||
                            form.reservation_details == '' ||
                            num > data[0]?.sizeOfVenue
                          ) {
                            toast.warn('Provide All Feilds');
                            if (num > data[0]?.sizeOfVenue) {
                              toast.warn(
                                'You have Exceed the limit of booking'
                              );
                            }
                          } else {
                            ApiClient.post(
                              'https://endpoint.crowdsavetheworld.com/eventbooking',
                              form
                            )
                              .then((res) => {
                                toast.success(res.message);
                                if (res.success) {
                                  setspot(false);
                                }
                              })
                              .catch((err) => {
                                toast.warn('You Have already reserved Seats');
                                setbook(true);
                                setspot(false);
                              });
                          }
                        }}
                      >
                        Book Spot
                      </button>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center ">
                  <svg
                    onClick={() => {
                      setrep(true);
                      setspot(false);
                      if (rep == true) {
                        setrep(false);
                      }
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-flag bg-light  cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                  </svg>
                  <h6
                    className="mt-2"
                    onClick={() => {
                      setrep(true);
                      setspot(false);
                      if (rep == true) {
                        setrep(false);
                      }
                    }}
                  >
                    Report
                  </h6>

                  <h6
                    className="mt-2 ml-2 cursor-pointer"
                    onClick={() => {
                      history(`/mybooking/${data[0]?.id}`);
                    }}
                  >
                    View Booking
                  </h6>
                </div>
              </div>
            </div>

            <div className="">
              <EventMap markerList={markers} />
              <div className="mt-2 d-flex flex-column">
                <div className="d-flex">
                  <img src={globe} alt="" />
                  <h5 className="mb-0 ml-2">Location</h5>
                </div>
                <h6>{itm.address}</h6>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 mb-3">
                {' '}
                <div class="card-body bg-light">
                  <p>
                    {' '}
                    {months[new Date(itm && itm.startDate).getMonth()] +
                      ' ' +
                      new Date(itm && itm.startDate).getDate() +
                      ', ' +
                      new Date(itm && itm.startDate).getFullYear()}
                    {', '}
                    {itm.time} {itm.timetype}
                  </p>
                  <h1 class="card-title text-xl ">{itm.title}</h1>
                  <p class="card-text">{itm.description}</p>
                  <p>Size Of Venue-: {itm.sizeOfVenue}</p>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex p-3 align-items-center bg-light">
                  <img
                    className="cursor-pointer"
                    onClick={() => {
                      history(`/journey/${itm.journey?.slug}#`);
                    }}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '100%',
                    }}
                    src={
                      itm?.journey?.image !== ''
                        ? 'https://endpoint.crowdsavetheworld.com' +
                          itm?.journey?.image
                        : 'https://as2.ftcdn.net/jpg/00/65/77/27/500_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
                    }
                    alt=""
                  />
                  <div className="d-flex ml-3 justify-content-center align-item-center bg-light">
                    <h6
                      className="cursor-pointer text-lg"
                      onClick={() => {
                        history(`/journey/${itm.journey?.slug}#`);
                      }}
                    >
                      {itm.journey?.name}
                    </h6>
                    {join ? (
                      <h5
                        className="ml-4 cursor-pointer"
                        onClick={() => {
                          ApiClient.post(
                            'https://endpoint.crowdsavetheworld.com/joinProject',
                            { project_id: itm?.journey?.id, user_id: user.id }
                          ).then((res) => {
                            toast.success(res.message);
                            if (res.message == 'Journey joined successfully.') {
                              setjoin(false);
                            }
                          });
                        }}
                      >
                        + Join Journey
                      </h5>
                    ) : (
                      <h5
                        className="ml-4 cursor-pointer"
                        onClick={() => {
                          ApiClient.put(
                            'https://endpoint.crowdsavetheworld.com/unjoinProject',
                            { project_id: itm?.journey?.id, user_id: user.id }
                          ).then((res) => {
                            toast.success(res.message);
                            setjoin(true);
                          });
                        }}
                      >
                        - Leave Journey
                      </h5>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <h3 className="events_label">When And Where</h3>
                <div className="mbg-light d-flex justify-content-between">
                  <div className="d-flex align-items-center ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      color="green"
                      fill="currentColor"
                      class="bi bi-calendar mb-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                    <div className="d-flex flex-column ml-1">
                      <p className=" mb-0 date_event">Date And Time</p>
                      <div className="bg-light p-3">
                        {' '}
                        {months[new Date(itm && itm.startDate).getMonth()] +
                          ' ' +
                          new Date(itm && itm.startDate).getDate() +
                          ', ' +
                          new Date(itm && itm.startDate).getFullYear()}
                        {', '}
                        {itm.time} {itm.timetype}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <h3 className="events_label">Tags</h3>
                <div className="bg-light p-3">
                  {data[0]?.tags.map((itm) => {
                    return (
                      <>
                        <h1
                          className="badge bg-secondary  ml-2"
                          style={{
                            width: '60px',
                            padding: '5px',

                            paddingTop: '2px',
                            paddingBottom: '2px',
                            borderRadius: '10px',
                          }}
                        >
                          {itm.name}
                        </h1>
                      </>
                    );
                  })}
                  <a
                    className="ml-2 text-primary pr-3 pl-3 pt-1 pb-1 cursor-pointer"
                    onClick={() => {
                      history('/events');
                    }}
                  >
                    Show all tags
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EventReview;
