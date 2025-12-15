function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

function stringAvatar(name) {
  const words = name.split(' ');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: words.length > 1
      ? `${words[0][0]}${words[1][0]}`
      : words[0][0], // fallback to single letter
  };
}

function hexToRGBA(hex, alpha = 0.6) {
  let r = 0, g = 0, b = 0;

  // Remove #
  hex = hex.replace('#', '');

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  return `rgba(${r},${g},${b},${alpha})`;
};

function formatDate(dateString) {
  if (!dateString) return ""; // handle null/undefined
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

function formatPakistaniPhone (phone) {
    if (!phone) return '';

    // Remove all non-digit characters
    let digits = phone.replace(/\D/g, '');

    // Remove leading 0
    if (digits.startsWith('0')) {
        digits = digits.slice(1);
    }

    // Remove country code if already present
    if (digits.startsWith('92')) {
        digits = digits.slice(2);
    }

    // Must be 10 digits after cleaning (3XXXXXXXXX)
    if (digits.length !== 10) return phone;

    return `+92 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
};


export { stringToColor, stringAvatar, hexToRGBA, formatPakistaniPhone, formatDate };