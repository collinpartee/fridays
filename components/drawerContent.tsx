import React, { useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import { Subreddits } from '../models/SubData';
import { Post } from './post';
import CustomModal from './modal';
import AdminPanel from './adminPanel';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';

const Container = styled('div')({
  overflow: 'scroll',
  margin: '0 auto',
  display:"flex",
   alignItems: 'center'
});

const LeftScrollButton = styled('div')({
  position: 'absolute',
  width: '4%',
  left: 0,
  height: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem'
});

const RightScrollButton = styled('div')({
  position: 'absolute',
  width: '4%',
  right: 0,
  height: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem'
});

type DrawerContentProps = {
  data: Subreddits;
  visible: boolean;
  color: string;
  backgroundColor: string;
};

export default function DrawerContent({ color, backgroundColor, data, visible }: DrawerContentProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const scrollArea = useRef(null);
  
  const handleOpen = (e: boolean, data: SubData) => {
    // console.log(e, data)
    setOpen(true);
    setSelectedPost(data);
  };

  const handleClose = (e: boolean) => {
    setOpen(e);
  };

  const sideScroll = (element, direction: string, speed: number = 50, distance: number = 1200, step: number = 150) => {
    var scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, 50);
  }
  if(data)
    console.log(data.subList)

  var colors={text: color, backgroundColor: backgroundColor}
  return (
    <Container style={{ height: visible ? '0' : '12em' }} ref={scrollArea}>
      {!data && <AdminPanel/>}

      {data && <LeftScrollButton onClick={() => sideScroll(scrollArea.current, 'left')}><NavigateBefore fontSize='large' style={{color: 'black'}} /> </LeftScrollButton>}

      { data && data.subList.map((sub, i) => <Post color={color} backgroundColor={backgroundColor} openModal={handleOpen} key={i} data={sub} />)}

      {data && <RightScrollButton onClick={() => sideScroll(scrollArea.current, 'right')}> <NavigateNext fontSize='large' style={{color: 'black'}} /> </RightScrollButton>}

      { selectedPost && <CustomModal data={selectedPost} visible={open} toggleOpen={handleClose} /> }
    </Container>
  );
}