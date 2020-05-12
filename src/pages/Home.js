import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';

import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import Stats from '../components/home/Stats';
import StatsGarph from '../components/global/StatsGraph';
import SectionHeader from '../components/global/SectionHeader';

import { totalCount, userCount } from '../store/actions/totalCountActions';
import { blogs } from '../store/actions/blogsActions';
import { skills } from '../store/actions/skillsActions';
import { users } from '../store/actions/userActions';

const Home = ({
  totalCount,
  userCount,
  blogs,
  skills,
  users,
  data,
  blogData,
  userData,
  projectsData
}) => {
  const token = localStorage.getItem('token');
  useEffect(() => {
    skills(token, 'I', 1, 10, 'createdAt', 'asc', '');
    totalCount(token);
    users(token, '', 1, 10, 'createdAt', '', 'asc', '');
    blogs(token, 'I', 1, 100, 'createdAt', 'asc', '');
  }, [blogs, token, totalCount, userCount, skills, users]);
  console.log('data blogData userData', data, blogData, userData);
  return (
    <Layout title="Dashboard">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Dashboard" />
          <Stats
            totalCount={(data && projectsData.total) || 0}
            userCount={
              userData && userData.data && !isNull(userData.data.total)
                ? userData.data.total
                : 0
            }
            blogCount={(blogData && blogData.data.total) || 0}
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
  blogData: state.blogs.data,
  isRequesting: state.totalCount.isRequesting,
  isSuccess: state.totalCount.isSuccess,
  isError: state.totalCount.isError,
  projectsData: state.skills.data,
  userData: state.users.data
});

export default connect(mapStateToProps, {
  totalCount,
  userCount,
  blogs,
  skills,
  users
})(Home);
