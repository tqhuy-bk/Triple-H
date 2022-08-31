
import * as commentAction from '../actions/commentAction';
import customAxios from '../../utils/fetchData';
import { createNotify, deleteNotify } from './notifyCall';
import * as alertAction from '../actions/alertAction';


export const createComment = (id, comment, auth, type, socket) => async (dispatch) => {
    try {
        const res = await customAxios(auth.token).post("/comment/create", {
            commentType: type,
            content: comment,
            postId: id,
            tourId: id,
            volunteerId: id,
            tourDateId: id
        })

        const newComment = {
            ...res.data.newComment,
            userId: auth.user,
        }

        if (type === "post") {
            dispatch(commentAction.addCommentPost({ id: id, comment: newComment }))
            socket.emit('createComment', { type: type, id: id, comment: newComment });

            //lấy thông tin  post
            const resPost = await customAxios(auth.token).get(`/post/${id}`)
            // Notify
            if(auth.user._id !== resPost.data.post.userId._id){
                const dataNotify = {
                    id: res.data.newComment._id,
                    text: ' đã bình luận vào bài viết của bạn',
                    recipients: [resPost.data.post.userId._id],
                    url: `/post/${id}`,
                    content: resPost.data.post.content || '',
                    image: resPost.data.post.images.length > 0 ? resPost.data.post.images[0] : ""
                }
                dispatch(createNotify(dataNotify, auth.token, socket))
            }
        }
        else if (type === "tour") {
            dispatch(commentAction.addCommentTour({ id: id, comment: newComment }))
            socket.emit('createComment', { type: type, id: id, comment: newComment });

            //lấy thông tin  post
            const resTour = await customAxios(auth.token).get(`/tour/${id}`)
            // Notify
            if(auth.user._id !== resTour.data.tour.userId._id){
                const dataNotify = {
                    id: res.data.newComment._id,
                    text: ' đã bình luận vào hành trình của bạn',
                    recipients: [resTour.data.tour.userId._id],
                    url: `/post/${id}`,
                    content: resTour.data.tour.content || '',
                    image: resTour.data.tour.image || ""
                }
                dispatch(createNotify(dataNotify, auth.token, socket))
            }
        }
        else if (type === "volunteer") {
            dispatch(commentAction.addCommentVolunteer({ id: id, comment: newComment }))
            socket.emit('createComment', { type: type, id: id, comment: newComment });

            //lấy thông tin  post
            const resVolunteer = await customAxios(auth.token).get(`/volunteer/${id}`)
            // Notify
            if(auth.user._id !== resVolunteer.data.volunteer.userId._id){
                const dataNotify = {
                    id: res.data.newComment._id,
                    text: ' đã bình luận vào hoạt động của bạn',
                    recipients: [resVolunteer.data.volunteer.userId._id],
                    url: `/volunteer/${id}`,
                    content: resVolunteer.data.volunteer.name || '',
                    image: ""
                }
                dispatch(createNotify(dataNotify, auth.token, socket))
            }
        }
    }
    catch (err) {
        console.log(err);
        // console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));

    }
}


export const updateComment = (id, postId, comment, auth, type) => async (dispatch) => {


    try {
        // call api to update comment
        const res = await customAxios(auth.token).patch(`/comment/${id}`, {
            content: comment
        })

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ postId: postId, comment: res.data.comment }))
        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentTour({ tourId: postId, comment: res.data.comment }))
        }
        else if (type === "volunteer") {
            dispatch(commentAction.updateCommentVolunteer({ volunteerId: postId, comment: res.data.comment }))
        }

        dispatch(alertAction.success({ message: "Cập nhật thành công!" }))
    }
    catch (err) {
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}




export const likeComment = (id, auth, type, postId, socket) => async (dispatch) => {

    try {
        // call api to update comment like
        const res = await customAxios(auth.token).patch(`/comment/${id}/like`);

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, postId: postId }))

            socket.emit('like', { type: 'commentPost', comment: res.data.newComment, id: id, postId: postId })
        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentTour({ comment: res.data.newComment, id: id, tourId: postId }))

            socket.emit('like', { type: 'commentTour', comment: res.data.newComment, id: id, tourId: postId })
        }
    }
    catch (err) {
        // console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));

    }
}


export const unlikeComment = (id, auth, type, postId, socket) => async (dispatch) => {

    try {
        const res = await customAxios(auth.token).patch(`/comment/${id}/unlike`);

        if (type === "post") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, postId: postId }))

            socket.emit('unlike', { type: 'commentPost', comment: res.data.newComment, id: id, postId: postId })

        }
        else if (type === "tour") {
            dispatch(commentAction.updateCommentPost({ comment: res.data.newComment, id: id, tourId: postId }))

            socket.emit('unlike', { type: 'commentTour', comment: res.data.newComment, id: id, tourId: postId })
        }
    }
    catch (err) {
        // console.log(err.response.data.message);
        if (err.response && err.response.data && err.response.data.message)
            dispatch(alertAction.error({ message: err.response.data.message }))
        else
            dispatch(alertAction.error({ message: "Có lỗi xảy ra" }));
    }
}

export const deleteComment = (id, auth, type, postId, socket, next) => async (dispatch) => {
    try {
        await customAxios(auth.token).delete(`/comment/${id}?postId=${postId}`);
        if (type === "post") {
            dispatch(commentAction.deleteCommentPost({ id: id, postId: postId }))
            socket.emit('deleteComment', { type: type, id: id, postId: postId });
            const dataNotify = {
                id: id,
                url: `/post/${postId}`,
            }
            dispatch(deleteNotify(dataNotify, auth.token, socket));
        }
        else if (type === "tour") {
            dispatch(commentAction.deleteCommentTour({ id: id, tourId: postId }));
            socket.emit('deleteComment', { type: type, id: id, tourId: postId });
            const dataNotify = {
                id: id,
                url: `/post/${postId}`,
            }
            dispatch(deleteNotify(dataNotify, auth.token, socket));
        }
        else if (type === "volunteer") {
            dispatch(commentAction.deleteCommentVolunteer({ id: id, volunteerId: postId }));
            socket.emit('deleteComment', { type: type, id: id, volunteerId: postId });
            const dataNotify = {
                id: id,
                url: `/post/${postId}`,
            }
            dispatch(deleteNotify(dataNotify, auth.token, socket));
        }
        next();
        dispatch(alertAction.success({ message: "Xóa bình luận thành công!" }))
    }
    catch (err) {
        dispatch(alertAction.error({ message: "Có lỗi xảy ra!" }))
    }
}

export const loadComment = (id, type, next, error, page) => async (dispatch) => {
    try {
        const res = await customAxios().get(`/comment/${type}/${id}?offset=${page}`);
        if (type === "post")
            dispatch(commentAction.loadCommentPost({ comments: res.data.comments, id: id }));
        else if (type === "tour")
            dispatch(commentAction.loadCommentTour({ comments: res.data.comments, id: id }));
        else if (type === "volunteer")
            dispatch(commentAction.loadCommentVolunteer({ comments: res.data.comments, id: id }));
        next()
    }
    catch (err) {
        error();
    }
}
