import { Box, Chip, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../../services';

export const Inputs = ({ multiline, title, placeholder, value, onChange, style }) => {
    return (
        <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant='body1' color={colors.textColor_3} component='p' sx={{
                fontSize: '20px',
                fontWeight: 'bold'
            }}>{title}</Typography>
            <TextField variant='outlined' value={value} onChange={onChange} multiline={multiline} rows={multiline ? 7 : 1} placeholder={placeholder} size='small' sx={[{
                maxWidth: '500px',
                '& .MuiInputBase-input::placeholder': {
                    color: colors.placeholderColor_2,
                    opacity: 1
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.borderColor_4, // border color here
                },
            }, style]}
                InputProps={{
                    sx: {
                        borderRadius: '8px',
                    }
                }}
            />
        </Box>
    )
}

export const Tags = ({ title, placeholder, style, value, onChange}) => {
  const [input, setInput] = useState('');
  // const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim() !== '') {
      e.preventDefault();
      const newTag = input.trim();
      if (!value.includes(newTag)) {
        onChange([...value, newTag]);
      }
      setInput('');
    }
  };

  const handleDelete = (tagToDelete) => {
    onChange(value.filter(tag => tag !== tagToDelete));
  };

  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant='body1' component='p' sx={{
        fontSize: '20px',
        color: colors.textColor_3,
        fontWeight: 'bold'
      }}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          flexWrap: 'wrap',
          gap: 1,
          maxWidth: '500px',
          p: 1,
          border: `1px solid ${colors.borderColor_4}`,
          borderRadius: '8px',
          ...style,
        }}
      >
        {value?.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDelete(tag)}
            sx={{ backgroundColor: colors.bgColor_1, color: colors.grayLight_8 }}
          />
        ))}

        <TextField
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          multiline
          fullWidth
          rows={3}
          InputProps={{
            disableUnderline: true,
            sx: {
              flex: 1,
              minWidth: '120px',
              borderRadius: '8px',
            },
          }}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: colors.placeholderColor_2,
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

