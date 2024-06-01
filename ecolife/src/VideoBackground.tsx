import React from 'react';
import './VideoBackground.css';

const VideoBackground: React.FC = () => {
  return (
    <div className="image-container">
       <div className="video-background">
         <video autoPlay muted loop className="background-video">
           <source src="/assets/background-video.mp4" type="video/mp4" />
           Your browser does not support the video tag.
         </video>
         <div className="transparent-text">EcoLife</div>
       </div>
    </div>
  );
};

export default VideoBackground;
