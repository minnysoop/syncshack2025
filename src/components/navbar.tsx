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
    { name: "About", href: "/about" },
    { name: "Browse", href: "/browse" },
    { name: "Become Hub", href: "/becomehub" },
    { name: "Sign In", href: "/signin" },
  ];

  const protectedRoutes = [
    { name: "Dashboard", href: "/dashboard" }
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
    <nav className="fixed left-0 top-0 h-full w-16 hover:w-48 bg-[#f5f5f5]/80 shadow-md flex flex-col justify-start items-center transition-all duration-300 overflow-hidden group">

      <div className="h-20"></div>

      <ul className="flex flex-col gap-6 w-full">

          {publicRoutes.map((item) => (
          <li key={item.href} className="flex items-center justify-center w-full">
            <span className="w-6 h-6 bg-gray-400 rounded-full flex-shrink-0"></span>
            <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={item.href}
                className="block py-3 rounded-md hover:bg-gray-200/60 transition w-full text-center"
              >
                {item.name}
              </Link>
            </span>
          </li>
        ))}

        {user && (
          <>
            {protectedRoutes.map((item) => (
              <li key={item.href} className="flex items-center justify-center w-full">
                <span className="w-6 h-6 bg-gray-400 rounded-full flex-shrink-0"></span>
                <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={item.href}
                    className="block py-3 rounded-md hover:bg-gray-200/60 transition w-full text-center"
                  >
                    {item.name}
                  </Link>
                </span>
              </li>
            ))}

            <li className="flex items-center justify-center w-full">
              <button
                onClick={handleSignOut}
                className="ml-4 py-3 w-full text-center rounded-md hover:bg-red-600 text-white transition-opacity duration-300"
              >
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
