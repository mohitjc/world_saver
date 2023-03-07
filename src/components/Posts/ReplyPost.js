import React, { useState, useEffect } from 'react';
import Users from '../../pages/Users';
import Layout from "../global/Layout"
import MainSidebar from '../global/MainSidebar';
import SectionHeader from '../global/SectionHeader';
import UserForm from '../user/UserForm';
import Posts from './Posts';

const ReplyPost =()=>{
    
    return<>
        <Layout title="Posts">
            <MainSidebar/>
            <div className="main-content">
                <section className="section">
                    <SectionHeader/>
                    <div className='container'>
                        <h1>POST:</h1>

                    </div>
                </section>
            </div>
        </Layout>
    </>
}
export default ReplyPost