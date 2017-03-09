import React from 'react';

function PopupBackground({ images, mousePosition }) {

  const renderImages = images.map((image, i) => {

    /* Move the images according to mouse position */
    let x = mousePosition.coordinateX * 3;
    let y = mousePosition.coordinateY * 3;

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
