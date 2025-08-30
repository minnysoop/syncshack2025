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
      <body className="flex min-h-screen bg-white text-black">
        {/* Sidebar */}
        <NavigationBar />

        {/* Page content */}
        <main className="flex-1 p-8 ml-48">
          {children}
        </main>
      </body>
    </html>
  );
}
