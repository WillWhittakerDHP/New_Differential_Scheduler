import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
// import { retrieveAdditionalServiceByID } from '../../api/internalAPI/appointmentAPI';

import type { AdditionalServiceData } from '../../interfaces/serviceInterfaces';

// Define the props for the component
interface AdditionalServicesProps {
//   AdditionalServices: AdditionalServiceData[] | null;
}

const AdditionalServicesList: React.FC<AdditionalServicesProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AdditionalServicesList must be used within an AppointmentProvider');
  }

  const { availableAdditionalServices, thisAdditionalService,setThisAdditionalService } = context;

  const handleAdditionalServiceTypeSelect = (selectedAdditionalService: AdditionalServiceData) => {
    setThisAdditionalService(selectedAdditionalService);
  };

  // // Fetch AdditionalService types
  // const fetchAdditionalServiceByID = async () => {
  //   if (thisAdditionalService !== undefined && thisAdditionalService !== null)
  //     try {
  //     const data = await retrieveAdditionalServiceByID(thisAdditionalService.id);
  //     const additionalService: AdditionalServiceData = JSON.parse(JSON.stringify(data));
  //     console.log('additionalService from AdditionalServicesList.tsx', additionalService);
  //   } catch (error) {
  //     console.error('Error fetching Service types:', error);
  //   }
  // };
  
  // if (additionalService !== undefined && additionalService !== null) {
  //   setThisAdditionalService(additionalService); // Updates state only when necessary
  // }
    // useEffect(() => {
    //   fetchAdditionalServiceByID();
    // }, [thisAdditionalService, setThisAdditionalService]);

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Additional Service from AdditionalServicestList.tsx</h4>
      <Row>
        {availableAdditionalServices && availableAdditionalServices.length > 0 ? (
          availableAdditionalServices.map((additionalService) => (
            <Card
              key={additionalService.id}
              onClick={() => handleAdditionalServiceTypeSelect(additionalService)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{additionalService.name}</Card.Title>
              <Card.Text>{additionalService.description}</Card.Text>
            </Card>
          ))
        ) : (
          <p>Loading Additional Service types...</p>
        )}
      </Row>
    </Container>
    );
};

export default AdditionalServicesList;
