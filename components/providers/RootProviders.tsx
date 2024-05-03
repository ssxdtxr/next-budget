"use client";
import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";

const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default RootProviders;
