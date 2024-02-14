import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Welcome to InsuranceApp!</Card.Title>
          <Card.Text>
            Your trusted partner for all your insurance needs. We provide
            personalized solutions to ensure your peace of mind.
          </Card.Text>
          <Button variant="primary" href="/insurance-details">
            Get Details for existing policy
          </Button>
		  <br />		  <br />

		  
		  <Button variant="primary" href="/Payment">
            Preminum Payment
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;