import "./globals.css";
import MainHeader from "./components/header";
import { Footer } from "./components/footer";
import { RentalDataProvider } from "./context/RentalDataContext"; // Import the context provider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RentalDataProvider>
          <MainHeader />
          {children}
          <Footer />
        </RentalDataProvider>
      </body>
    </html>
  );
}
