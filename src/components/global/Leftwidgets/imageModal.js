import React, { useState, useEffect, useRef } from 'react';

const ImageModal = ({ url, setClose, type }) => {
  return <div id="newid" className="modal d-block image_modal" tabindex="-1" role="dialog">
    <div className="modal-dialog modal-lg">
      <div className="modal-content ">
        <div className="modal-header">
          {/* <h5 className="modal-title">Modal title</h5> */}
          <button type="button" className="close" onClick={() => setClose('')}>
            <span className="closebtn" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {
            type == 'image' ? <img src={url} className="image_modal_image border w-100 " /> : <video
              controls
              // autoPlay
              playsInline
              muted
              src={url}
              style={{ width: '100%' }}
            />}

        </div>
      </div>
    </div>
  </div>
}

export default ImageModal