import { useState } from 'react';

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    error: false,
    text: '',
  });

  const toggleSnackbar = (text, error) => {
    setSnackbar(prevState => ({
      open: !prevState.open,
      error: error,
      text: error ? `Error: ${text}` : `Success: ${text}`,
    }));
  };

  return [snackbar, toggleSnackbar];
};

export default useSnackbar;
