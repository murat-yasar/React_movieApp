import React from 'react'

const TrailerSection = ({videoKey}) => {
  const providerUrl = 'https://www.youtube.com/embed/';

  return (
    <div className='ratio ratio-16x9' >
      <iframe 
        src={`${providerUrl}${videoKey}?autoplay=1&mute=1`} 
        title={`YouTube Video`} 
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default TrailerSection