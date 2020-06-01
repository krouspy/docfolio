import { useState } from 'react';

const useDialog = () => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return [open, toggleDialog];
};

export default useDialog;
