import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 


interface FormData {
  address: string;
  city: string;
  state: string;
  zipCode: number;
  unitNumber: number;
  sqFt: number;
}

const PropertyPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handlePrevious = () => {
    navigate('/serviceSelection'); 
  };

  const handleNext = () => {
    navigate('/appointmentAvailability'); 
  };

  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    address: "",
    city: "",
    state: "",
    zipCode: 0,
    unitNumber: 0,
    sqFt: 0,
  });

  const usStates: string[] = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA","HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ","NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  ];

  const propertyTypes: any[] = [
    "Single Family",
    "Condo/Co-op",
    "Townhouse",
    "Multi-Family",
  ];

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType((prevType) => (prevType === type ? "" : type));
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };


  return (
    <>
    <Container>
      <Row className="my-4">
        <Col>
          <h4>Select Property Types</h4>
          <div className="d-flex flex-wrap">
            {propertyTypes.map((type) => (
              <Button
                key={type}
                variant={selectedPropertyType.includes(type) ? "primary" : "outline-primary"}
                className="m-2"
                onClick={() =>handlePropertyTypeSelect(type)}>
                {type}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

    <Row className="my-6">
     <Col> <h4>Address Details</h4>
     <Form>
     <Form.Group controlId="address">
      <Form.Label>Address</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter address"
          size= "lg"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="test"
          /></Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
                /></Form.Group>

             <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}>
                  <option value="">Select State</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}> {state}</option>))}
                </Form.Control>
              </Form.Group>

             <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                /></Form.Group>
              
              <Form.Group controlId="unitNumber">
                  <Form.Label>Unit Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter unit number"
                    name="unitNumber"
                    value={formData.unitNumber}
                    onChange={handleInputChange}
                  /></Form.Group>
                
                <Form.Group controlId="sqFt" className="mt-3">
                <Form.Label>Sq.Ft</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Sq Ft"
                  name="sqFt"
                  value={formData.sqFt}
                  onChange={handleInputChange}
                /></Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <div className="button-container">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};

export default PropertyPage;