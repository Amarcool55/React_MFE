import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, StrictMode } from 'react';
import { Container, Row, Col, Form, Button, Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const InsuranceDetails = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [premium, setPremium] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [worker, setWorker] = useState(null);
  const [ppButtonHidden, setppButtonHidden] = useState(true);

  
	const myWorker = function createWorker(workerUrl) 
	{
		workerUrl.pathname = '/dummyWebWorker.js'
		var workr = null;
		var blob;
		blob = new Blob(["importScripts('" + workerUrl + "');"], { "type": 'application/javascript' });
		var url = window.URL || window.webkitURL;
		var blobUrl = url.createObjectURL(blob);
		workr = new Worker(blobUrl);
		return workr;
	};
  
  
  useEffect(() => {
    // Simulating web worker
    const webWorker = new myWorker(new URL('./dummyWebWorker.js', import.meta.url));

    webWorker.onmessage = (event) => {
      const { type, data } = event.data;

      if (type === 'accountDetails') {
        setAccountDetails(data);
		setIsLoading(false);
      } else if (type === 'premiumCalculation') {
        setPremium(data);
		localStorage.setItem('PremiumPaymentAmount', JSON.stringify(data));
		setppButtonHidden(false);
        setIsLoading(false);
      }
    };
  // Save the worker instance to state
    setWorker(webWorker);
    // Cleanup on component unmount
    return () => {
      webWorker.terminate();
    };
  }, []);

  const fetchAccountDetails = () => {
    setIsLoading(true);
    // Simulating fetching account details
    postMessageToWebWorker({ type: 'fetchAccountDetails' });
  };

  const calculatePremium = () => {
    setIsLoading(true);
    // Simulating premium calculation
    postMessageToWebWorker({ type: 'calculatePremium', accountDetails });
  };

  const postMessageToWebWorker = (message) => {
    worker.postMessage(message);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h5">Insurance Details</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formAccountDetails">
                  <Form.Label className="m-3">Account Details</Form.Label>
                  <Button
                    variant="primary"
                    onClick={fetchAccountDetails}
                    disabled={isLoading}
                  >
                    Fetch Account Details
                  </Button>
				  <br />
                  {accountDetails && (
                    <Form.Text className="text-muted">
                      <strong>First Name:</strong> {accountDetails.firstName} <br />
                      <strong>Last Name:</strong> {accountDetails.lastName} <br />
                      <strong>Age:</strong> {accountDetails.age} <br />
                      <strong>Policy Type:</strong> {accountDetails.policyType}
                    </Form.Text>
                  )}
                </Form.Group>
				<br />
                <Form.Group controlId="formPremiumCalculation">
                  <Form.Label className="m-3">Premium Calculation</Form.Label>
                  <Button
                    variant="primary"
                    onClick={calculatePremium}
                    disabled={isLoading}
                  >
                    Calculate Premium
                  </Button>
				  <br />
                  {premium !== null && (
                    <Form.Text className="text-muted">
                      <strong>Premium:</strong> ${premium}
                    </Form.Text>
                  )}
					<br />				  
				  <Button variant="primary" href="/Payment" hidden={ppButtonHidden}>Pay Preimum</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InsuranceDetails;