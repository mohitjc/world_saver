import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loading = () => {
  return (
    <>
      <div className="d-flex align-items-center flex-column  justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <SyncLoader color={'#5383ff'} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          Please wait...
          {/* <span className="font-size-lg d-block text-dark">
            This live preview instance can be slower than a real production
            build!
          </span> */}
        </div>
      </div>
    </>
  );
};

export default Loading;
