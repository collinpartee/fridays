import { Skeleton } from '@material-ui/lab';
import React from 'react';

type DashboardTextProps = {
    text: string;
    loading?: boolean;
    link?: string;
    linkUrl?: string;
  };
  
  export const DashboardText = ({ text, loading = false }: DashboardTextProps) =>( 
  <div>
    { loading ? <Skeleton width={210} animation="wave" variant="rect" /> : text}
  </div>);
