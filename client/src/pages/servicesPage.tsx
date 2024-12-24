import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

// import { retrieveAllUIDescriptions, retrieveUIDescriptionByID } from '../api/internalRoutes/appointmentRoutes/structureRoutes/uiDescriptionsAPI';
// import type { UIDescriptionsData } from '../interfaces/appointmentInterfaces';
// import UIDescriptionList from '../components/ServicesList';
import { retrieveAllVisibleUserTypes } from '../api/internalAPI/participantAPI/userTypeAPI';
// import { retrieveServiceByID } from '../api/internalAPI/appointmentAPI/contentAPI/serviceAPI';
import type { ServiceData, UserTypeData } from '../interfaces/appointmentInterfaces';

const ServicesPage: React.FC = () => {
  
  // USER TYPING THE PAGE
  // Prompt Users to Select their type
  const [userTypes, setUserTypes] = useState<UserTypeData[]>([]);
  
  const fetchAllVisibleUserTypes = async () => {
    const data = await retrieveAllVisibleUserTypes();
    setUserTypes(data);
  }
  
  useEffect (() => {
    fetchAllVisibleUserTypes();
  }, []);
  
  const [thisUserType, setThisUserType] = useState<UserTypeData | null>(null);
  
    const handleUserTypeSelect = (selectedUserType: UserTypeData) => {
      setThisUserType(selectedUserType);
      // setServiceTypes(userToServiceArrayConverter(thisUserType));
      // setAdditionalServices([]);
      // setProgress(40);
    };
  
  //Populate the services based on the Selected User Type
  const [serviceTypes, setServiceTypes] = useState<ServiceData[]>([]);
  
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
  
  // const [uIDescriptions, setUIDescriptions] = useState<UIDescriptionsData[]>([]);
  // const [thisUIDescription, setThisUIDescription] = useState<UIDescriptionsData | undefined>();
  
  // const fetchAllUIDescriptions = async () => {
  //   const data = await retrieveAllUIDescriptions();
  //   console.log(data);
  //   setUIDescriptions(data);
  // }
  
  // useEffect (() => {
  //   fetchAllUIDescriptions();
  // }, []);

  // const fetchThisUIDescrption = async (UIDescription: UIDescriptionsData) => {
  //   try{
  //     console.log("ding", UIDescription);
  //     const data = await retrieveUIDescriptionByID(UIDescription.ui_description_set_id);
  //     setThisUIDescription(data);
  //   } catch (err) { console.error('failed to retreive the UI descriptions for this service:', err);
  //     }
  // }

  // useEffect(() => {fetchThisUIDescrption(thisUIDescription as UIDescriptionsData);}, [userType]);

  const handlePrevious = () => {
    navigate('/'); 
  };
  
  const handleNext = () => {
    navigate('/propertyDetails'); 
  };
  
  
  // const serviceTypes = [
  //   {
  //     id: 'buyers_inspection',
  //     title: "Buyer's Inspection",
  //     description: 'I am under contract on a home, and I need someone to inspect the property, test all equipment, and recommend repairs.',
  //   },
  //   {
  //     id: 'walk_and_talk',
  //     title: 'Walk & Talk',
  //     description: 'I want to buy a home, and before I finalize my offer, I need a professional to examine the property and answer questions.',
  //   },
  //   {
  //     id: 're_inspection',
  //     title: 'Re-Inspection',
  //     description: 'The seller agreed to make repairs as part of our negotiation, and I need a professional to verify their work.',
  //   },
  // ];
  
  const additionalServiceTypes = [
    { id: 'radon_testing', title: 'Radon Testing', description: 'A test for radon levels in the home.' },
    { id: 'mold_testing', title: 'Mold Testing', description: 'Check for the presence of mold in the property.' },
    { id: 'water_testing', title: 'Water Testing', description: 'Analyze the water quality in the home.' },
  ];
  
  
  
  const handleAdditionalServiceToggle = (service: string) => {
    setAdditionalServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
  );
};

// const renderProgressBarText = () => {
//   return `I am a ${userType || 'User'} that needs a ${serviceType || 'Service'} ${
//     additionalServices.length > 0 ? `with ${additionalServices.join(', ')}` : ''
//   }.`;
// };



return (
  <>
  <Container className="mt-4">
      {/* Progress Bar */}
      {/* <ProgressBar now={progress} label={renderProgressBarText()} /> */}

      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role</h4>
      <Row>
        {userTypes.map((user) => (
            <Card key={user.id}
              onClick={() => handleUserTypeSelect(user)}
              style={{ cursor: 'pointer' }}
              >
              <Card.Body>
                {/* <div style={{ fontSize: '2rem' }}>{user.icon}</div> */}
                <Card.Title>{user.type}</Card.Title>
                <Card.Text>{user.description}</Card.Text>
              </Card.Body>
            </Card>
        ))}
      </Row>

      {/* Service Type Selection */}
      {/* {thisUserType && ( */}
        <>
          <h4 className="mt-4 d-flex justify-content-between">
            <span>Select Your Service</span>
            {/* <Form.Check type="radio" label="I only want a quote" /> */}
          </h4>
          <Row>
            {serviceTypes.map((service) => (
                <Card key={service.id}
                  onClick={() => handleServiceTypeSelect(service)}
                  style={{ cursor: 'pointer' }}
                  >
                  <Card.Body>
                    <Card.Title>{service.name}</Card.Title>
                    {/* <Card.Text>{service.description}</Card.Text> */}
                  </Card.Body>
                </Card>
            ))}
          </Row>
        </>
      {/* )} */}

      {/* Additional Service Selection
      {serviceType && (
        <>
          <h4 className="mt-4">Select Additional Services</h4>
          <Row>
            {additionalServiceTypes.map((additionalService) => (
              <Col key={additionalService.id} md={4} className="mb-3">
                <Card
                  className={`text-center ${
                    additionalServices.includes(additionalService.id) ? 'border-primary' : ''
                  }`}
                  onClick={() => handleAdditionalServiceToggle(additionalService.id)}
                  style={{ cursor: 'pointer' }}
                  >
                  <Card.Body>
                    <Card.Title>{additionalService.title}</Card.Title>
                    <Card.Text>{additionalService.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )} */}
      {/* <Row>
        {additionalServices.map((additionalService, index) => (
          <Col key={index}>
          <Card>
          <Card.Body>
          <Card.Title>{additionalService.title}</Card.Title>
          <Card.Text>{additionalService.description}</Card.Text>
          </Card.Body>
          </Card>
          </Col>
          ))}
          </Row> */}
      {/* Next Button */}
      {/* {serviceType && (
        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="primary"
            onClick={() => alert('Navigating to Property Details Page...')}
            >
            Next
          </Button>
        </div>
      )} */}
    </Container>

  <div className="button-container">
    <button onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </div>
</>
  );
  // return (
  //   <>
  //     <section>
  //       <h1>Service Selection</h1>
  //     </section>
  
  //     <div className="first-page-button">
  //       <button onClick={handlePrevious}>Previous</button>
  //       <button onClick={handleNext}>Next</button>
  //     </div>
  //   </>
  // );
};



export default ServicesPage;