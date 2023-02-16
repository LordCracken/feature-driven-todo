import { FC } from 'react';
import { Typography } from '@mui/material';

interface ILoadingInfo {
  info: string;
}

const LoadingInfo: FC<ILoadingInfo> = ({ info }) => (
  <Typography variant="h5" mt={5} sx={{ textAlign: 'center' }} color="grey">
    {info}
  </Typography>
);

export default LoadingInfo;
