import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, StrictMode  } from 'react';
import { Container, Row, Col, Form, Button, Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [totalPremium, setTotalPremium] = useState(1000); // Example initial premium
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Add your payment processing logic here
    setIsLoading(true);
    // Simulating a delay before resetting the loading state
    setTimeout(() => {
      setIsLoading(false);
      // Reset form fields after payment processing (simulated)
      setCardNumber('');
      setExpirationDate('');
      setCvv('');
    }, 2000);
  };
  
  useEffect(() => {
	  debugger;
	  if (localStorage.getItem('PremiumPaymentAmount') != null)
	  {
		 var ppa = JSON.parse(localStorage.getItem('PremiumPaymentAmount'));
		 setTotalPremium(ppa);
	  }
	  
	    }, []);

  return (
     <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h5">Premium Payment</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formCardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formExpirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formTotalPremium">
                  <Form.Label>Total Premium to be Paid</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={`$${totalPremium}`}
                  />
                </Form.Group>
				< br />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handlePaymentSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Make Payment'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;