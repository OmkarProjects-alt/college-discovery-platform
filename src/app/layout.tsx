import CompareBar from "@/components/compare/CompareBar";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { CompareProvider } from "@/context/CompareContext";
import ErrorContextProvider from "@/context/ErrorAndSuccessMsgContext";
import MessageAlert from "@/components/MessageAlert";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-indigo-50/30 text-black">

        <AuthProvider>

          <ErrorContextProvider>

            <CompareProvider>

              <Navbar />

              <main>
                <MessageAlert />

                {children}

                <CompareBar />
              </main>

            </CompareProvider>

          </ErrorContextProvider>

        </AuthProvider>

      </body>
    </html>
  );
}