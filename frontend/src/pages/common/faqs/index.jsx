import React from 'react'
import {
  Box,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { colors } from '../../../services'

const FAQs = () => {
  // 🔹 Reusable styles
  const titleStyle = {
    color: colors.textColor_10,
    fontSize: { xs: '24px', sm: '32px', md: '48px' },
    fontFamily: 'playfairDisplay',
    fontWeight: 700,
  }

  const questionStyle = {
    color: colors.textColor_10,
    fontSize: { xs: '16px', sm: '18px', md: '20px' },
    fontFamily: 'playfairDisplay',
    fontWeight: 600,
  }

  const answerStyle = {
    color: colors.textColor_4,
    fontSize: { xs: '14px', sm: '16px', md: '18px' },
    fontFamily: 'nunito-sans',
    lineHeight: 1.7,
  }

  const faqs = [
    {
      question: 'Are Bin Syed Organics products natural?',
      answer:
        'Yes, our products are made using organic, herbal, and chemical-free ingredients.',
    },
    {
      question: 'Do you deliver all over Pakistan?',
      answer: 'Yes, we offer nationwide delivery across Pakistan.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Orders are usually delivered within 3–5 working days.',
    },
    {
      question: 'Is Cash on Delivery available?',
      answer: 'Yes, Cash on Delivery (COD) is available all over Pakistan.',
    },
    {
      question: 'Are your products safe for all hair and skin types?',
      answer:
        'Yes, our products are dermatologically tested and suitable for most skin and hair types.',
    },
  ]

  return (
    <Box component='div' sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.white,
      px: { xs: 2, sm: 4, md: 10 },
      py: { xs: 2, sm: 4, md: 6 },
      // alignItems: 'center',
    }}>
      <Box
        sx={{
          maxWidth: '900px',
          backgroundColor: colors.white,
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
        }}
      >
        {/* Page Title */}
        <Typography gutterBottom sx={titleStyle}>
          Frequently Asked Questions (FAQs)
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* FAQ Accordions */}
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: 'transparent',
              borderBottom: `1px solid ${colors.textColor_3 || '#e0e0e0'}`,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: colors.textColor_10 }} />}
            >
              <Typography sx={questionStyle}>
                Q{index + 1}: {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={answerStyle}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

export default FAQs
