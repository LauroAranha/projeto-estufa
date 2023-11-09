import React from 'react';

import './_pageTitle.scss';

const PageTitle = ({ PageTitle, PageSubtitle }) => {
  return (
    <div className="page-title-container">
      <h1 className="page-title">{PageTitle}</h1>
      <p className="page-subtitle">{PageSubtitle}</p>
    </div>
  );
};

export default PageTitle;
