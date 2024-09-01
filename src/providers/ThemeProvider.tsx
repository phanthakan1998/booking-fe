import { ConfigProvider, ThemeConfig } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import React from "react";
import color from "../assets/color.json";
import { ThemeProvider } from "styled-components";
import { MEDIA_SCREEN } from "../assets/media-screen";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const themes: ThemeConfig = {
  token: {
    colorPrimary: color.primary,
    colorPrimaryActive: color.primary,
    colorPrimaryBorder: color.primary,
    colorPrimaryHover: color.primary,
    colorBgBase: color["gs-white"],
    colorBgContainer: color.container,
    fontFamily: "Sarabun, DM Sans, sans-serif",
    colorTextDisabled: color.middle,
    colorLink: color.primary,
    colorLinkActive: color.primary,
    colorLinkHover: color["primary-trans"],
    controlOutline: color.primary,
  },
};

function ThemeProviders({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider theme={{ colors: color, medias: MEDIA_SCREEN }}>
      <ConfigProvider theme={themes}>
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default ThemeProviders;
