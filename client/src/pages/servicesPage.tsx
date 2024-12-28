import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import type { UserTypeData, ServiceData, AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData } from '../interfaces/appointmentInterfaces';
import { retrieveAllVisibleUserTypes, retrieveUserTypeDataByIDForAssociatedServices } from '../api/internalAPI/userTypeAPI';
import { retrieveServiceDataByIDForAssociatedAdditionalServices, retrieveServiceDataByIDForAssociatedAvailabilityOptions, retrieveServiceDataByIDForAssociatedDwellingAdjustments, retrieveServiceDataByID, retrieveAdditionalServiceDataByID, retrieveAvailabilityOptionDataByID, retrieveDwellingAdjustmentDataByID } from '../api/internalAPI/contentAPI';

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
  
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const handleUserTypeSelect = (selectedUserType: UserTypeData) => {
    setThisUserType(selectedUserType);
  };
  

  //Populate the services based on the Selected User Type
    const [services, setServices] = useState<ServiceData[]>([]);
    
    const fetchUserTypeData = async () => {
      if (thisUserType !== undefined) {
        const data = await retrieveUserTypeDataByIDForAssociatedServices(thisUserType.id);
        const availableServices: ServiceData[] = JSON.parse(JSON.stringify(data.Services));
        setServices(availableServices);
      }
    }    
    
    useEffect (() => { 
    if (thisUserType){
      fetchUserTypeData();
    }}, [thisUserType]);
  
    
    const [thisService, setThisService] = useState<ServiceData | undefined>();
    const handleServiceSelect = (selectedAdditionalService: ServiceData) => {
      setThisService(selectedAdditionalService);
    };
    

  //Populate the additionalServices based on the Selected Service
  const [additionalServices, setAdditionalServices] = useState<AdditionalServiceData[]>([]);
  
  const fetchServiceDataByIDForAssociatedAdditionalServices = async () => {
    if (thisService !== undefined) {
      const data = await retrieveServiceDataByIDForAssociatedAdditionalServices(thisService.id);
      const availableAdditionalServices: AdditionalServiceData[] = JSON.parse(JSON.stringify(data.AdditionalServices));
      setAdditionalServices(availableAdditionalServices);
    }
  }    

  useEffect (() => { 
    if (thisService){
      fetchServiceDataByIDForAssociatedAdditionalServices();
    }}, [thisService]);

    const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
      const handleAdditionalServiceSelect = (selectedAdditionalService: AdditionalServiceData) => {
        setThisAdditionalService(selectedAdditionalService);
      };
  
  //Populate the availabilityOptions based on the Selected Service
  const [availabilityOptions, setAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  
  const fetchServiceDataByIDForAssociatedAvailabilityOptions = async () => {
    if (thisService !== undefined) {
      const data = await retrieveServiceDataByIDForAssociatedAvailabilityOptions(thisService.id);
      const availableAvailabilityOptions: AvailabilityOptionData[] = JSON.parse(JSON.stringify(data.AvailabilityOptions));
      setAvailabilityOptions(availableAvailabilityOptions);
    }
  }    

  useEffect (() => { 
    if (thisService){
      fetchServiceDataByIDForAssociatedAvailabilityOptions();
    }}, [thisService]);

    const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
      const handleAvailabilityOptionSelect = (selectedAvailabilityOption: AvailabilityOptionData) => {
        setThisAvailabilityOption(selectedAvailabilityOption);
      };
  

        //Populate the DwellingAdjustments based on the Selected Service
  const [dwellingAdjustments, setDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  
  const fetchServiceDataByIDForAssociatedDwellingAdjustments = async () => {
    if (thisService !== undefined) {
      const data = await retrieveServiceDataByIDForAssociatedDwellingAdjustments(thisService.id);
      const availableDwellingAdjustments: DwellingAdjustmentData[] = JSON.parse(JSON.stringify(data.DwellingAdjustments));
      setDwellingAdjustments(availableDwellingAdjustments);
    }
  }    

  useEffect (() => { 
    if (thisService){
      fetchServiceDataByIDForAssociatedDwellingAdjustments();
    }}, [thisService]);

    const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();
      const handleDwellingAdjustmentSelect = (selectedDwellingAdjustment: DwellingAdjustmentData) => {
        setThisDwellingAdjustment(selectedDwellingAdjustment);
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
        {services.map((service) => (
          <Card key={service.id}
              onClick={() => handleServiceSelect(service)}
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
        {additionalServices.map((additionalService) => (
          <Card key={additionalService.id}
              onClick={() => handleAdditionalServiceSelect(additionalService)}
              style={{ cursor: 'pointer' }}
          >
              <Card.Title>{additionalService.name}</Card.Title>
              <Card.Text>{additionalService.description}</Card.Text>
          </Card>
        ))}
      </Row>
    </Container>
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Availability Option</h4>
      <Row>
        {availabilityOptions.map((availabilityOption) => (
          <Card key={availabilityOption.id}
              onClick={() => handleAvailabilityOptionSelect(availabilityOption)}
              style={{ cursor: 'pointer' }}
          >
              <Card.Title>{availabilityOption.name}</Card.Title>
              <Card.Text>{availabilityOption.description}</Card.Text>
          </Card>
        ))}
      </Row>
    </Container>
    <Container className="mt-4">
      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Dwelling Adjustment</h4>
      <Row>
        {dwellingAdjustments.map((dwellingAdjustment) => (
          <Card key={dwellingAdjustment.id}
              onClick={() => handleDwellingAdjustmentSelect(dwellingAdjustment)}
              style={{ cursor: 'pointer' }}
          >
              <Card.Title>{dwellingAdjustment.name}</Card.Title>
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