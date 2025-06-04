// src/components/Loading.jsx
import React from 'react';
import spinner from '../assets/loader.gif';

const Loading = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa'
      }}
    >
      <img src={spinner} alt="Loading..." width="100" />
    </div>
  );
};

export default Loading;
