import React, { useContext, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import { AppointmentContext } from './AppointmentContext';
import { retrieveAllVisibleUserTypes } from '../api/internalAPI/appointmentAPI';
import type { UserTypeData } from '../interfaces/serviceInterfaces';

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

  const { userTypes, setUserTypes, setThisUserType } = context;

  // Fetch user types
  useEffect(() => {
    const fetchAllVisibleUserTypeServices = async () => {
      try {
        const data = await retrieveAllVisibleUserTypes();
        setUserTypes(data);
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    fetchAllVisibleUserTypeServices();
  }, [setUserTypes]);

  // State for selected user type
//   const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();

  const handleUserTypeSelect = (selectedUserType: UserTypeData) => {
    setThisUserType(selectedUserType);
  };

  return (
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role</h4>
      <Row>
        {userTypes && userTypes.length > 0 ? (
          userTypes.map((user) => (
            <Card
              key={user.id}
              onClick={() => handleUserTypeSelect(user)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.description}</Card.Text>
            </Card>
          ))
        ) : (
          <p>Loading user types...</p>
        )}
      </Row>
    </Container>
    );
};

export default ServicesList;
