import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import { retrieveAllVisibleUserTypes, retrieveUserTypeDataByID } from '../api/internalAPI/userTypeAPI';
import { retrieveServiceTypeDataByID } from '../api/internalAPI/serviceAPI';
import type { UserTypeData, ServiceData, AdditionalServiceData } from '../interfaces/appointmentInterfaces';

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
    };

    const [serviceTypes, setServiceTypes] = useState<ServiceData[]>([]);
    
    const fetchUserTypeData = async () => {
      if (thisUserType !== undefined) {
        const data = await retrieveUserTypeDataByID(thisUserType.id);
        const availableServices: ServiceData[] = JSON.parse(JSON.stringify(data.Services));
        setServiceTypes(availableServices);
      }
    }    
    
    useEffect (() => { 
    if (thisUserType){
      fetchUserTypeData();
    }}, [thisUserType]);
  
    
    //Populate the additionalServices based on the Selected ServiceType
    const [thisServiceType, setThisServiceType] = useState<ServiceData | undefined>();
      const handleServiceTypeSelect = (selectedAdditionalServiceType: ServiceData) => {
        setThisServiceType(selectedAdditionalServiceType);
      };

  const [additionalServiceTypes, setAdditionalServiceTypes] = useState<AdditionalServiceData[]>([]);
  
  const fetchServiceTypeData = async () => {
    if (thisServiceType !== undefined) {
      const data = await retrieveServiceTypeDataByID(thisServiceType.id);
      const availableAdditionalServices: AdditionalServiceData[] = JSON.parse(JSON.stringify(data.AdditionalServices));
      setAdditionalServiceTypes(availableAdditionalServices);
    }
  }    

  useEffect (() => { 
    if (thisServiceType){
      fetchServiceTypeData();
    }}, [thisServiceType]);

    const [thisAdditionalServiceType, setThisAdditionalServiceType] = useState<AdditionalServiceData | undefined>();
      const handleAdditionalServiceTypeSelect = (selectedAdditionalServiceType: AdditionalServiceData) => {
        setThisAdditionalServiceType(selectedAdditionalServiceType);
      };
  


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
              onClick={() => handleServiceTypeSelect(service)}
              style={{ cursor: 'pointer' }}
          >
              <Card.Title>{service.name}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
          </Card>
        ))}
      </Row>
    </Container>
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Additional Service</h4>
      <Row>
        {additionalServiceTypes.map((additionalService) => (
          <Card key={additionalService.id}
              onClick={() => handleAdditionalServiceTypeSelect(additionalService)}
              style={{ cursor: 'pointer' }}
          >
              <Card.Title>{additionalService.name}</Card.Title>
              <Card.Text>{additionalService.description}</Card.Text>
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