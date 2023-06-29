import "./globals.css";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import ToasterProvider from "./providers/ToasterProvider";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: "airbnb",
  description: "Airbnb Clone",
};

const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <RentModal />
        <LoginModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
