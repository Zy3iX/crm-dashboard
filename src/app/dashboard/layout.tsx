"use client";

import { AppHeader } from "@/components/app-header/app-header";
import AppSidebar from "@/components/app-sidebar/app-sidebar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { capitalize } from "../../utils/capitalize";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle: string =
    pathname.split("/").filter(Boolean).pop() ?? "Document";
  const capitalizedPagetitle = capitalize(pageTitle);

  return (
    <section className="dashboard-layout">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex min-h-screen w-full flex-col">
          <AppHeader pageTitle={capitalizedPagetitle} />
          <main className="flex-1 overflow-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </section>
  );
}
