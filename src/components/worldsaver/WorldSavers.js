import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom'
// import img1 from "../../assets/img/banner.jpg";
import { getUserProjects, sendInvites } from '../../actions/project';
import { getWorldSavers } from './../../actions/worldsavers';
import { allNormalCategories } from '../../actions/category';
import { apiUrl } from '../../environment';
import { UserList } from '../../actions/user';
import person from '../../assets/img/person.png';
import ApiClient from '../../api-client';

const WorldSavers = (props) => {
  const [projectData, setProjectData] = useState([]);
  console.log(projectData, "projectData");
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoader] = useState(false)
  const { isLoading } = useSelector((state) => state.loader);
  const token = props.user.access_token;

  useEffect(() => {

    const params = new URLSearchParams(window.location.search)
    // console.log("value journeyList", params.get('name'))
    let prms = {
      name: params.get('name') ? params.get('name') : '',
      categoryID: params.get('categoryID') ? params.get('categoryID') : '',
      city: params.get('city') ? params.get('city') : '',
      country: params.get('country') ? params.get('country') : '',
      gender: params.get('gender') ? params.get('gender') : ''
    }

    setKeyword(prms.name)
    getData(prms)
    props.UserList(token, (res) => {
      setUserList(res.data);
    });
    props.allNormalCategories();
  }, []);

  const search = (e) => {
    setKeyword(e)
    getData({ name: e })
    //console.log("e", e)
  }

  const getData = (e = '') => {
    let params = {
      count: 1000,
      page: 1,
      search: e.name ? e.name : '',
      categoryID: e.categoryID ? e.categoryID : '',
      city: e.city ? e.city : '',
      country: e.country ? e.country : '',
      gender: e.gender ? e.gender : '',
    };
    const getUrl = `${apiUrl}/worldsaver/list`;
    setLoader(true)
    ApiClient.get(getUrl, params, `Bearer ${token}`)
      .then((res) => {
        if (res.success) {
          setProjectData(res.data);
        }
        setLoader(false)
      }, err => {
        setLoader(false)
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    //console.log("keyword", keyword)
  }

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
    <>

      <div
        className="page--header pt--60 pb--60 text-center"
        data-bg-img="img/preview-img/banner-bg.jpg"
        data-overlay="0.85"
      >
        <div className="container">
          <div className="title">
            <h2 className="h1 text-white">Meet world savers</h2>
          </div>
        </div>
      </div>

      <section className="page--wrapper pt--8 pb--20">
        <div className="container">
          <div className="row project-topbar">
            <div className="col-md-7">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  list="psychology_theories_list"
                  id="psychology_theories_search"
                  className="search-term mt-3 mb-3"
                  placeholder="Search on name"
                  onChange={(e) => search(e.target.value)}
                  value={keyword}
                />
              </form>
            </div>

          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* <!-- Main Content Start --> */}
            <div className="main--content col-md-12 pb--30">
              <div className="main--content-inner">
                <div className="row AdjustRow center-alignment">
                  {loading ? (
                    <Loading />
                  ) : projectData.length == 0 ? (
                    <h4>
                      No World Savers Found, Please change your search
                      preference.
                    </h4>
                  ) : (
                    projectData.map((obj, i) => {
                      const userData = obj;
                      const status = userData.status;
                      const lastLogin = moment(userData.lastLogin).fromNow();

                      // console.log
                      return (
                        <div
                          key={`clist-key-${i}`}
                          className="col-md-3 col-xs-6 col-xxs-12 pb--30"
                        >

                          <div className="member--item online">

                            <Link to={`/${userData.username}`} activeClassName="active">
                              <div className="img img-circle">
                                <a
                                  href="member-activity-personal.html"
                                  className="btn-link"
                                >
                                  <img
                                    src={
                                      userData.image
                                        ? `${apiUrl}${userData.image}`
                                        : person
                                    }
                                    alt=""
                                  />
                                </a>
                              </div>

                            </Link>

                            <div className="name">
                              <h3 className="h6 fs--12">

                                {userData.fullName}

                              </h3>
                            </div>

                            <div className="activity">
                              <p>
                                <i className="fa mr--8 fa-clock-o"></i>
                                {status === 'active'
                                  ? 'Active'
                                  : 'Inactive'}{' '}
                                {lastLogin}
                              </p>
                            </div>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

// export default ProjectModal;

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
});

export default connect(mapStateToProps, {
  getWorldSavers,
  getUserProjects,
  UserList,
  sendInvites,
  allNormalCategories,
})(WorldSavers);
