import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, StrictMode } from 'react';
import { Container, Row, Col, Form, Button, Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import InsuranceDetails from "./insuranceDetails"

const container = document.getElementById('app');
const root = createRoot(container);
root.render( <StrictMode>
    <BrowserRouter basename="/insurance-details">
        <InsuranceDetails />
    </BrowserRouter>
  </StrictMode>);