import React, { Suspense, useState, StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./Header";
import Home from "./Home";

const RemoteInsuranceDetailsApp = React.lazy(() => import("insurancedetails/InsuranceDetails"));
const RemotePaymentApp = React.lazy(() => import("payment/Payment"));

const App = () => {
  return <div>
  <Header />
  <Suspense>
      <Routes>
		<Route path="/" element={<Home />}/>	
		<Route path="/home" element={<Home />}/>
        <Route path="/insurance-details" element={<RemoteInsuranceDetailsApp />}/>
        <Route  path="/payment" element={<RemotePaymentApp />}/>
 </Routes>
 </Suspense>
 </div>
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>);