import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

const NavigationBar: React.FC = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/">About</Link>
        </NavigationMenuLink>

        <NavigationMenuLink asChild>
          <Link href="/signin">Sign In</Link>
        </NavigationMenuLink>

        <NavigationMenuLink asChild>
          <Link href="/logon">Log On</Link>
        </NavigationMenuLink>

        {/* / Protected Routes */}
        <NavigationMenuLink asChild>
          <Link href="/dashboard">Dashboard</Link>
        </NavigationMenuLink>

      </NavigationMenuItem>
    </NavigationMenu>
  );
};

export default NavigationBar;
