import './globals.css';
import NavigationBar from './components/navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] min-h-screen">
        <NavigationBar />
        
        {children}
      </body>
    </html>
  );
}

