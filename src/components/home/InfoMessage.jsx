import React from 'react';

const InfoMessage = () => {
  const styles = {
    backgroundColor: 'rgb(20, 0, 80)',
    color: 'white',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const redStyles = {
    backgroundColor: 'rgb(20, 0, 80)',
    color: 'red',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={styles}>
      <p>
        Thank you for purchasing <em>The Aspiring Full Stack Developer&apos;s Playbook: From AI to Microservices and Kubernetes</em>. I hope you find the book and the accompanying code both enjoyable and practically useful.
        <p style={redStyles}>Don&apos;t forget to leave a review on Amazon!</p>
        If you have any questions or feedback, feel free to email me&mdash;my contact information is in the book.
      </p>
      <p>Please check:</p>
      <ul style={{ listStyleImage: 'none', listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>Authorization with JSON WebToken</li>
        <li>File upload with drag & drop</li>
        <li>Handling of HTTPContext.Session</li>
        <li>State Management with React Context API</li>
        <li>Storage of passwords and secret keys in ServerAPI</li>
        <li>Unobtrusive validation</li>
        <li>SQLite database in ServerAPi</li>
      </ul>
    </div>
  );
};

export default InfoMessage;
