"use client";
import React, { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  isExpanded?: boolean;
  isMobileOpen: boolean;
  isHovered?: boolean;
  setIsHovered?: (v: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isExpanded] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen((s) => !s);
  const toggleMobileSidebar = () => setIsMobileOpen((s) => !s);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isExpanded,
        isMobileOpen,
        isHovered,
        setIsHovered,
        toggleSidebar,
        toggleMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export default SidebarProvider;
