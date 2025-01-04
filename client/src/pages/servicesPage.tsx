import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import { AppointmentContext } from '../components/AppointmentContext';

import type { ServiceTypeData, UserTypeData,AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData } from '../interfaces/serviceInterfaces';

import {
  retrieveServicesForUserTypeByID,
  retrieveAdditionalServicesForServiceByID,
  retrieveAvailabilityOptionsForServiceByID,
  retrieveDwellingAdjustmentsForServiceByID,
} from '../api/internalAPI/appointmentAPI';  

import ServicesList from '../components/ServicesList';
import AdditionalServicesList from '../components/AdditionalServicesList';

const ServicesPage: React.FC = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesPage must be used within an AppointmentProvider');
  }  
  
  const { thisUserType } = context;
  
  const [services, setServices] = useState<ServiceTypeData[]>([]);
  const [thisService, setThisService] = useState<ServiceTypeData | undefined>();
  const [additionalServices, setAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [availabilityOptions, setAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [dwellingAdjustments, setDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  
  useEffect(() => {
    const fetchUserTypeServicesByID = async () => {
      if (thisUserType) {
        try {
          const data = await retrieveServicesForUserTypeByID(thisUserType.id);
          const availableServices: ServiceTypeData[] = JSON.parse(JSON.stringify(data));
          setServices(availableServices);
        } catch (error) {
          console.error('Error fetching services:', error);
        }  
      }  
    };  
    fetchUserTypeServicesByID();
  }, [thisUserType]);  

  
      // Handle selections
      const handleServiceSelect = (selectedService: ServiceTypeData) => {
        setThisService(selectedService);
      };
    
      return (
        <><ServicesList />
        <AdditionalServicesList />
        <Container className="mt-4">
          <h4 className="mt-4">Select Your Service</h4>
          <Row>
            {services.map((service) => (
              <Card
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card>
            ))}
          </Row>
        </Container>
        </>
      );
    };
    
    export default ServicesPage;
    