import React, { useContext } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import type { AdditionalServiceData } from '../../interfaces/serviceInterfaces';

// Define the props for the component
interface AdditionalServicesListProps {
//   AdditionalServices: AdditionalServiceData[] | null;
}

const AdditionalServicesList: React.FC<AdditionalServicesListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AdditionalServicesList must be used within an AppointmentProvider');
  }

  const { availableAdditionalServiceTypes, setThisAdditionalService } = context;

  const handleAdditionalServiceTypeSelect = (selectedAdditionalService: AdditionalServiceData) => {
    setThisAdditionalService(selectedAdditionalService);
  };

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Additional Service from AdditionalServicestList.tsx</h4>
      <Row>
        {availableAdditionalServiceTypes && availableAdditionalServiceTypes.length > 0 ? (
          availableAdditionalServiceTypes.map((additionalService) => (
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
