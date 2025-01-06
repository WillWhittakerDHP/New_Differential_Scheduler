import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from './AppointmentContext';
import { retrieveAllVisibleUserTypes } from '../api/internalAPI/appointmentAPI';
import type { UserTypeData } from '../interfaces/serviceInterfaces';

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

  const { userTypes, setUserTypes, thisUserType, setThisUserType } = context;

  // Fetch user types
  const fetchAllVisibleUserTypes = async () => {
      try {
        const data = await retrieveAllVisibleUserTypes();
        setUserTypes(data);
        
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };
    
    useEffect(() => { 
      fetchAllVisibleUserTypes(); 
    }, [setUserTypes]);
  
  const handleUserTypeSelect = (selectedUserType: UserTypeData) => {
    setThisUserType(selectedUserType);
  };

  return (
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role from UsersList.tsx</h4>
      <Row>
        {userTypes && userTypes.length > 0 ? (
          userTypes.map((userType) => (
            <Card
              key={userType.id}
              onClick={() => handleUserTypeSelect(userType)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{userType.name}</Card.Title>
              <Card.Text>{userType.description}</Card.Text>
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
