import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
// import { history } from '../../main/history';
// import Search from 'antd/lib/input/Search';
import {
  getprojectList,
  addFriend,
  getCommonSearchList,
} from '../../actions/project';
// IMAGES
// import UserAvtar from '../../assets/img/icon/user-avtar.png';
import no_image from '../../assets/img/default.jpg';
import { apiUrl } from '../../environment';
import { useNavigate } from 'react-router';

const SearchAsync = (props) => {
  const [inputValue, setValue] = useState('');
  const [frnd, setFriend] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [placeholder, setPlaceholder] = useState(
    'Search Journeys or World Savers'
  );
  const [serachData, setSerachData] = useState([]);
  const [itemData, setItemData] = useState();
  const history = useNavigate();

  const handleInputChange = (newValue) => {
    // console.log(newValue, 'newValue');
    const inputValue = newValue.replace(/\W/g, ' ');

    setValue(inputValue);

    return inputValue;
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
    console.log(value, 'value123456789');
    value.isBlogs
      ? window.open(`${value.blogUrl}`)
      : !value.isUser
      ? history(`/journey/${value.id}`)
      : history(`/${value.id}`);

    setTimeout(() => {
      let el = document.getElementById('getProject');
      if (el) el.click();

      let el2 = document.getElementById('getMemberDetail');
      if (el2) el2.click();
    }, 100);
  };

  const loadOptions = (inputValue, callback) => {
    setKeyword(inputValue);

    setTimeout(() => {
      // const token = props.user.access_token;
      const token012 = localStorage.getItem('headertoken');

      const params = {
        user_id: props.user.id,
        search: inputValue,
      };

      props.getCommonSearchList(params, token012, (res) => {
        // console.log(res.data, 'search1212');
        var searchResponse = []
          .concat(res.projects)
          // var searchRes = [].at(res.blogs)
          // console.log(searchRes, "searchRes")
          .concat(res.users.filter((x) => (x['isUser'] = true)))
          .concat(res.blogs.filter((x) => (x['isBlogs'] = true)));
        // .concat(res.blogUrl.filter((x) => (x['blogUrl'] = true)));
        callback(searchResponse);
        setSerachData(() => {
          return [...searchResponse];
        });
      });
    }, 10);
  };

  const handleInvite = (friendId) => {
    const token090 = localStorage.getItem('headertoken');
    // console.log(token090, 'asdas');
    const addFriendModal = { user_id: props.user.id, friend_id: friendId };
    props.addFriend(addFriendModal, token090, (res) => {
      setFriend(friendId);
      // console.log(res, "addfriend");
    });
  };

  // console.log(props.data.id, "props.data.id");
  const CustomLayout = (props) => {
    let id = props.data.isUser ? props.data.username : props.data.slug;
    return (
      <div {...props.innerProps} className="header-dropdown-option">
        <div
          className="elipses-text"
          onClick={() =>
            handleChange({
              id: id,
              isUser: props.data.isUser,
              isBlogs: props.data.isBlogs,
              blogUrl: props.data.blogUrl,
            })
          }
        >
          <img
            className="search-img"
            src={props.data.image ? apiUrl + `${props.data.image}` : no_image}
          />

          {props.data.isUser
            ? `${props.data.firstName} ${props.data.lastName}`
            : props.label}
        </div>

        {serachData && serachData.map((item) => setItemData(item.isFriend))}

        {itemData == false ? (
          <i
            className="fa fa-user-plus cursor-pointer my-auto"
            onClick={() => handleInvite(props.value)}
          ></i>
        ) : (
          ' '
        )}
      </div>
    );
  };

  useEffect(() => {
    let el = document.getElementById('body');
    if (el.offsetWidth <= 768) setPlaceholder('search');
  }, []);

  return (
    <div className="App">
      <div className="searchbarfield">
        <AsyncSelect
          closeMenuOnSelect={false}
          placeholder={placeholder}
          components={{ Option: CustomLayout }}
          value={selectedValue}
          getOptionLabel={(e) => e.name || e.title}
          getOptionValue={(e) => e.id}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          isUser={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'lightBlue',
              primary: 'black',
            },
          })}
        />

        <span className="searchicons">
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.category,
  user: state.user,
  projects: state.projects,
});

export default connect(mapStateToProps, {
  getprojectList,
  addFriend,
  getCommonSearchList,
})(SearchAsync);
