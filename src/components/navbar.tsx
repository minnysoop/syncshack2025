"use client";

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

  const publicRoutes = [
    { name: "About", href: "/" },
  ]

  const protectedRoutes = [
    { name: "Sign In", href: "/signin" },
    { name: "Get Started", href: "/signup" },
  ];

  const privateRoutes = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" }
  ]

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex border justify-evenly bg-opacity-0">
      <span>LOGO</span>

      <ul className="flex flex-row gap-6">
        {publicRoutes.map((item) => (
          <li key={item.href}>
            <span></span>
            <span>
              <Link
                href={item.href}
              >
                {item.name}
              </Link>
            </span>
          </li>
        ))}

        
        {!user && (protectedRoutes.map((item) => (
            <li key={item.href}>
              <span></span>
              <span>
                <Link
                  href={item.href}
                >
                  {item.name}
                </Link>
              </span>
            </li>
        )))}

      {user && (privateRoutes.map((item) => (
            <li key={item.href}>
              <span></span>
              <span>
                <Link
                  href={item.href}
                >
                  {item.name}
                </Link>
              </span>
            </li>
        )))}

        {user && (
          <>
            <li>
              <span>
                <button
                onClick={handleSignOut}
              >
                Sign Out
              </button>
              </span>
            </li>
          </>
        )}
      </ul>

    </nav>
  );
};

export default NavigationBar;
