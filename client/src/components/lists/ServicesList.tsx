import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import { retrieveServicesForUserTypeByID } from '../../api/internalAPI/adminAPI';
import { retrieveServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { AdditionalServiceData, ServiceData } from '../../interfaces/serviceInterfaces';

// Define the props for the component
// interface ServicesListProps {
//   Services: ServiceData[] | null;
//   AdditionalServices: AdditionalServiceData[] | null;
// }

const ServicesList: React.FC<ServiceData> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesList must be used within an AppointmentProvider');
  }

  const { thisUserType, thisService, availableServices, setAvailableServices, setThisService, setAvailableAdditionalServiceTypes, setAvailableAvailabilityOptions, setDwellingAdjustments
  } = context;

  // Fetch Service types
  const fetchAllAvailableServices = async () => {
    if (thisUserType !== undefined )
    try {
      if(thisUserType) {
        const data = await retrieveServicesForUserTypeByID(thisUserType.id);
        const availableServices: ServiceData[] = JSON.parse(JSON.stringify(data));
        setAvailableServices(availableServices);
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('Error fetching Service types:', error);
    }
  };

  useEffect(() => {
    fetchAllAvailableServices();
  }, [thisUserType, setAvailableServices]);

  const handleServiceTypeSelect = (selectedServiceType: ServiceData) => {
    setThisService(selectedServiceType);
  };

    // Fetch AdditionalService types
    const fetchServiceByID = async () => {
      if (thisService !== undefined)
      try {
        if(thisService) {
          const data = await retrieveServiceByID(thisService.id);
          const service: ServiceData = JSON.parse(JSON.stringify(data));
          const availableAdditionalServices =  service.AdditionalServices;
          if (availableAdditionalServices !== undefined && availableAdditionalServices !== null)
          setAvailableAdditionalServiceTypes(availableAdditionalServices);
          const availableAvailabilityOptions =  service.AvailabilityOptions;
          if (availableAvailabilityOptions !== undefined && availableAvailabilityOptions !== null)
          setAvailableAvailabilityOptions(availableAvailabilityOptions);
          const availableDwellingAdjustments =  service.DwellingAdjustments;
          if (availableDwellingAdjustments !== undefined && availableDwellingAdjustments !== null)
          setDwellingAdjustments(availableDwellingAdjustments);
        } else {
          throw new Error()
        }
      } catch (error) {
        console.error('Error fetching Service types:', error);
      }
    };
  
    useEffect(() => {
      fetchServiceByID();
    }, [thisService, setAvailableAdditionalServiceTypes]);

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Service from ServicestList.tsx</h4>
      <Row>
        {availableServices && availableServices.length > 0 ? (
          availableServices.map((service) => (
            <Card
              key={service.id}
              onClick={() => handleServiceTypeSelect(service)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{service.name}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
            </Card>
          ))
        ) : (
          <p>Loading Service types...</p>
        )}
      </Row>
    </Container>
    );
};

export default ServicesList;
