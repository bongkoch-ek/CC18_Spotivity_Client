import React from 'react';

const LoadingPage = () => {
  const loadingContainerStyle = {
    position: 'fixed', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    zIndex: 9999, 
  };

  const loadingSpinnerStyle = {
    border: '16px solid #005657', 
    borderTop: '16px solid #b0cbcb', 
    borderRadius: '50%',
    width: '60px', 
    height: '60px', 
    animation: 'spin 2s linear infinite', 
  };

  return (
    <div style={loadingContainerStyle}>
      <div style={loadingSpinnerStyle}></div>
      <h2>Loading...</h2>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingPage;