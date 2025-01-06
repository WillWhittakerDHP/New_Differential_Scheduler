import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from './AppointmentContext';
import { retrieveAvailabilityOptionsForServiceByID } from '../api/internalAPI/appointmentAPI';
import type { AvailabilityOptionData } from '../interfaces/serviceInterfaces';

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

  const { thisService, availableAvailabilityOptions, setAvailableAvailabilityOptions, setThisAvailabilityOption } = context;

  // Fetch AvailabilityOption types
  const fetchAllAvailableAvailabilityOptionTypes = async () => {
    if (thisService !== undefined )
    try {
      if(thisService) {
        const data = await retrieveAvailabilityOptionsForServiceByID(thisService.id);
        const availableAvailabilityOptions: AvailabilityOptionData[] = JSON.parse(JSON.stringify(data));
        setAvailableAvailabilityOptions(availableAvailabilityOptions);
      } else {
        throw new Error()
      }
    } catch (error) {
      console.error('Error fetching Service types:', error);
    }
  };

  useEffect(() => {
    fetchAllAvailableAvailabilityOptionTypes();
  }, [thisService, setAvailableAvailabilityOptions]);

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
