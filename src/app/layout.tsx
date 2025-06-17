import "@/styles/globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Nextprozess",
  description: "Modernes Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
  <body className="bg-background text-foreground">
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>
  );
}