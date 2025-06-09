import React, { useState, useEffect, useRef } from 'react';

const LoadingCard = () => {
    return <>
        <div className="activityItem shadow">
            <div className="activity--item clearfix">
                <div className="activity--avatar">
                    <span className="avtar-md shine" />
                </div>

                <div className="activity--info">
                    <p className="shine"></p>
                    <p className="shine"></p>

                    <div className="shine shineImg"></div>
                </div>
            </div>
        </div>
    </>
}

export default LoadingCard