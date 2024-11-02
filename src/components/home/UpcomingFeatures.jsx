import React from 'react';

const UpcomingFeatures = () => {
  const styles = {
    backgroundColor: 'rgb(20, 0, 80)',
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={styles}>
      <p>
        Planned features:
      </p>
      <ul style={{ listStyleImage: 'none', listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>React with Typescript</li>
        <li>Vite as alternative to react-scripts for building React applications</li>
      </ul>
    </div>
  );
};

export default UpcomingFeatures;
