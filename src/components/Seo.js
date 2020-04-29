import React from 'react';
// import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import config from '../utils/config';

const getSchemaOrgJSONLD = ({ url, title }) => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url,
    name: title,
    alternateName: config.siteName
  }
];

const Seo = ({ title, description, url, image }) => {
  const pageTitle = `${title} - ${config.siteName}`;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    pageTitle,
    image,
    description
  });

  return <div></div>;
};

Seo.defaultProps = {
  url: config.siteUrl,
  image: `${config.siteUrl}/${config.logo}`
};

export default Seo;
