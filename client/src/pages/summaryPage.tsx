import { useNavigate } from 'react-router-dom'; 
import { Container, Col, Card, Table } from "react-bootstrap";

const SummaryPage = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

    const handlePrevious = () => {
      navigate('/personalInformation'); 
    };

    const handleSubmit = () => {
      navigate('/'); 
    };
    const details = [
      { label: "Service Type", value: "Walk & Talk" },
      { label: "Additional Service", value: "Blue Tape" },
      { label: "Dwelling Type", value: "Condo" },
      { label: "Address", value: "101 Project2 Road, Washington DC, 10000" },
      { label: "Square Footage", value: "1000 sqft" },
    ];

    const totalFee = '500'
    
    const priceDetails = '500'
  return (
    <>
      <Container className="summary-container">
        <Col>
        <h1>Almost Done! 🚀</h1>
        <p>Confirm your deal details information and submit to create it.</p>
        <br />
        <Table responsive bordered hover className="mt-4">
        <thead className="bg-light">
          <tr>
            <th>Detail</th>
            
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail, index) => (
            <tr key={index}>
              <td>{detail.label}</td>
              <p> : </p>
              <td>{detail.value}</td>
            </tr>))}
        </tbody>
      </Table>
       <Col md={4}>
          <Card.Body>
              <h1>Your total fee is:</h1>
              <h2 className="text-primary">${totalFee}</h2>
              <hr />
              <h5>Price Details</h5>
              <Table borderless size="sm">
                <tbody>
                <td className="text-end">${priceDetails}</td>
                </tbody>
              </Table>
            </Card.Body>
      </Col>
        </Col>
      </Container>

      <div className="button-container">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default SummaryPage;