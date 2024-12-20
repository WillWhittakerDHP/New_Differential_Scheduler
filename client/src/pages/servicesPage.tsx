import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

import { retrieveAllUIDescriptions, retrieveUIDescriptionByID } from '../api/internalRoutes/appointmentRoutes/structureRoutes/uiDescriptionsAPI';
import type { UIDescriptionsData } from '../interfaces/appointmentInterfaces';
import UIDescriptionList from '../components/ServicesList';

const ServicesPage: React.FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [progress, setProgress] = useState(20);
  const navigate = useNavigate(); // Initialize navigate for navigation
  
  const [uIDescriptions, setUIDescriptions] = useState<UIDescriptionsData[]>([]);
  const [thisUIDescription, setThisUIDescription] = useState<UIDescriptionsData | undefined>();
  
  useEffect (() => {
    fetchAllUIDescriptions();
  }, []);

  const fetchAllUIDescriptions = async () => {
    const data = await retrieveAllUIDescriptions();
    setUIDescriptions(data);
  }

  const fetchThisUIDescrption = async (UIDescription: UIDescriptionsData) => {
    try{
      console.log("ding", UIDescription.ui_description_set_id);
      const data = await retrieveUIDescriptionByID(UIDescription.ui_description_set_id);
      setThisUIDescription(data);
    } catch (err) { console.error('failed to retreive the UI descriptions for this service:', err);
      }
  }

  useEffect(() => {fetchThisUIDescrption(thisUIDescription as UIDescriptionsData);}, [userType]);

  const handlePrevious = () => {
    navigate('/'); 
  };
  
  const handleNext = () => {
    navigate('/propertyDetails'); 
  };
  
  const userTypes = [
    {
      id: 'buyer',
      icon: '📄',
      title: 'I am the Buyer',
      description: 'I need an inspection to help me understand a property that I am trying to buy.',
    },
    {
      id: 'owner',
      icon: '💎',
      title: 'I am the Owner',
      description: 'I already own a property but need to understand it better.',
    },
    {
      id: 'agent',
      icon: '💼',
      title: 'I am the Agent',
      description: 'I am a real estate agent helping a buyer with their inspection needs.',
    },
  ];
  
  const serviceTypes = [
    {
      id: 'buyers_inspection',
      title: "Buyer's Inspection",
      description: 'I am under contract on a home, and I need someone to inspect the property, test all equipment, and recommend repairs.',
    },
    {
      id: 'walk_and_talk',
      title: 'Walk & Talk',
      description: 'I want to buy a home, and before I finalize my offer, I need a professional to examine the property and answer questions.',
    },
    {
      id: 're_inspection',
      title: 'Re-Inspection',
      description: 'The seller agreed to make repairs as part of our negotiation, and I need a professional to verify their work.',
    },
  ];
  
  const additionalServiceTypes = [
    { id: 'radon_testing', title: 'Radon Testing', description: 'A test for radon levels in the home.' },
    { id: 'mold_testing', title: 'Mold Testing', description: 'Check for the presence of mold in the property.' },
    { id: 'water_testing', title: 'Water Testing', description: 'Analyze the water quality in the home.' },
  ];
  
  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setServiceType(null);
    setAdditionalServices([]);
    setProgress(40);
  };
  
  const handleServiceTypeSelect = (type: string) => {
    setServiceType(type);
    setAdditionalServices([]);
    setProgress(60);
  };
  
  const handleAdditionalServiceToggle = (service: string) => {
    setAdditionalServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
  );
};

const renderProgressBarText = () => {
  return `I am a ${userType || 'User'} that needs a ${serviceType || 'Service'} ${
    additionalServices.length > 0 ? `with ${additionalServices.join(', ')}` : ''
  }.`;
};



return (
  <>
  {/* <UIDescriptionList UIDescriptions={uIDescriptions} /> */}
  <Container className="mt-4">
      {/* Progress Bar */}
      <ProgressBar now={progress} label={renderProgressBarText()} />

      {/* User Type Selection */}
      <h4 className="mt-4">Select Your Role</h4>
      <Row>
        {userTypes.map((user) => (
          <Col key={user.id} md={4} className="mb-3">
            <Card
              className={`text-center ${userType === user.id ? 'border-primary' : ''}`}
              onClick={() => handleUserTypeSelect(user.id)}
              style={{ cursor: 'pointer' }}
              >
              <Card.Body>
                <div style={{ fontSize: '2rem' }}>{user.icon}</div>
                <Card.Title>{user.title}</Card.Title>
                <Card.Text>{user.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Service Type Selection */}
      {userType && (
        <>
          <h4 className="mt-4 d-flex justify-content-between">
            <span>Select my service type</span>
            <Form.Check type="radio" label="I only want a quote" />
          </h4>
          <Row>
            {serviceTypes.map((service) => (
              <Col key={service.id} md={4} className="mb-3">
                <Card
                  className={`text-center ${serviceType === service.id ? 'border-primary' : ''}`}
                  onClick={() => handleServiceTypeSelect(service.id)}
                  style={{ cursor: 'pointer' }}
                  >
                  <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Additional Service Selection */}
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
      )}
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
      {serviceType && (
        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="primary"
            onClick={() => alert('Navigating to Property Details Page...')}
            >
            Next
          </Button>
        </div>
      )}
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