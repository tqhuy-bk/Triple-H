import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

export default function ImageLightBox({ src, alt, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img src={src} alt={alt} {...props} onClick={() => setOpen(true)} />
      {open && <Lightbox mainSrc={src} onCloseRequest={() => setOpen(false)} />}
    </>
  );
}
