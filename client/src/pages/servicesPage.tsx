import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import { retrieveAllVisibleUserTypes, retrieveUserTypeByID } from '../api/internalAPI/userTypeAPI';
import type { UserTypeData, ServiceData } from '../interfaces/appointmentInterfaces';

const ServicesPage: React.FC = () => {
  
  // Prompt Users to Select their type
  const [userTypes, setUserTypes] = useState<UserTypeData[]>([]);
  
  const fetchAllVisibleUserTypes = async () => {
    const data = await retrieveAllVisibleUserTypes();

    setUserTypes(data);
  }
  
  useEffect (() => {
    fetchAllVisibleUserTypes();
  }, []);
  
  //Populate the services based on the Selected User Type
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  
    const handleUserTypeSelect = (selectedUserType: UserTypeData) => {
      setThisUserType(selectedUserType);
      // setServiceTypes(userToServiceArrayConverter(thisUserType));
      // setAdditionalServices([]);
      // setProgress(40);
    };
    
    const fetchUserTypeData = async () => {
      if (thisUserType !== undefined) {
        const data = await retrieveUserTypeByID(thisUserType.id);
      }
    }    
    
    const [serviceTypes, setServiceTypes] = useState<ServiceData[]>([]);
    
    const setSevicesFromUserTypeData = async () => {
      if (thisUserType !== undefined) {
        const data = await retrieveUserTypeByID(thisUserType.id);
        // console.log(data.Services);
        const availableServices: ServiceData[] = JSON.parse(JSON.stringify(data.Services));
        console.log(availableServices);
        setServiceTypes(availableServices);
      }
    }

    useEffect (() => { 
    if (thisUserType){
      fetchUserTypeData();
      setSevicesFromUserTypeData();
    }
    }, [thisUserType]);
    
  // const userToServiceArrayConverter = async (thisUserType: UserTypeData) => {
  //   const servicesArray: ServiceData[] = [];
  //   const data1 = await retrieveServiceByID(thisUserType.available_service_1);
  //   servicesArray.push(data1);
  //   const data2 = await retrieveServiceByID(thisUserType.available_service_1);
  //   servicesArray.push(data2);
  //   const data3 = await retrieveServiceByID(thisUserType.available_service_1);
  //   servicesArray.push(data3);
  //   const data4 = await retrieveServiceByID(thisUserType.available_service_1);
  //   servicesArray.push(data4);
  //   setServiceTypes(servicesArray);
  //   };
  
    // useEffect (() => {
    //   userToServiceArrayConverter(thisUserType as UserTypeData);}, [thisUserType]);

      const [thisService, setThisService] = useState<ServiceData | null>(null);
      
      const handleServiceTypeSelect = (service: ServiceData) => {
        setThisService(service);
        // setAdditionalServices([]);
        // setProgress(60);
      };

  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [progress, setProgress] = useState(20);
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handlePrevious = () => {
    navigate('/'); 
  };
  
  const handleNext = () => {
    navigate('/propertyDetails'); 
  };



return (
  <>
  <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role</h4>
      <Row>
        {userTypes.map((user) => (
          <Card key={user.id}
              onClick={() => handleUserTypeSelect(user)}
              style={{ cursor: 'pointer' }}
          >
            {/* <Card.Body> */}
              {/* <div style={{ fontSize: '2rem' }}>{user.icon}</div> */}
              <Card.Title>{user.type}</Card.Title>
              <Card.Text>{user.description}</Card.Text>
            {/* </Card.Body> */}
          </Card>
        ))}
      </Row>
    </Container>
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Service</h4>
      <Row>
        {serviceTypes.map((service) => (
          <Card key={service.id}
              // onClick={() => handleserviceTypeSelect(service)}
              // style={{ cursor: 'pointer' }}
          >
            {/* <Card.Body> */}
              {/* <div style={{ fontSize: '2rem' }}>{service.icon}</div> */}
              <Card.Title>{service.name}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
            {/* </Card.Body> */}
          </Card>
        ))}
      </Row>
    </Container>

  <div className="button-container">
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
</>
  );
};



export default ServicesPage;