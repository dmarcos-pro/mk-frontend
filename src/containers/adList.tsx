import React from 'react';
import { Box, AvatarGroup, Avatar, Chip, Switch, Divider, Grid } from '@mui/material';
import axios from 'axios';

import { Ad } from '../interface/ad.interface';

type AdsProps = {
  list: Ad[];
  updateAdList: (value: Ad[]) => void;
  showDetailAd: (ad: Ad) => void;
}

const AdList = (props: AdsProps) => {  
	const handleSwitchChange = (ad: Ad) => {
		const updatedAd = { ...ad, enabled: !ad.enabled };
		axios
			.put(`http://localhost:3001/creatives/${updatedAd.id}`, updatedAd)
			.then(function() {
				const updatedAdsList = props.list.map(ad => {
					if (ad.id === updatedAd.id) {
						return updatedAd;
					}
					return ad;
				});
				props.updateAdList(updatedAdsList);
			})
			.catch(function(error) {
				console.error('Erreur lors de la mise à jour :', error);
			});
	};
  return (
    <Box boxShadow={5} sx={{ borderRadius: 2}}>
      {props.list.map( (ad, index) => (
        <Box key={ad.id}>
          <Grid container spacing={1} padding={{ xs: 1, md: 2 }}>
            <Grid item md={11} xs={11}>
              <Grid container padding={{ xs: 0, md: 0 }}>
                <Grid item md={4} xs={12} style={{ cursor: 'pointer' }}
                      onClick={() => { props.showDetailAd(ad); }}
                >
                  {ad.title}
                </Grid>
                <Grid item md={3} xs={6}>
                  <Grid container>
                    <AvatarGroup spacing={15}>
                      {ad.contributors.map(contributor => (
                        <Avatar key={contributor.id} alt={`${contributor.firstName} ${contributor.lastName}`}>
                          {contributor.firstName.charAt(0)}{contributor.lastName.charAt(0)}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Grid>
                </Grid>
                <Grid item md={5} xs={6}>
                  {ad.formats.map(format => (
                    <Chip key={`${ad.id}-format-${format.width}x${format.height}`}
                          label={`${format.width}x${format.height}`} sx={{ m:0.5 }} />
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={1} xs={1}>
              <Grid container justifyContent="flex-end">
                <Switch checked={ad.enabled} onChange={() => handleSwitchChange(ad)} />
              </Grid>
            </Grid>
          </Grid>
          {index !== props.list.length - 1 &&
            <Divider key={`divider-${ad.id}`} variant="middle" />
          }
        </Box>
      ))}
		</Box>
  );
};

export default AdList;