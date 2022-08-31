import { IconButton } from '@material-ui/core';
import { AddAPhoto, HighlightOff } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { inputStyles } from '../../style';
import { checkImage } from '../../utils/uploadImage'

export default function AddImageHorizontal(props) {

    const { images, onChange, maxImage } = props;
    const classes = inputStyles();
    const [error, setError] = useState('');

    const addImage = (e) => {
        setError("")
        if (maxImage && images.length >= maxImage) {
            setError(`Không được phép quá ${maxImage} ảnh`);
            return;
        }
        const file = e.target.files[0];
        const check = checkImage(file)
        if (check === "")
            onChange(state => ([...state, file]))
        else setError(check);
    }

    const removeImage = (idx) => {
        setError("");
        onChange(state => ([
            ...state.slice(0, idx),
            ...state.slice(idx + 1)
        ]))
        // console.log(images);
    }

    useEffect(() => {
        const holder = document.getElementById("add-area")
        holder.ondragover = function () {
            this.className = classes.addAreaHover;
            return false;
        }

        holder.ondragend = function (e) {
            this.className = classes.addArea;
        }

        holder.ondrop = function (e) {
            this.className = classes.addArea;
            e.preventDefault();
            setError("");
            const file = e.dataTransfer.files[0];
            const check = checkImage(file);
            if (check === "")
                onChange(state => ([...state, file]))
            else setError(check)
        }
    }, [classes, onChange])



    return (
        <>
            <div className={classes.addImageContainer}>
                {images.map((item, index) => (
                    <div key={index} className={classes.imageItem}>
                        <img
                            src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                            alt="Can not loading img"
                            className={classes.item}
                            width={250}
                            height={200}
                        />
                        <IconButton title="Xoá" onClick={() => removeImage(index)} className={classes.removeButton} size="small"><HighlightOff /></IconButton>
                    </div>
                ))}
                <div className={classes.addArea} id="add-area">
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="input-image"
                        name="images"
                        multiple
                        type="file"
                        onChange={addImage}
                    />
                    <label htmlFor='input-image'>
                        <IconButton variant="raised" component="span" title="Thêm ảnh">
                            <AddAPhoto style={{ color: 'inherit' }} />
                        </IconButton>

                    </label>
                </div>
            </div>
            {error !== "" &&
                <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: "15px", color: "red", marginInline: "20px", marginTop: "10px" }}>{error}</span>
                </div>
            }

        </>
    );
}
