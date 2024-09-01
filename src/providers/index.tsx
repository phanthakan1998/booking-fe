import React from "react";
import ThemeProvider from "./ThemeProvider";
import LayoutProvider from "./LayoutProvider";
import AuthProvider from "./AuthProvider";

export type AppProvidersProps = {
  children?: React.ReactElement;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
