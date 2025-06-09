import React, { useState, useEffect, useRef } from 'react';
import ApiClient from '../../api-client';
import { Form, Button } from 'antd';
// import 'antd/dist/antd.css';

import { apiUrl } from '../../environment';
import './style.scss';
import '../../containers/profileUpdate.scss';
// import { history } from '../../main/history';
import { useNavigate } from 'react-router-dom';

const MemberEdit = ({
  getData,
  aboutme,
  user,
  setAboutme,
  setEditMember,
  setIsModalVisible,
}) => {
  const id = user.id;
  const history = useNavigate();
  const handleinput = (e) => {
    setAboutme(e.target.value);
  };

  const CancelAbout = () => {
    setEditMember(false);
    history(`/${user.username}`);
  };

  const onFinish = (values) => {
    const payload = {
      aboutme: aboutme,
    };

    if (!aboutme) return;

    setIsModalVisible(true);
    console.log(values, 'valuesvalues====');

    const token = localStorage.getItem('headertoken');
    const getUrl = `${apiUrl}/updateprofile`;
    ApiClient.put(getUrl, payload, `Bearer ${token}`).then((result) => {
      if (result.success) {
        getData();
        CancelAbout();
      } else {
      }
    });
  };

  return (
    <div className="col-md-6 main--content">
      <div className="card p-3">
        <div className="form-row">
          <div className="col-md-12">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <input
                type="text"
                className="form-control mb-3"
                onChange={(e) => handleinput(e)}
                value={aboutme}
                placeholder="About Me"
              />

              {aboutme ? (
                <></>
              ) : (
                <div className="text-danger mb-3">About me is required</div>
              )}

              <div className="col-md-12 px-0 text-right">
                <Button
                  type="primary"
                  className="login-form-button mr-2"
                  onClick={CancelAbout}
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberEdit;
