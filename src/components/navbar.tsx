"use client";

import Image from "next/image";
import Link from "next/link";
import { auth } from "@/config/firebase-config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";

const NavigationBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const publicRoutes = [{ name: "About", href: "/" }];
  const protectedRoutes = [
    { name: "Sign In", href: "/signin" },
    { name: "Get Started", href: "/signup" },
  ];
  const privateRoutes = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex justify-evenly bg-opacity-0 items-center p-4">
      {/* Replace LOGO with favicon or logo */}
      <Link href="/">
        <Image
          src="/favicon.ico"   // or "/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="cursor-pointer"
        />
      </Link>

      <ul className="flex flex-row gap-6">
        {publicRoutes.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}

        {!user &&
          protectedRoutes.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}

        {user &&
          privateRoutes.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}

        {user && (
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
