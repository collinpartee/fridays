import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';


const Container = styled(Paper)({
  height: '65%',
  backgroundColor: 'rgba(0,0,0,0)',
  width: '225px',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
});

const Link = styled('a')({
  textDecoration: 'none',
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
  color: string;
  backgroundColor: string;
};

export const Post = ({ color, backgroundColor, data, openModal }: PostProps) => (
  <div style={{ height: '85%', marginTop: '1%', margin: '0 8px' }}>
    <Title>{data.title}</Title>
    <Container elevation={2} onClick={() => openModal(true, data)} style={{ backgroundImage: `url(${data.thumbnail})` }}>

    </Container>
    <div>
      <Button size="small">
        <Link style={{color: color}} target="_blank" href={data.url}> Permalink </Link>
      </Button>
      <Button size="small">
      <Link style={{color: color}} target="_blank" href={data.permalink}> Reddit </Link>
      </Button>
    </div>
  </div>);