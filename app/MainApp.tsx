"use client";

import React from "react";
import ClientLayout from "./ClientLayout";
import { LoadingProvider } from "./context/LoadingContext";

const MainApp = ({ children }: { children: React.ReactNode }) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default MainApp;
