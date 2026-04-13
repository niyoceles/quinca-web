const themeConfig = {
  palette: {
    primary: {
      light: '#6366f1', // Indigo 500
      main: '#4f46e5',  // Indigo 600
      dark: '#4338ca',  // Indigo 700
      contrastText: '#fff'
    },
    secondary: {
      light: '#10b981', // Emerald 500
      main: '#059669',  // Emerald 600
      dark: '#047857',  // Emerald 700
      contrastText: '#fff'
    },
    background: {
      default: '#f8fafc', // Slate 50
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Slate 800
      secondary: '#64748b', // Slate 500
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
        padding: '8px 20px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
      containedPrimary: {
        boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
      },
    },
    MuiCard: {
      root: {
        borderRadius: 16,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: 'translateY(-4px)',
        },
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      rounded: {
        borderRadius: 16,
      },
    },
  },
  // Keep legacy properties for backward compatibility if needed by the app logic
  spreadAuth: {
    form: { textAlign: 'center' },
    image: { margin: '5px auto 5px auto', width: '100px' },
    pageTitle: { margin: '5px auto 5px auto' },
    textField: { margin: '10px auto 10px auto' },
    button: { marginTop: 20, position: 'relative' },
    customError: { color: 'red', fontSize: '0.9rem', marginTop: 10 },
    progress: { position: 'absolute' }
  },
};

export default themeConfig;