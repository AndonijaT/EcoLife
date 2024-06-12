// src/VideoBackground.tsx
import React from 'react';
import './../styles/VideoBackground.css';

interface VideoBackgroundProps {
  videoSrc: string;
  overlayText: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc, overlayText }) => {
  return (
    <div className="image-container">
      <div className="video-background">
        <video autoPlay muted loop className="background-video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="transparent-text">{overlayText}</div>
      </div>
    </div>
  );
};

export default VideoBackground;
