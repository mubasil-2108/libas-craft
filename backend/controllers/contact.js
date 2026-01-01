/**
 * @desc    Send Contact Us message to WhatsApp
 * @route   POST /api/contact
 * @access  Public
 */
const sendContactToWhatsapp = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // WhatsApp number of admin (in international format without +)
    const whatsappNumber = process.env.WHATSAPP_NUMBER // replace with your number

    // Prepare message text
    const text = `New Contact Us Message:%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    // Generate WhatsApp API link
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${text}`;

    // Respond with the WhatsApp link
    return res.status(200).json({
      message: 'Message ready to be sent to WhatsApp',
      whatsappLink,
    });
  } catch (error) {
    console.error('WhatsApp message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { sendContactToWhatsapp };
