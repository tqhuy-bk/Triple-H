import { IconButton } from '@material-ui/core';
import { AddAPhoto, HighlightOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeImage } from '../../redux/actions/createTourAction';
import { inputStyles } from '../../style';
import { checkImage } from '../../utils/uploadImage';

export default function ChangeImageTour() {

    const { image } = useSelector(state => state.createTour);
    const classes = inputStyles();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const addImage = (e) => {
        setError("")
        const file = e.target.files[0];
        const check = checkImage(file)
        if (check === "") {
            dispatch(changeImage({ image: file }))
        }
        else setError(check);
    }

    const removeImage = () => {
        // setError("");
        // onChange(state => ([
        //     ...state.slice(0, idx),
        //     ...state.slice(idx + 1)
        // ]))
        // console.log(images);
        dispatch(changeImage({ image: null }))
    }

    useEffect(() => {
        const holder = document.getElementById("add-area");
        if (holder) {
            holder.ondragover = function () {
                this.className = classes.addAreaHoverTour;
                return false;
            }

            holder.ondragend = function (e) {
                this.className = classes.addAreaTour;
            }

            holder.ondrop = function (e) {
                this.className = classes.addAreaTour;
                e.preventDefault();
                setError("");
                const file = e.dataTransfer.files[0];
                const check = checkImage(file);
                if (check === "") {
                    dispatch(changeImage({ image: file }))
                }
                else setError(check)
            }
        }

    }, [classes, dispatch])


    return (
        <div>
            {image ?
                <div className={classes.imageItem}>
                    <img
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt="Can not loading img"
                        width="100%"
                        height="100%"
                    />
                    <IconButton onClick={removeImage} className={classes.removeButton} size="small"><HighlightOff /></IconButton>
                </div> :
                <div className={classes.addAreaTour} id="add-area">
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="input-image"
                        name="images"
                        type="file"
                        onChange={addImage}
                    />
                    <label htmlFor='input-image'>
                        <IconButton variant="raised" component="span">
                            <AddAPhoto style={{ color: 'inherit' }} />
                        </IconButton>

                    </label>
                </div>
            }
            <span style={{color:"red"}}>{error}</span>
        </div>
    )
}
