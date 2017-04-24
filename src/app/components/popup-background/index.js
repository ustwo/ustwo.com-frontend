import React from 'react';

function PopupBackground({ images, screenPosition, isMobile }) {

  const renderImages = images.map((image, i) => {

    let modifier = isMobile ? 30 : 3;

    let x = screenPosition.coordinateX * modifier;
    let y = screenPosition.coordinateY * modifier;

    const imageStyles = {
      transform: `translate3d(${x}px,${y}px,0)`
    }

    return (
      <div className="popup-image" style={imageStyles}>
        <img src={`/images/home/popups/${image}`} />
      </div>
    );
  });

  return (
    <div className="popup-background">
      {renderImages}
    </div>
  );
}

export default PopupBackground;
