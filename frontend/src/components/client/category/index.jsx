import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { colors, dummyCategories } from "../../../services";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Scrollbars } from "react-custom-scrollbars";
import CategoryTile from "../category-tile";
import { useNavigate } from "react-router-dom";

const Categories = ({ categoryList }) => {
  const listRef = useRef(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered categories based on search term
  const filteredCategories = useMemo(() => {
    return categoryList.filter((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categoryList]);

  // Smooth scrolling for custom scrollbar
  const smoothScroll = (target, distance, duration = 200) => {
    const start = target.getScrollTop();
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      target.scrollTop(start + distance * progress);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const scrollUp = () => listRef.current && smoothScroll(listRef.current, -40);
  const scrollDown = () => listRef.current && smoothScroll(listRef.current, 40);

  const handleCategories = () => {
    navigate("/categories");
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 4, md: 10 },
        py: { xs: 5, sm: 7, md: 10 },
        gap: { xs: 3, md: 5 },
        backgroundColor: colors.white,
      }}
    >
      {/* --- Title --- */}
      <Typography
        sx={{
          fontFamily: "playfairDisplay",
          fontSize: { xs: "32px", sm: "48px", md: "64px" },
          textAlign: "center",
          color: colors.textColor_7,
        }}
      >
        Explore by Category
      </Typography>

      {/* --- Layout Wrapper --- */}
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          gap: { xs: 4, md: 6 },
          backgroundColor: colors.white,
        }}
      >
        {/* --- Left Column (Sidebar) --- */}
        <Box
          component="div"
          sx={{
            width: { xs: "100%", sm: "260px", md: "220px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
            gap: 4,
          }}
        >
          {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);

              // Update the DOM URL dynamically
              if (value) {
                window.history.replaceState(null, '', `/categorie/search?q=${encodeURIComponent(value)}`);
              } else {
                window.history.replaceState(null, '', `/`);
              }
            }}
            sx={{
              background: colors.inputBgColor_1,
              borderRadius: "8px",
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "transparent" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.iconColor_13 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Scrollable Category List */}
          <Box sx={{ width: "100%", px: 1 }}>
            <Scrollbars
              autoHeight
              ref={listRef}
              autoHeightMax={isMobile ? 200 : 300}
              thumbSize={50} thumbMinSize={50}
              renderView={(props) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    overflowX: "hidden",
                    overflowY: "auto",
                  }}
                />
              )}
              renderTrackVertical={(props) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    right: 2,
                    bottom: 2,
                    top: 2,
                    width: "3px",
                    // backgroundColor: colors.grayDark_1,
                  }}
                />
              )}
              renderThumbVertical={(props) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    backgroundColor: colors.grayDark_1,
                    borderRadius: "10px",
                  }}
                />
              )}
              style={{ width: '100%', borderColor: 'black', borderLeftColor: 'black' }}
            >
              <List>
                {filteredCategories.map((item, index) => (
                  <ListItem
                    key={index}
                    button
                    sx={{
                      width: "100%",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontFamily: "roboto-regular",
                        fontSize: { xs: "14px", sm: "16px" },
                        color: colors.textColor_8,
                      }}
                    >
                      {item}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Scrollbars>
          </Box>

          {/* Buttons Section */}
          {
            filteredCategories && filteredCategories.length > 10 ? (
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleCategories}
                  sx={{
                    flex: 1,
                    backgroundColor: colors.buttonColor_1,
                    color: colors.textColor_5,
                    fontFamily: "openSans-bold",
                    textTransform: "none",
                    fontSize: { xs: "12px", sm: "14px" },
                    "&:hover": { backgroundColor: colors.greenDark_2 },
                  }}
                >
                  All Categories
                </Button>

                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 0.5,
                    ml: 1,
                  }}
                >
                  <IconButton
                    onClick={scrollUp}
                    size="small"
                    sx={{
                      backgroundColor: colors.iconBgColor_5,
                      "&:hover": { backgroundColor: colors.grayLight_1 },
                    }}
                  >
                    <ArrowUpwardIcon
                      sx={{ fontSize: 14, color: colors.iconColor_14 }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={scrollDown}
                    size="small"
                    sx={{
                      backgroundColor: colors.iconBgColor_6,
                      "&:hover": { backgroundColor: colors.grayLight_1 },
                    }}
                  >
                    <ArrowDownwardIcon
                      sx={{ fontSize: 14, color: colors.iconColor_14 }}
                    />
                  </IconButton>
                </Box>
              </Box>
            ) : null
          }

        </Box>

        {/* --- Right Column (Tiles) --- */}
        <Box
          component="div"
          sx={{
            width: "100%",
            maxWidth: "850px",
            p: { xs: 1, sm: 2 },
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            justifyContent="center"
            flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
            alignItems="stretch"
          >
            {filteredCategories.slice(0, 6).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CategoryTile category={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Categories;
