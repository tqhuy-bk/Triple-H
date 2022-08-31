import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postAction from './redux/actions/postAction';
import * as commentAction from './redux/actions/commentAction';
import * as authAction from './redux/actions/authAction';
import * as userAction from './redux/actions/userAction';
import * as tourAction from './redux/actions/tourAction';
import * as notifyAction from './redux/actions/notifyAction';
import * as messageAction from './redux/actions/messageAction';
import { addHelp, deleteHelp, updateHelp } from './redux/actions/helpAction';
import { getHelps } from './redux/callApi/helpCall';
import getIp from './utils/getIp';

const SocketClient = () => {
  const { auth, socket } = useSelector(state => state);
  const dispatch = useDispatch();
  const watchLocation = useRef();
  const [joined, setJoined] = useState(false);

  const [hasAccessLocation, setHasAccessLocation] = useState(false);

  const locationResolve = useCallback(
    position => {
      setHasAccessLocation(true);
      socket.emit('joinUser', {
        id: auth.user._id,
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    },
    [socket, auth.user._id]
  );

  const locationReject = useCallback(() => {
    getIp()
      .then(res => {
        setHasAccessLocation(!!res);
        socket.emit('joinUser', {
          id: auth.user._id,
          ipv4: res
        });
      })
      .catch(err => {
        setHasAccessLocation(false);
        socket.emit('joinUser', { id: auth.user._id });
      });
  }, [socket, auth.user._id]);

  const positionChange = useCallback(
    position => {
      socket.emit('positionChange', {
        id: auth.user._id,
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    },
    [socket, auth.user._id]
  );

  const initUser = useCallback(() => {
    if (!navigator.geolocation || joined) return;
    navigator.geolocation.getCurrentPosition(locationResolve, locationReject);
    setJoined(true);
  }, [locationResolve, locationReject, joined]);

  useEffect(() => {
    if (socket && auth.user?._id) {
      initUser();

      if (hasAccessLocation) {
        watchLocation.current = navigator.geolocation.watchPosition(
          positionChange,
          locationReject
        );
      }

      return () => {
        navigator.geolocation.clearWatch(watchLocation.current);
      };
    }
  }, [
    initUser,
    socket,
    auth.user?._id,
    hasAccessLocation,
    watchLocation,
    locationReject,
    positionChange
  ]);

  useEffect(() => {
    if (auth.user?._id) {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(
            getHelps(
              auth.user._id,
              position.coords.latitude,
              position.coords.longitude,
              null
            )
          );
        },
        () => {
          getIp().then(res => dispatch(getHelps(auth.user._id, 0, 0, res)));
        }
      );
    }
  }, [dispatch, auth.user?._id]);

  //like
  useEffect(() => {
    socket.on('likeToClient', data => {
      switch (data.type) {
        case 'post':
          dispatch(postAction.updateLike({ id: data.id, likes: data.likes }));
          break;
        case 'tour':
          dispatch(tourAction.updateLike({ id: data.id, likes: data.likes }));
          break;
        case 'commentPost':
          dispatch(
            commentAction.updateCommentPost({
              comment: data.comment,
              id: data.id,
              postId: data.postId
            })
          );
          break;
        case 'commentTour':
          dispatch(
            commentAction.updateCommentTour({
              comment: data.comment,
              id: data.id,
              tourId: data.tourId
            })
          );
          break;
        default:
          break;
      }
    });

    return () => socket.off('likeToClient');
  }, [socket, dispatch]);

  //unlike
  useEffect(() => {
    socket.on('unlikeToClient', data => {
      switch (data.type) {
        case 'post':
          dispatch(postAction.updateLike({ id: data.id, likes: data.likes }));
          break;
        case 'tour':
          dispatch(tourAction.updateLike({ id: data.id, likes: data.likes }));
          break;
        case 'commentPost':
          dispatch(
            commentAction.updateCommentPost({
              comment: data.comment,
              id: data.id,
              postId: data.postId
            })
          );
          break;
        case 'commentTour':
          dispatch(
            commentAction.updateCommentTour({
              comment: data.comment,
              id: data.id,
              tourId: data.tourId
            })
          );
          break;
        default:
          break;
      }
    });
    return () => socket.off('unlikeToClient');
  }, [socket, dispatch]);

  //create Comment
  useEffect(() => {
    socket.on('createCommentToClient', data => {
      switch (data.type) {
        case 'post':
          dispatch(
            commentAction.addCommentPost({ id: data.id, comment: data.comment })
          );
          break;
        case 'tour':
          dispatch(
            commentAction.addCommentTour({ id: data.id, comment: data.comment })
          );
          break;
        case 'volunteer':
          dispatch(
            commentAction.addCommentVolunteer({
              id: data.id,
              comment: data.comment
            })
          );
          break;
        default:
          break;
      }
    });
    return () => socket.off('createCommentToClient');
  }, [socket, dispatch]);

  // delete Comment
  useEffect(() => {
    socket.on('deleteCommentToClient', data => {
      switch (data.type) {
        case 'post':
          dispatch(
            commentAction.deleteCommentPost({
              id: data.id,
              postId: data.postId
            })
          );
          break;
        case 'tour':
          dispatch(
            commentAction.deleteCommentTour({
              id: data.id,
              tourId: data.tourId
            })
          );
          break;
        case 'volunteer':
          dispatch(
            commentAction.deleteCommentVolunteer({
              id: data.id,
              volunteerId: data.volunteerId
            })
          );
          break;
        default:
          break;
      }
    });
    return () => {
      socket.off('removeCommentToClient');
    };
  }, [socket, dispatch]);

  //follow
  useEffect(() => {
    socket.on('followToClient', data => {
      dispatch(userAction.updateFollower({ followers: data.followers }));
      dispatch(authAction.updateFollowing({ followings: data.followings }));
    });
    return () => socket.off('followToClient');
  }, [socket, dispatch]);

  //unfollow
  useEffect(() => {
    socket.on('unfollowToClient', data => {
      dispatch(userAction.updateFollower({ followers: data.followers }));
      dispatch(authAction.updateFollowing({ followings: data.followings }));
    });
    return () => socket.off('unfollowToClient');
  }, [socket, dispatch]);

  //create notify
  useEffect(() => {
    socket.on('createNotifyToClient', data => {
      dispatch(notifyAction.createNotify(data));
    });

    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch]);

  //delete notify
  useEffect(() => {
    socket.on('deleteNotifyToClient', data => {
      dispatch(notifyAction.deleteNotify(data));
    });
    return () => socket.off('deleteNotifyToClient');
  }, [socket, dispatch]);

  //add Message
  useEffect(() => {
    socket.on('addMessageToClient', data => {
      dispatch(messageAction.addMessage(data));

      const conversation = {
        isGroup: data.isGroup,
        _id: data.conversation,
        name: data.name,
        members: data.isGroup
          ? [data.sender].concat(
              data.members.filter(item => item._id !== auth.user._id)
            )
          : [data.sender],
        latestMessage: {
          text: data.text,
          seen: data.members.map(item => ({ member: item._id, isSeen: false })),
          createdAt: data.createdAt,
          sender: data.sender
        }
      };
      dispatch(messageAction.addUser(conversation));
    });
    return () => socket.off('addMessageToClient');
  }, [socket, dispatch, auth.user]);

  useEffect(() => {
    socket.on('addHelpToClient', data => {
      dispatch(addHelp(data));
    });
    return () => socket.off('addHelpToClient');
  });

  useEffect(() => {
    socket.on('updateHelpToClient', data => {
      dispatch(updateHelp(data));
    });
    return () => socket.off('updateHelpToClient');
  });

  useEffect(() => {
    socket.on('deleteHelpToClient', data => {
      dispatch(deleteHelp(data));
    });
    return () => socket.off('deleteHelpToClient');
  });

  return <></>;
};

export default SocketClient;
