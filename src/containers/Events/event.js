import blogs from '../blogs';
import '../../index.css';
import { months } from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../environment';
import WordLimit from 'react-word-limit';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ICON_LIST } from './../../components/common/constants';
import ApiClient from '../../api-client';
import LocationSearchInput from '../../components/global/LocationSearchInput';
import { toast } from 'react-toastify';
import EventMap from '../../components/common/EventMap';

function Event() {
  const user = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const [eventlist, setEventlist] = useState([]);
  const [Check, setCheck] = useState(false);
  const [like, setlike] = useState(false);
  const [data, setdata] = useState([]);
  const history = useNavigate();
  const [journey, setjourney] = useState([]);
  const [UserProject, setUserProject] = useState([]);
  const [num, setnum] = useState(1);
  const [loc, setloc] = useState('');
  const [date, setdate] = useState('');
  const [state, setstate] = useState('Haryana');
  const [markers, setMarkers] = useState([]);
  const [booking, setbook] = useState([]);
  const [form, setform] = useState('');
  const [fav, setfav] = useState({
    data: [],
  });

  const arr = [
    {
      id: '6527d57c6f40cceb8cb57a49',
    },
    {
      id: '65279ed76f40cceb8cb57a18',
    },
    {
      id: '6527b2bb6f40cceb8cb57a26',
    },
  ];

  const listevents = (p = {}) => {
    let page = {
      count: 10,
      page: 1,
      lat: p?.lat,
      lng: p?.lng,
      journey: p?.journey,
      addedBy: !Check ? user?.id : '',
    };
    ApiClient.get(`${apiUrl}/events`, page).then(
      (res) => {
        // setLoader(false);
        setEventlist(res.data);
        setdata(res.data);
        const random = [...res?.data].sort(() => 0.5 - Math.random());
        const sort = random.slice(0, 7);
        mapitem(sort);
      },
      (err) => {
        // setLoader(false);
      }
    );
  };

  const GetJourneys = () => {
    ApiClient.get('https://endpoint.crowdsavetheworld.com/project', {
      user_id: user?.id,
    }).then((res) => {
      if (res.success) {
        setUserProject(res?.data?.data);
      }
    });
  };

  const BlogList = ({ getblogList, user, getblogListByCat, getblogSearch }) => {
    const { cat_id } = useParams();
    const [cat, setCat] = useState(cat_id || '');

    useEffect(() => {
      if (cat_id) {
        getblogListByCat(cat_id, user.access_token, (res) => {
          if (res.success) {
            setBlogs(res.data);
          }
        });
      } else {
        getblogList('', user.access_token, (res) => {
          if (res.success) {
            setBlogs(res.data);
          }
        });
      }
    }, []);
  };
  const mapitem = (data) => {
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
    });
    setMarkers(marker);
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

  // setFieldValue('address', value.address);

  const getAddressDetails = (value) => {
    listevents({ lat: value.latLng.lat, lng: value?.latLng?.lng });
    console.log(
      value.latLng.lat,
      "'''''''''''''''''''''''''''''''''''''''''''''''"
    );
    let res = value?.result?.address_components;
    console.log(res, '=================================');
    setloc(value.address);

    const getCountry = () => {
      let value = '';

      res.map((item) => {
        if (item.types[0] == 'country') {
          value = item.long_name;
        }
      });

      return value;
    };
    const getCity = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'locality') {
          value = item.long_name;
        }
      });
      return value;
    };
    const getState = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'administrative_area_level_1') {
          value = item.long_name;
        }
      });
      return value;
    };
    const getPostalCode = () => {
      let value = '';
      res.map((item) => {
        if (item.types[0] == 'postal_code') {
          value = item.long_name;
        }
      });
      return value;
    };

    // getState();
    // getCity();
    // getCountry();
    // setcountry(getCountry());
    // setcity(getCity());
    // setstate(getState());
  };

  console.log(user);
  useEffect(() => {
    listevents();
  }, [like, num, Check]);

  useEffect(() => {
    ApiClient.get(
      `https://endpoint.crowdsavetheworld.com/eventbookings?page=1&count=200&search&isDeleted&booking_status&event_id=&addedBy=${user.id}`
    ).then((res) => {
      setbook(res.data);
    });
  }, []);

  useEffect(() => {
    ApiClient.get(
      'https://endpoint.crowdsavetheworld.com/project?type=I&search=&page=1&count=&sortBy=createdAt%20desc'
    ).then((res) => {
      setjourney(res.result);
    });
  }, []);
  useEffect(() => {
    const fltr = eventlist.filter((itm) => itm.state == state);
  }, state);

  const HandleCheck = (e) => {
    if (e.target.checked) {
      // listevents({ addedBy: user?.id });
      setCheck(false);
    } else {
      // listevents();
      setCheck(true);
    }
  };
  useEffect(() => {
    const fltr = booking.filter((itm) => {
      if (
        moment(itm.startDate).format('YYYY-MM-DD') !=
        moment(Date.now).format('YYYY-MM-DD')
      ) {
        toast.success(`Your Booked Event ${itm.title} is Going Live Soon`);
      }
    });
  }, [booking]);
  // useEffect(() => {
  //   const fltr = data.filter((itm) => itm.city == city);

  //   setEventlist(fltr);
  // }, [city]);
  // useEffect(() => {
  //   const fltr = data.filter((itm) => itm.state == state);

  //   setEventlist(fltr);
  // }, [state]);
  // useEffect(() => {
  //   const fltr = data.filter((itm) => itm.country == country);

  //   setEventlist(fltr);
  // }, [country]);
  useEffect(() => {
    const fltr = data.filter(
      (itm) => moment(itm.startDate).utc().format('YYYY-MM-DD') == date
    );

    setEventlist(fltr);
  }, [date]);

  // useEffect(() => {
  //   const fltr = data.filter((itm) => itm.journey?.id == form);

  //   setEventlist(fltr);
  // }, [form]);

  const ListItemLink = ({ item, ...rest }) => {
    return (
      <>
        {item?.isCustom ? (
          <>
            <a
              href={`${item?.blogUrl}`}
              target="_new"
              {...rest}
              className="continue"
            ></a>
          </>
        ) : (
          <>
            <Link to={`/blogdetail/${item.id}`} {...rest}></Link>
          </>
        )}
      </>
    );
  };

  const Loading = () => {
    return (
      <div className="d-flex align-items-center flex-column justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <BeatLoader color={'#5383ff'} loading={true} />
        </div>
      </div>
    );
  };

  return (
    <div class="container">
      <div className="mt-2">
        <div className="d-flex justify-content-between my-2">
          <h2 className="heading">Events</h2>
          <button
            type="button"
            onClick={(e) => {
              // if (UserProject?.length == 0) {
              //   toast.error('Please create Journey Firstt');
              // }
              history(`/addevent`);
            }}
            className="btn btn-primary"
          >
            Add Event
          </button>
        </div>
        <EventMap markerList={[...markers]} />
        <div
          className="d-flex justify-content-around mt-5"
          style={{ width: '80%' }}
        >
          <div className="d-flex flex-column" style={{ width: '50%' }}>
            <label htmlFor="endDate" className="form-label">
              Search By Address
            </label>
            <LocationSearchInput
              getAddressDetails={getAddressDetails}
              value={loc}
            />
          </div>
          <div className="d-flex flex-column ml-3" style={{ width: '50%' }}>
            <label htmlFor="endDate" className="form-label">
              Search By Date
            </label>
            <input
              type="date"
              className="form-control"
              required
              value={date}
              onChange={(e) => {
                setdate(e.target.value);
                if (e.target.value == '') {
                  setnum(num + 1);
                }
              }}
              name="endDate"

              // onBlur={handleBlur}
            />
          </div>
          <div className="d-flex flex-column ml-3 " style={{ width: '50%' }}>
            <label htmlFor="endDate" className="form-label">
              Search By Jouney
            </label>
            <select
              value={form}
              onChange={(e) => {
                listevents({ journey: e.target.value });
                setform(e.target.value);
              }}
              class="form-control"
              aria-label="Default select example"
            >
              <option value={''}>Search By Journey</option>
              {journey?.map((itm, key) => {
                return <option value={itm.id}>{itm.name}</option>;
              })}
            </select>
          </div>

          <div className="ml-3 w-25">
            <label className="form-label d-block">My Events</label>
            <input
              type="checkbox"
              checked={!Check}
              onClick={HandleCheck}
              className="ml-4"
              id="one"
              name="one"
              value="one"
            />
          </div>
        </div>
        <div class="row mb-5">
          {!eventlist.length <= 0 ? (
            eventlist.map((itm, i) => {
              return (
                <div class="col-md-4 mt-2 mb-3">
                  <div class="card card_design h-100">
                    <div className="card_img pointer">
                      <a
                        style={{ color: 'blue' }}
                        className="mt-1 ml-3 cursor-pointer"
                        onClick={() => {
                          history(`/journey/${itm.journey?.slug}#`);
                        }}
                      >
                        {' '}
                        {itm?.journey?.name}{' '}
                      </a>
                      {itm.featuredImage ? (
                        <img
                          style={{ width: '100%', height: '36vh' }}
                          src={
                            'https://endpoint.crowdsavetheworld.com' +
                            itm.featuredImage
                          }
                          alt=""
                          onClick={() => {
                            history(`/event/${itm.title}`);
                          }}
                        />
                      ) : (
                        <img
                          style={{ width: '100%', height: '36vh' }}
                          src="/assets/img/banner.jpg"
                          alt=""
                          onClick={() => {
                            history(`/event/${itm.title}`);
                          }}
                        />
                      )}

                      <i
                        class={`fa fa-heart-o ${
                          !itm.isFavourite ? 'heart_white' : 'heart_img '
                        } `}
                        onClick={() => {
                          ApiClient.post(
                            'https://endpoint.crowdsavetheworld.com/favourite',
                            { event: itm.id }
                          ).then((res) => {
                            setlike(true);
                            if (like == true) {
                              setlike(false);
                            }
                          });
                        }}
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{itm.title}</h5>
                      <p>
                        {' '}
                        {months[new Date(itm && itm.startDate).getMonth()] +
                          ' ' +
                          new Date(itm && itm.startDate).getDate() +
                          ', ' +
                          new Date(itm && itm.startDate).getFullYear()}{' '}
                        {''} {itm.time} {''} {itm.timetype}
                      </p>{' '}
                      <p className="mb-1">
                        {itm.city} {''} {itm.state} {''} {itm.country}
                      </p>
                      <p class="card-text mb-0 text-truncate">
                        {itm.description}
                      </p>
                      <p className="mb-1">
                        {itm?.eventType || '--'}{' '}
                        <span className="text-success font-weight-bold">
                          {''}
                          {itm.cost ? '$' + itm?.cost : null}
                        </span>
                      </p>
                      <p>Venue Size : {itm.sizeOfVenue}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '60vh' }}
            >
              <h4>No Event To Show Here</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Event;
