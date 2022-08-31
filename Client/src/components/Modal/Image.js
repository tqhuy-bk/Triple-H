import React from "react";
import Lightbox from "react-image-lightbox";



export default function ImageModal({ open, handleClose, img }) {

    return (
        <>
            {open &&
                <Lightbox
                    mainSrc={img}
                    onCloseRequest={handleClose}
                />
            }
        </>

    )
}