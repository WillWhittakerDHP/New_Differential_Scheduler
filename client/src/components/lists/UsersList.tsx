import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from '../AppointmentContext';
import { retrieveVisibleUserTypes } from '../../api/internalAPI/appointmentAPI';
import type { UserTypeData } from '../../interfaces/apiInterfaces';

// Define the props for the component
interface UsersListProps {
//   Services: ServiceTypeData[] | null;
}

const UsersList: React.FC<UsersListProps> = () => {
  // Access the context
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('UsersList must be used within an AppointmentProvider');
  }

  const { availableUserTypes, setAvailableUserTypes, thisUserType, setThisUserType } = context;

  // Fetch user types
  const fetchAllVisibleUserTypes = async () => {
      try {
        const data = await retrieveVisibleUserTypes();
        setAvailableUserTypes(data);
        
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };
    
    useEffect(() => { 
      fetchAllVisibleUserTypes(); 
    }, [setAvailableUserTypes]);
  
  const handleUserTypeSelect = (selectedUserType: UserTypeData) => {
    setThisUserType(selectedUserType);
  };

  return (
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role from UsersList.tsx</h4>
      <Row>
        {availableUserTypes && availableUserTypes.length > 0 ? (
          availableUserTypes.map((availableUserType) => (
            <Card
              key={availableUserType.id}
              onClick={() => handleUserTypeSelect(availableUserType)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{availableUserType.name}</Card.Title>
              <Card.Text>{availableUserType.description}</Card.Text>
            </Card>
          ))
        ) : (
          <p>Loading user types...</p>
        )}
      </Row>
    </Container>
    );
};

export default UsersList;
