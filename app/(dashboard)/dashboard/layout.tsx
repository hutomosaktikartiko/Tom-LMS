import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/providers/SidebarProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="h-full">{children}</div>
        </SidebarProvider>
      </ThemeProvider>

      <SanityLive />
    </ClerkProvider>
  );
}
