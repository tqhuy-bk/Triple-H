import * as env from '../key/env';

export const checkImage = (file) => {
    if (!file)
        return "Tệp không tồn tại!";
    if (file.size > 2 * 1024 * 1024) // 2mb
        return "Kích thước ảnh lớn nhất là 2Mb!";
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(file.type))
        return "Định dạng không phù hợp (hỗ trợ jpeg, png và jpg)!"
    return "";
}

export const uploadImages = async (images) => {
    var cloud = Math.floor(Math.random() * 2)
    var imageArr = [];
    for (const image of images) {
        if (typeof image === 'string') {
            imageArr.push(image);
        }
        else {
            // console.log(image);
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", env.CLOUD[cloud].CLOUDINARY_UPLOAD_PRESET);

            try {
                const data = await fetch(env.CLOUD[cloud].CLOUDINARY_UPLOAD_URL, {
                    method: "POST",
                    body: formData
                })
                const res = await data.json();
                imageArr.push(res.secure_url);
            }
            catch (err) {
                console.log(err);
            }
        }

    }
    return imageArr;
}