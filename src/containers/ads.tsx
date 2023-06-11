import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';

import Pagination from '../components/pagination';
import AdList from './adList';
import ActiveAd from './activeAd';
import ModifyAd from './modifyAd';
import { Ad } from '../interface/ad.interface';

const Ads = () => {
  const [adsList, setAdsList] = useState<Ad[]>([]);
  const [page, setPage] = useState<number>(1);
  const [activeAd, setActiveAd] = useState<Ad>();
  const [modifyAd, setModifyAd] = useState<Ad>();
  const limit = 5;

  useEffect(() => {
    axios.get(`http://localhost:3001/creatives?_page=${page}&_limit=${limit}`).then(function(response){
      setAdsList(response.data);
    });
  }, [page, limit]);

  const showDetailAd = (ad: Ad) => {
    axios.get(`http://localhost:3001/creatives/${ad.id}`).then(function(response){
      setActiveAd(response.data);
      setModifyAd(undefined);
    });
  };
  
  const handleModifyAd = (ad: Ad) => {
    axios.get(`http://localhost:3001/creatives/${ad.id}`).then(function(response){
      setModifyAd(response.data);
    });
  };

  const handleSave = () => {
    if (modifyAd) {
      modifyAd.lastModified = new Date().toISOString();
      axios.put(`http://localhost:3001/creatives/${modifyAd.id}`, modifyAd)
        .then(function() {
          const updatedAdsList = adsList.map(ad => {
            if (ad.id === modifyAd.id) {
              return modifyAd;
            }
            return ad;
          });
          setAdsList(updatedAdsList);
          setActiveAd(undefined);
          setModifyAd(undefined);
        })
        .catch(function(error) {
          console.error('Erreur lors de la mise à jour :', error);
        });
    }
  };

  const handleDelete = () => {
    if (modifyAd) {
      axios.delete(`http://localhost:3001/creatives/${modifyAd.id}`)
        .then(function() {
          const updatedAdsList = adsList.filter(ad => ad.id !== modifyAd.id);
          setAdsList(updatedAdsList);
          setActiveAd(updatedAdsList[0]);
          setModifyAd(undefined);
        })
        .catch(function(error) {
          console.error('Error deleting ad:', error);
        });
    }
  };

  const handleCancel = () => {
    setModifyAd(undefined);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 5 }}>
      <AdList
        updateAdList={setAdsList}
        list={adsList}
        showDetailAd={showDetailAd}
      />
      <Pagination
        limit={limit}
        updatePage={setPage}
        page={page}
      />
      {activeAd &&
        <ActiveAd
          updateActiveAd={setActiveAd}
          activeAd={activeAd}
          handleModifyAd={handleModifyAd}
        />
      }
      {modifyAd &&
        <ModifyAd
          updateModifyAd={setModifyAd}
          modifyAd={modifyAd}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        />
      }
    </Container>
  );
};

export default Ads;