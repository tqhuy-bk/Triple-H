import React from 'react';
import loadingGif from './loading.gif';

export default function Loading(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} {...props}>
      <img src={loadingGif} alt="loading..." width={100} />
    </div>
  );
}
