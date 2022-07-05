import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import swal from 'sweetalert';
import Layout from '../components/global/Layout';
import MainSidebar from '../components/global/MainSidebar';
import SectionHeader from '../components/global/SectionHeader';
import ContentForm from '../components/contents/ContentForm';
import ContentListing from '../components/contents/ContentListing';
import ApiClient from '../components/apiClient';
import { API_SLUG } from '../store/constants';
const Contents = () => {
  const token = localStorage.getItem('token');
  const [sort, setSort] = useState(false);
  const [sortType, setSortType] = useState('createdAt');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const count=5;



  useEffect(() => {
    // if (isDeleteSuccess) {
    //   swal('Blog has been deleted!', {
    //     buttons: false,
    //     timer: 1500
    //   });
    //   resetDeleteBlog();
    // }

    getData()

  },[]);


  const getData=()=>{
    ApiClient.get('/pages',{}).then(res=>{
        if(res.data.success){
            setData(res.data.data)
            setTotal(res.data.total)
        }
    })
  }


  const [formVisibility, setFormVisibilty] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [blogId, setBlogId] = useState(null);

  const handleFormVisibilty = () => {
    setFormVisibilty(!formVisibility);
  };

  const handAddFormToggle = bool => {
    setIsAddForm(bool);
  };

  const getBlogId = id => {
    setBlogId(id);
  };

  const getSearchKeyword = value => {
    setSearchKeyword(value);
  };

  const getStatus = value => {
    setStatus(value);
  };

  const toggleSort = value => {
    setSort(!sort);
    setSortType(value);
  };



  // console.log('isDeleteError', isDeleteError);
  return (
    <Layout title="Contents">
      <MainSidebar />
      <div className="main-content">
        <section className="section">
          <SectionHeader title="Contents" />
          {!formVisibility ? (
            <ContentListing
            getSearchKeyword={getSearchKeyword}
            handleFormVisibilty={handleFormVisibilty}
            handAddFormToggle={handAddFormToggle}
            data={data && data}
            total={total && total}
            page={page}
            count={count}
            setPage={setPage}
            getBlogId={getBlogId}
            />
          ) : (
            <ContentForm
            handleFormVisibilty={handleFormVisibilty}
            blogId={blogId}
            />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Contents
