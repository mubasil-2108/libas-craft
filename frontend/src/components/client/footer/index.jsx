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
import React, { useEffect, useMemo } from "react";
import { clientBar, colors, legalSupport, selectSocialLinks } from "../../../services";
import NewsLetter from "../news-letter";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/slices/productSlice";

const Footer = ({ data }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoading, products } = useSelector((state) => state.product);
  const socialMediaLinks = useSelector(selectSocialLinks);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    if (!products?.length) return [];

    return [
      ...new Set(
        products
          .map(p => p.category?.trim())
          .filter(Boolean)
      ),
    ];
  }, [products]);
  console.log(data, "data in footer");
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
        <Box sx={{ flex: 1, mr: { xs: 0, sm: 0, md: 5 } }}>
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
            Our premium products are carefully crafted using high-quality, natural ingredients to deliver reliable performance, everyday care, and long-lasting value. We focus on quality, safety, and effectiveness to meet modern lifestyle needs with trusted solutions you can rely on.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 3, flexWrap: isMobile ? "wrap" : "nowrap", flexGrow: 1, }}>
          {/* Footer Columns */}

          {[
            {
              title: "Quick Links",
              links: clientBar.map((link) => ({
                text: link.name,
                href: link.link,
              })),
            },
            {
              title: "Catalog",
              links: categories.map((c) => ({ text: c, href: `/categories/${c.toLowerCase().replace(/\s+/g, "-")}` })),
            },
            {
              title: "Legal Stuff",
              links: legalSupport.map((link) => ({ text: link.name, href: link.href })),
            },
          ].map((section, idx) => (
            <Box key={idx} sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 1.5,
                  alignSelf: "flex-start",
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
          <Box sx={{ flex: 1, maxWidth: 300 }}>
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
              Email: <a href={`mailto:${data?.site?.email}`} style={{textDecoration: 'none', color: colors.textColor_5 }}>{data?.site?.email}</a>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Phone: <a href={`tel:${data?.site?.phone}`} style={{textDecoration: 'none', color: colors.textColor_5 }}>{data?.site?.phone}</a>
            </Typography>

            {/* Social Media */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
              {socialMediaLinks.map((item) => (
                <IconButton
                  key={item.id}
                  onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
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
        © {new Date().getFullYear()} <b>{data?.site?.name}</b>. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
