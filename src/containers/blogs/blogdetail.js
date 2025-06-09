import React, { useState, useEffect, useRef } from 'react';
import RightWidgets from '../../components/global/Rightwidges';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogDetailCompoment from '../../components/blogs/BlogDetailComponent';
import { getblogDetail } from '../../actions/blogs';

const blogDetail = (props) => {
  
  return (
    <>
      <BlogDetailCompoment user={props.user} getblogDetail={props.getblogDetail} />
     
    </>
  );
};

// export default blogDetail;

const mapStateToProps = (state) => ({
  user: state?.user,
  data: state?.category
});

export default connect(mapStateToProps, {getblogDetail})(blogDetail);
