import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Create, Explore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Fade, Modal, Backdrop } from '@material-ui/core';
import { useSelector } from 'react-redux';

import CreatePostForm from './Forms/CreatePost';
import CreateTourForm from './Forms/CreateTour';
import { speedDialStyles } from '../style';
import ChatIcon from './Icons/Chat';

const actions = [
  { icon: <CreatePostIcon />, name: 'Tạo bài viết' },
  { icon: <CreateTourIcon />, name: 'Tạo hành trình' },
  { icon: <MessageIcon />, name: 'Tin nhắn' }
];

function MessageIcon(props) {
  const history = useHistory();

  const toMessage = () => {
    history.push('/message');
  };

  return <ChatIcon onClick={toMessage} />;
}

function CreatePostIcon(props) {
  const [show, setShow] = useState(false);

  const classes = speedDialStyles();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const ref = React.createRef();

  const CreatePostRef = React.forwardRef((props, ref) => (
    <CreatePostForm {...props} innerRef={ref} />
  ));

  return (
    <>
      <Create onClick={handleShow} />
      <Modal
        aria-labelledby="create-post"
        aria-describedby="create-post-modal"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={show}>
          <CreatePostRef ref={ref} handleClose={handleClose} />
        </Fade>
      </Modal>
    </>
  );
}

function CreateTourIcon(props) {
  const [show, setShow] = useState(false);

  const { createTour, auth } = useSelector(state => state);
  const history = useHistory();

  const classes = speedDialStyles();

  const handleShow = () => {
    if (auth.token && createTour.tour.length > 0) {
      history.push('/createtour');
    } else {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const ref = React.createRef();

  const CreateTourRef = React.forwardRef((props, ref) => (
    <CreateTourForm {...props} innerRef={ref} />
  ));

  return (
    <>
      <Explore onClick={handleShow} />
      <Modal
        aria-labelledby="create-tour"
        aria-describedby="create-tour-modal"
        className={classes.modal}
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={show}>
          <CreateTourRef ref={ref} handleClose={handleClose} />
        </Fade>
      </Modal>
    </>
  );
}

export default function SpeedDialButton(props) {
  const classes = speedDialStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.speedDialWrapper}>
      <SpeedDial
        ariaLabel="SpeedDial Button"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
