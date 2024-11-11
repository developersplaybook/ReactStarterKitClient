import React, { useEffect } from 'react';
const ExternalRedirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return <div>Redirecting...</div>; // Optional loading state
};

export default ExternalRedirect;