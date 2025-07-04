"use client";
import React, { createContext, useContext, useState } from "react";

interface BannerContextType {
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <BannerContext.Provider value={{ showBanner, setShowBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export function useBanner() {
  const context = useContext(BannerContext);
  if (!context) throw new Error("useBanner must be used within a BannerProvider");
  return context;
} 