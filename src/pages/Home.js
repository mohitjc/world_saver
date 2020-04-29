import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import Stats from '../components/home/Stats';
import StatsGarph from '../components/global/StatsGraph';
import SectionHeader from '../components/global/SectionHeader';

import { totalCount, userCount } from '../store/actions/totalCountActions';
import { blogs } from '../store/actions/blogsActions';

const Home = ({ totalCount, userCount, blogs, data, blogData, userData }) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    totalCount(token);
    userCount(token);
    blogs(token, 'I', 1, 100, 'createdAt', 'asc', '');
  }, [totalCount, userCount]);
  // console.log('data', data, userData, blogData);
  return (
    <Layout title="Dashboard">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Dashboard" />
          <Stats
            totalCount={data && data.total}
            userCount={userData && userData.total}
            blogCount={blogData && blogData.data.total}
          />
          <div className="row">
            <StatsGarph />
          </div>
        </section>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  data: state.totalCount.data,
  userData: state.userCount.data,
  blogData: state.blogs.data,
  isRequesting: state.totalCount.isRequesting,
  isSuccess: state.totalCount.isSuccess,
  isError: state.totalCount.isError
});

export default connect(
  mapStateToProps,
  {
    totalCount,
    userCount,
    blogs
  }
)(Home);
