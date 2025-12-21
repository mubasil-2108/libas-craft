import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../../services";

const Note = () => {
    return (
        <Box component='div' sx={{
            backgroundColor: colors.white,
        }}>
            <Box
                sx={{
                    backgroundColor: colors.white,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    py: 0.5,
                    position: "relative",
                    // Fade effect on left and right edges
                    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
            >
                <Box
                    sx={{
                        display: "inline-block",
                        animation: "slideText 30s linear infinite",
                        width: "100%",
                        
                    }}
                >
                    <Typography sx={{
                        fontFamily: "NotoNastaliqUrdu-Medium",
                        fontSize: { xs: "12px", md: "14px" },
                        // lineHeight: 2,
                        height:'30px',
                        wordSpacing: '10px',
                        display: "inline-block",
                        // Gradient text
                            background: `linear-gradient(90deg, ${colors.textColor_7}, ${colors.textColor_10})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        mx: 2
                    }}>
                        پیراگراف ۔ ورڈ پروسیسنگ میں ڈاکیومنٹ کا کوئی ایسا حصہ جس سے قبل پیراگراف کی علامت آتی ہے اور اس کا اختتام ایک دوسری علامت ہوتا ہے ۔
                    </Typography>
                </Box>

                {/* Keyframes */}
                <style>
                    {`
          @keyframes slideText {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
                </style>
            </Box>
        </Box>
    );
};

export default Note;
