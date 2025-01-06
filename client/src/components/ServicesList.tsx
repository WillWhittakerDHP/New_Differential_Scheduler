import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from './AppointmentContext';
import { retrieveServicesForUserTypeByID } from '../api/internalAPI/appointmentAPI';
import { retrieveDescriptionForUserTypeByID } from '../api/internalAPI/detailsAPI';
import type { ServiceTypeData } from '../interfaces/serviceInterfaces';
import type { DescriptionsData } from '../interfaces/detailInterfaces';

// Define the props for the component
interface ServicesListProps {
//   Services: ServiceTypeData[] | null;
}

const ServicesList: React.FC<ServicesListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesList must be used within an AppointmentProvider');
  }

  const { thisUserType, thisService, availableServiceTypes, setAvailableServiceTypes, setThisService, setServiceDescriptions } = context;

  // Fetch Service types
  const fetchAllAvailableServiceTypes = async () => {
    if (thisUserType !== undefined )
    try {
      if(thisUserType) {
        const data = await retrieveServicesForUserTypeByID(thisUserType.id);
        const availableServices: ServiceTypeData[] = JSON.parse(JSON.stringify(data));
        setAvailableServiceTypes(availableServices);
        console.log(availableServices)
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('Error fetching Service types:', error);
    }
  };

  // Fetch Descriptions for Users
  const fetchDescriptionForUserTypeByID = async () => {
    if (thisUserType !== undefined )
    try {
      if(thisUserType) {
        const data = await retrieveDescriptionForUserTypeByID(thisUserType.id);
        const serviceDescriptions: DescriptionsData[] = JSON.parse(JSON.stringify(data));
        setServiceDescriptions(serviceDescriptions);
        console.log(serviceDescriptions)
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('Error fetching Service types:', error);
    }
  };

  useEffect(() => {
    fetchAllAvailableServiceTypes();
    fetchDescriptionForUserTypeByID();
  }, [thisUserType, setAvailableServiceTypes, setServiceDescriptions]);

  const handleServiceTypeSelect = (selectedServiceType: ServiceTypeData) => {
    setThisService(selectedServiceType);
  };

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Service from ServicestList.tsx</h4>
      <Row>
        {availableServiceTypes && availableServiceTypes.length > 0 ? (
          availableServiceTypes.map((service) => (
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
