import React from "react";
import MenuComponent from "../components/layout/Menu";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  return <MenuComponent>{children}</MenuComponent>;
}

export default LayoutProvider;
