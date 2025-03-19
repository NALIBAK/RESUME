// EmailJS configuration

const PUBLIC_KEY = "BUOFGzvNKnLPTumNy";
const TEMPLATE_ID = "template_odx4smm";
const SERVICE_ID = "service_f6rkp8o";
// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// Function to send email
const sendEmail = (formData) => {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: formData.get('fullname'),
    from_email: formData.get('email'),
    message: formData.get('message'),
    to_email: 'sskabilan@proton.me'
  });
};

export { sendEmail };