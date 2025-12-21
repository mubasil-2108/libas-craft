import React from "react";
import { Box, Typography } from "@mui/material";
import { colors, ingredients } from "../../../services";

const IngredientCardSlider = () => {
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
                Ingredient Highlights
            </Typography>
            <Box
                sx={{
                    "--width": "200px",
                    "--height": "200px",
                    "--quantity": ingredients.length,
                    width: "100%",
                    height: "var(--height)",
                    overflow: "hidden",
                    position: "relative",
                    maskImage:
                        "linear-gradient(to right, transparent, #000 10% 90%, transparent)",

                    "&:hover .item": {
                        animationPlayState: "paused",
                        filter: "grayscale(1)",
                    },

                    "& .item:hover": {
                        filter: "grayscale(0)",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        minWidth: "calc(var(--width) * var(--quantity))",
                        height: "100%",
                    }}
                >
                    {ingredients.map((ingredient, index) => (
                        <Box
                            key={ingredient.id}
                            className="item"
                            sx={{
                                "--position": index + 1,
                                position: "absolute",
                                width: "var(--width)",
                                height: "var(--height)",
                                left: "100%",
                                animation: "autoRun 45s linear infinite",
                                animationDelay: `calc(
                                (45s / var(--quantity)) * (${index + 1} - 1) - 45s
                                    )`,
                                transition: "filter 0.4s",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    overflow: "hidden",
                                    borderRadius: "50px",
                                }}
                            >
                                {/* Image */}
                                <Box
                                    component="img"
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />

                                {/* Overlay Text */}
                                <Typography
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        fontFamily: "NotoNastaliqUrdu-Bold",
                                        fontSize: { xs: "14px", md: "18px" },
                                        color: colors.textColor_5,
                                        backgroundColor: "rgba(0,0,0,0.4)",
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: "20px",
                                        whiteSpace: "nowrap",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {ingredient.name}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Keyframes */}
                <style>
                    {`
          @keyframes autoRun {
            from { left: 100%; }
            to { left: calc(var(--width) * -1); }
          }
        `}
                </style>
            </Box>
        </Box>
    );
};

export default IngredientCardSlider;
