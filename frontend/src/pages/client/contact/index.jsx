import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import { colors } from '../../../services';
import axios from 'axios';


const baseUrl = import.meta.env.REACT_APP_BASE_URL || "http://localhost:5000";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/api/contact`, formData);
      const { whatsappLink } = res.data;

      // Open WhatsApp in new tab
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');

      // Clear form after submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      alert(
        error?.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.grayLight_3,
        px: { xs: 2, sm: 4, md: 10 },
        py: { xs: 4, sm: 6, md: 10 },
      }}
    >
      {/* Page Title */}
      <Typography
        sx={{
          fontFamily: 'playfairDisplay',
          fontSize: { xs: '24px', sm: '32px', md: '48px' },
          color: colors.textColor_3,
          textAlign: { xs: 'center', sm: 'left' },
          mb: { xs: 2, sm: 4 },
        }}
      >
        Contact Us
      </Typography>

      <Container maxWidth="md">
        {/* Description */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 4, opacity: 0.7 }}
        >
          Have a question or need assistance? Fill out the form and your message
          will be sent directly to our WhatsApp for a quick response.
        </Typography>

        {/* Contact Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            background: '#fff',
            p: 4,
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
          />

          <Button
            type="submit"
            size="large"
            disabled={loading}
            sx={{
              mt: 1,
              backgroundColor: colors.buttonColor_1,
              color: '#fff',
              fontFamily: 'openSans-bold',
              ':hover': {
                backgroundColor: colors.greenDark_1,
              },
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
