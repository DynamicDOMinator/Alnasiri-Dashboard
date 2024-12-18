import Sidebar from "./components/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Alnsiri-Dashboard",
  description: "Alnsiri-Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body dir="rtl" className="bg-slate-200 font-['IBM_Plex_Sans_Arabic']">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
