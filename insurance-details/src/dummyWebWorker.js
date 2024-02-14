// dummyWebWorker.js

// Function to simulate fetching account details
const fetchAccountDetails = () => {
  // Simulating a delay of 2 seconds
  setTimeout(() => {
    const accountDetails = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      policyType: 'Auto',
    };
    postMessage({ type: 'accountDetails', data: accountDetails });
  }, 2000);
};

// Function to simulate premium calculation
const calculatePremium = (accountDetails) => {
  // Simulating a delay of 1.5 seconds
  setTimeout(() => {
    // Dummy premium calculation based on random factors
    const premium = Math.floor(Math.random() * 1000) + 500;
    postMessage({ type: 'premiumCalculation', data: premium });
  }, 1500);
};

// Event listener for messages from the main thread
onmessage = (event) => {
  const { type, accountDetails } = event.data;
  if (type === 'fetchAccountDetails') {
    fetchAccountDetails();
  } else if (type === 'calculatePremium') {
    calculatePremium(accountDetails);
  }
};
