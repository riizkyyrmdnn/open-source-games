import { useState } from 'react';

const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const openConfirm = (confirmAction) => {
    setOnConfirm(() => confirmAction);
    setIsOpen(true);
  };

  const closeConfirm = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    closeConfirm();
  };

  return { isOpen, openConfirm, closeConfirm, handleConfirm };
};

export default useConfirm;
