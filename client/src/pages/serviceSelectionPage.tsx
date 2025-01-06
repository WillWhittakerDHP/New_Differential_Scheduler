import React, { useContext, useEffect, useState } from 'react';
// import { Container, Row, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import { AppointmentContext } from '../components/AppointmentContext';

import UsersList from '../components/UsersList';
import ServicesList from '../components/ServicesList';
import AdditionalServicesList from '../components/AdditionalServicesList';
import AvailabilityOptionsList from '../components/AvailabilityOptionsList';
import DwellingAdjustmentsList from '../components/DwellingAdjustmentList';

const ServicesPage: React.FC = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesPage must be used within an AppointmentProvider');
  }  
    
  return (
    <>
    <UsersList />
    <ServicesList />
    <AdditionalServicesList />
    <AvailabilityOptionsList />
    <DwellingAdjustmentsList />
    </>
  );
};

export default ServicesPage;
    