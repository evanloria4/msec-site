const { Router } = require('express');

// Create a router for contact-related routes
export const contactRouter = Router();

// For POST reqs to '/api/contact', handle contact form submissions
contactRouter.post('/', (req, res) => {
    // Extract form data from the request body
    const { name, phone, email, service, message } = req.body;
});

module.exports = {
  contactRouter,
};