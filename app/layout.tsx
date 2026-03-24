import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-dm-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Offres d'emploi",
    description: "Découvrez nos dernières opportunités de carrière",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
        </body>
        </html>
    );
}