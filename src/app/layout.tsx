import './globals.css';
import NavigationBar from '../components/nav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0}}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}

