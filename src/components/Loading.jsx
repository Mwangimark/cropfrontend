import React from 'react';

const Loading = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100px',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    }}>
      ⏳ Loading...
    </div>
  );
};

export default Loading;
