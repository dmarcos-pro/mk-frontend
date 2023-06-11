import React from 'react';
import { Box, AvatarGroup, Grid, Typography, Button} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { Ad } from '../interface/ad.interface';

type ActiveAdProps = {
  activeAd: Ad;
  updateActiveAd: (value: Ad) => void;
  handleModifyAd: (ad: Ad) => void;
}

const ActiveAd = (props: ActiveAdProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = getFrenchMonth(date.getMonth());
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };  
  const getFrenchMonth = (month: number): string => {
    const frenchMonths = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    return frenchMonths[month];
  };
  return (
    <Box paddingTop={4}>
      <Box boxShadow={5} key={props.activeAd.id} sx={{ borderRadius: 2}}>
        <Grid container spacing={1} padding={3}>
          <Grid item md={8}>
            <Typography variant="h6" component="p">
              {props.activeAd.title}
            </Typography>
            <Typography sx={{ pt: 3 }}>
              {props.activeAd.description}
            </Typography>
            <Typography sx={{ py: 3 }}>
              {props.activeAd.content}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography>
              Crée par {props.activeAd.createdBy.firstName} {props.activeAd.createdBy.lastName}
            </Typography>
            <Typography sx={{ pt: 2}}>
              Dernière modification le {formatDate(props.activeAd.lastModified)}
            </Typography>
            <Box boxShadow={5} sx={{ mt: 2, borderRadius: 1 }}>
              <AvatarGroup spacing={15} max={15}>
                <Grid item container md={12}>
                  {props.activeAd.contributors.map(contributor => (
                    <Grid item container key={contributor.id} md={12} alignItems="center" sx={{ p: 2}}>
                      <PersonIcon fontSize="large" color="disabled" sx={{ pr: 5}} />
                      <Typography component="span">
                        {contributor.firstName} {contributor.lastName}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </AvatarGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button
        variant="contained" sx={{ marginTop: '20px' }}
        onClick={() => { props.handleModifyAd(props.activeAd); }}
      >
        Éditer
      </Button>
    </Box>
  );
};

export default ActiveAd;