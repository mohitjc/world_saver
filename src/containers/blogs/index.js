import React from 'react';
import { connect } from 'react-redux';
import {
  getblogList,
  getblogListByCat,
  getblogSearch,
} from '../../actions/blogs';
import BlogList from '../../components/blogs/blogList';
import './style.scss';

function blogListing(props) {
  return (
    <>
      <div
        id="blog"
        className="page--header pt--60 pb--60 text-center"
        data-bg-img="/assets/img/banner.jpg"
        data-overlay="0.85"
      >
        <div className="container">
          <div className="title">
            <h2 className="h1 text-white"></h2>
          </div>
        </div>
      </div>

      <BlogList
        user={props.user}
        getblogSearch={props.getblogSearch}
        getblogList={props.getblogList}
        getblogListByCat={props.getblogListByCat}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state?.user,
  data: state?.category,
});

export default connect(mapStateToProps, {
  getblogList,
  getblogListByCat,
  getblogSearch,
})(blogListing);
