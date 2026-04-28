import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "SCMS – Smart Campus Management System",
  description: "Manage courses, assignments, and campus activities in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
