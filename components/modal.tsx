import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Slide, Backdrop, Fade, Paper, Modal, Typography } from '@material-ui/core';

type ModalProps = {
  data: SubData;
  visible: boolean;
  toggleOpen: Function;
};

export default function CustomModal({ data, visible, toggleOpen }: ModalProps) {
  const handleClose = () => {
    toggleOpen(false)
  };
  return (
    //TODO: should probably use a dialog instead of modal
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      style={{outline: 0}}
      >
 <Slide direction='up' in={visible}>
      <div style={{ width: '50%', margin: '5% auto' }} >
        <Typography variant="h4" style={{color: 'white', backgroundColor: 'black', padding: '2% 4%'}}>
        { data.title}
        </Typography>
        <div style={{backgroundImage: `url(${data.url})`, backgroundSize: 'contain', width: '100%', height: '75vh', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: 'rgba(0,0,0,0.8)'}}></div>
      </div>
      </Slide>
    </Modal>
  );
}