import React, { useState, useEffect } from 'react';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import load from '../loaderMethod';

const AboutPage = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    load(true);
    ApiClient.get(apiUrl + '/page', {
      slug: 'about-us',
      status: 'active',
    }).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      load(false);
    });
  };

  return (
    <>
      <div className="py-3 container">
        <h2 className="text-center text-capitalize">{data && data.title}</h2>

        <div
          dangerouslySetInnerHTML={{ __html: data && data.description }}
        ></div>
        <p>
          Get in touch with us at{' '}
          <a href="mailto:nemo@crowdsavetheworld.com">
            nemo@crowdsavetheworld.com
          </a>{' '}
          for support
        </p>
      </div>
    </>
  );
};

export default AboutPage;
