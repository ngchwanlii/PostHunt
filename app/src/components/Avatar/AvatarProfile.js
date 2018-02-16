import React from 'react';

export const AvatarProfile = props => {
  const { height, width, src } = props;
  return (
    <div>
      <img alt="" width={width} height={height} src={src} />
    </div>
  );
};
