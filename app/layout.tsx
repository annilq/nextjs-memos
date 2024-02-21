import type { Metadata } from "next";
import React, { PropsWithChildren } from "react";
import ClientContext from "@/components/ClientContext";
import Layout from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-memos",
  description: "memos build with nextjs prisma mongodb",
};

const RootLayout: React.ComponentType<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className="h-full bg-zinc-100 dark:bg-zinc-900">
      <ClientContext>
        <Layout>
          {children}
        </Layout>
      </ClientContext>
    </body>
  </html>
);
export default RootLayout;
