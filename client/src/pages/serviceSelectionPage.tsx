import React, { useContext } from 'react';
// import { Container, Row, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import { AppointmentContext } from '../components/AppointmentContext';

import UsersList from '../components/lists/UsersList';
import ServicesList from '../components/lists/ServicesList';
import AdditionalServicesList from '../components/lists/AdditionalServicesList';


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
    </>
  );
};

export default ServicesPage;
    