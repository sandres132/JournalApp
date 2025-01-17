import React from 'react'

import { ImageList, ImageListItem } from '@mui/material';

export const ImageGalery = ({images}) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            className='m-4'
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}