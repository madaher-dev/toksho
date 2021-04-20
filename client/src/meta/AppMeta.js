import React from 'react';
import Helmet from 'react-helmet';

const HelmetMeta = () => {
  return (
    <Helmet>
      <meta name="description" content="An online debate platform" />

      <meta itemprop="name" content="TokSho" />
      <meta itemprop="description" content="An online debate platform" />
      <meta
        itemprop="image"
        content={`${process.env.REACT_APP_WEBSITE_NAME}/favicon.ico`}
      />

      <meta
        property="og:url"
        content="http://toksho.herokuapp.com/debates/607b15a807ccb500159e016e"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="TokSho" />
      <meta property="og:description" content="An online debate platform" />
      <meta
        property="og:image"
        content={`${process.env.REACT_APP_WEBSITE_NAME}/favicon.ico`}
      />

      <meta
        name="twitter:card"
        content={`${process.env.REACT_APP_WEBSITE_NAME}/favicon.ico`}
      />
      <meta name="twitter:title" content="TokSho" />
      <meta name="twitter:description" content="An online debate platform" />
      <meta
        name="twitter:image"
        content={`${process.env.REACT_APP_WEBSITE_NAME}/favicon.ico`}
      />
      <link
        rel="apple-touch-icon"
        href={`${process.env.REACT_APP_WEBSITE_NAME}/logo192.png`}
      />
    </Helmet>
  );
};

export default HelmetMeta;
