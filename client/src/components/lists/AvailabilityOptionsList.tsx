import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import type { AvailabilityOptionData } from '../../interfaces/serviceInterfaces';

// Define the props for the component
interface AvailabilityOptionsListProps {
//   AvailabilityOptions: AvailabilityOptionData[] | null;
}

const AvailabilityOptionsList: React.FC<AvailabilityOptionsListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('AvailabilityOptionsList must be used within an AppointmentProvider');
  }

  const { availableAvailabilityOptions, setThisAvailabilityOption } = context;

  const handleAvailabilityOptionTypeSelect = (selectedAvailabilityOption: AvailabilityOptionData) => {
    setThisAvailabilityOption(selectedAvailabilityOption);
  };

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Select Your Availability Option from AvailabilityOptionstList.tsx</h4>
      <Row>
        {availableAvailabilityOptions && availableAvailabilityOptions.length > 0 ? (
          availableAvailabilityOptions.map((AvailabilityOption) => (
            <Card
              key={AvailabilityOption.id}
              onClick={() => handleAvailabilityOptionTypeSelect(AvailabilityOption)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{AvailabilityOption.name}</Card.Title>
              <Card.Text>{AvailabilityOption.description}</Card.Text>
            </Card>
          ))
        ) : (
          <p>Loading Availability Options...</p>
        )}
      </Row>
    </Container>
    );
};

export default AvailabilityOptionsList;
