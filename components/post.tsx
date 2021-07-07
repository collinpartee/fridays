import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { SubData } from '../models/SubData';


const Container = styled(Paper)({
  height: '65%',
  backgroundColor: 'rgba(0,0,0,0)',
  width: '225px',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
});
const Title = styled('p')({
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  overflow: 'hidden',
  display: '-webkit-box',
  lineClamp: 1,
  boxOrient: 'vertical',
  margin: 0,
  height: '2rem',
  padding: '8px',
  borderTopLeftRadius: '3px',
  borderTopRightRadius: '3px'
});

type PostProps = {
  data: SubData;
  openModal: Function;
};


export const Post = ({ data, openModal }: PostProps) => (
  <div style={{ height: '85%', marginTop: '1%', margin: '0 8px'}}>
    <Title>{data.title}</Title>
    <Container elevation={2} onClick={() => openModal(true, data)} style={{backgroundImage: `url(${data.thumbnail})`}}>
      
    </Container>
    <div>
         <Button size="small">Permalink</Button>
         <Button size="small">Reddit</Button>
      </div>
      </div>);