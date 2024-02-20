import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";
import ClientContext from "@/components/ClientContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-memos",
  description: "memos build with nextjs prisma mongodb",
};

const RootLayout: React.ComponentType<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>
      <ClientContext>
        {children}
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;
