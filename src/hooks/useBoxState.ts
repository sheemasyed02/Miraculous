import { useState } from 'react';

export const useBoxState = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedMiraculous, setSelectedMiraculous] = useState<string | null>(null);

  const openBox = () => {
    setIsBoxOpen(true);
  };

  const closeBox = () => {
    setIsBoxOpen(false);
    setSelectedMiraculous(null);
  };

  const selectMiraculous = (miraculousId: string) => {
    setSelectedMiraculous(miraculousId);
  };

  return {
    isBoxOpen,
    selectedMiraculous,
    openBox,
    closeBox,
    selectMiraculous
  };
};
