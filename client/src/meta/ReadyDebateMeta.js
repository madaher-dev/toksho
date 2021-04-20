import React from 'react';
import Helmet from 'react-helmet';

const ReadyDebateMeta = ({ debate, image }) => {
  return (
    <Helmet>
      <title>{debate.title} - Toksho </title>
      <meta name="description" content={debate.synopsis} />

      <meta itemprop="name" content={`${debate.title} - Toksho`} />
      <meta itemprop="description" content={debate.synopsis} />
      <meta
        itemprop="image"
        content={`${process.env.REACT_APP_WEBSITE_NAME}${image}`}
      />

      <meta
        property="og:url"
        content={`${process.env.REACT_APP_WEBSITE_NAME}${image}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${debate.title} - Toksho`} />
      <meta property="og:description" content={debate.synopsis} />
      <meta
        property="og:image"
        content={`${process.env.REACT_APP_WEBSITE_NAME}${image}`}
      />

      <meta
        name="twitter:card"
        content={`${process.env.REACT_APP_WEBSITE_NAME}${image}`}
      />
      <meta name="twitter:title" content={`${debate.title} - Toksho`} />
      <meta name="twitter:description" content={debate.synopsis} />
      <meta
        name="twitter:image"
        content={`${process.env.REACT_APP_WEBSITE_NAME}${image}`}
      />
    </Helmet>
  );
};

export default ReadyDebateMeta;
