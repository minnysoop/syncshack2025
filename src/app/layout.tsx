// app/layout.tsx
import './globals.css';
import NavigationBar from '../components/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
