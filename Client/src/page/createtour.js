import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AddTour from '../components/Tour/AddTour';
import { getToken } from '../utils/token';

export default function CreateTour(props) {
  useEffect(() => {
    document.title = 'Tạo tour';
  }, []);

  const { createTour } = useSelector(state => state);

  const rfToken = getToken();
  if (!rfToken) return <Redirect to="/login" />;

  if (createTour.tour.length === 0) {
    return <Redirect to="/" />;
  }

  return <AddTour isUpdate={false} />;
}
