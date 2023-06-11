import React from 'react';
import { Box, Chip, Grid, Button, TextField, Container, FormControl  } from '@mui/material';

import { Ad } from '../interface/ad.interface';

type ModifyAdProps = {
  modifyAd: Ad;
  updateModifyAd: (value: Ad) => void;
  handleDelete: () => void;
  handleCancel: () => void;
  handleSave: () => void;
}

const ModifyAd = (props: ModifyAdProps) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateModifyAd({ ...props.modifyAd, title: event.target.value });
  };
  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateModifyAd({ ...props.modifyAd, description: event.target.value });
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.updateModifyAd({ ...props.modifyAd, content: event.target.value });
  };
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Box boxShadow={5} padding={3} sx={{ mt: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-required"
                label="Titre"
                defaultValue={props.modifyAd.title}
                onChange={handleTitleChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-required"
                label="Description"
                defaultValue={props.modifyAd.description}
                onChange={handleDescChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                id="outlined-required"
                label="Contenu"
                defaultValue={props.modifyAd.content}
                onChange={handleContentChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={12}>
            {props.modifyAd.formats.map(format => (
              <Chip key={`${props.modifyAd.id}-f-${format.width}x${format.height}`}
                    label={`${format.width}x${format.height}`} sx={{ m:0.5 }} color="primary" />
            ))}
          </Grid>
        </Grid>
      </Box>
      <Box padding={4}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <Button
              variant="contained" color="primary"
              onClick={props.handleSave}>
                Sauvegarder
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={props.handleCancel}>
                Annuler
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={props.handleDelete}>
                Supprimer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ModifyAd;