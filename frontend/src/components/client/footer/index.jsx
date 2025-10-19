import {
  Box,
  Typography,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
  Divider,
  Icon,
} from "@mui/material";
import React from "react";
import { colors, socialMediaLinks } from "../../../services";
import NewsLetter from "../news-letter";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.bgColor_2,
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Newsletter Section */}
      <NewsLetter />

      {/* Footer Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          px: { xs: 3, sm: 6, md: 8 },
          py: 8,
          gap: isMobile ? 5 : 0,
        }}
      >
        {/* Company Info */}
        <Box sx={{ flex: 1, mr:{xs:0,sm:0,md:5} }}>
          <Box
            component="img"
            src="/logo-1.png"
            alt="Company Logo"
            sx={{
              objectFit: "contain",
              width: 160,
              cursor: "pointer",
              mb: 2,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              minWidth: 320,
              lineHeight: 1.6,
              opacity: 0.8,
              fontSize: isMobile ? "13px" : "15px",
              fontFamily: "roboto-regular",
            }}
          >
            Our natural hair care products are carefully crafted with premium
            botanical ingredients to nourish your scalp, strengthen roots, and
            repair damaged hair — giving you healthy, shiny, and beautiful hair
            every day.
          </Typography>
        </Box>

        {/* Footer Columns */}
        {[
          {
            title: "Quick Links",
            links: [
              { text: "Home", href: "/" },
              { text: "About Us", href: "/about" },
              { text: "Services", href: "/services" },
              { text: "Contact", href: "/contact" },
            ],
          },
          {
            title: "Catalog",
            links: [
              { text: "Hair Oils", href: "/catalog/hair-oils" },
              { text: "Shampoos", href: "/catalog/shampoos" },
              { text: "Hair Masks", href: "/catalog/masks" },
              { text: "Conditioners", href: "/catalog/conditioners" },
            ],
          },
          {
            title: "Legal Stuff",
            links: [
              { text: "Privacy Policy", href: "/privacy" },
              { text: "Terms of Service", href: "/terms" },
              { text: "Refund Policy", href: "/refund" },
              { text: "Shipping Info", href: "/shipping" },
            ],
          },
        ].map((section, idx) => (
          <Box key={idx} sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1.5,
                fontFamily: "openSans-bold",
                fontSize: isMobile ? "16px" : "18px",
              }}
            >
              {section.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              {section.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  color="#fff"
                  sx={{
                    fontFamily: "openSans-regular",
                    fontSize: isMobile ? "13px" : "15px",
                    opacity: 0.8,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: colors.textColor_5,
                      opacity: 1,
                      pl: 1,
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Box>
        ))}

        {/* Contact & Socials */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontFamily: "openSans-bold",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            Contact
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Email: info@medicare.com
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Phone: +92 300 1234567
          </Typography>

          {/* Social Media */}
          <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
            {socialMediaLinks.map((item) => (
              <IconButton
                key={item.id}
                href={item.link}
                color="inherit"
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: colors.greenDark_1,
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Icon
                  component={item.icon}
                  sx={{
                    fontSize: "20px",
                  }}
                />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

      {/* Bottom Bar */}
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          fontSize: 14,
          opacity: 0.8,
          fontFamily: "openSans-regular",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        © {new Date().getFullYear()} <b>Bin Syed Organic</b>. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
