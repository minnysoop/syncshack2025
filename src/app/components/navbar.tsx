import React from "react";
import Link from "next/link";

const NavigationBar: React.FC = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#4CAF50", color: "white" }}>
      <div>Logo</div>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/browse">Browse Hubs</Link>
        <Link href="/becomehub">Become a Hub</Link>
        <Link href="/signin">
          <button style={{ padding: "5px 10px", backgroundColor: "white", color: "#4CAF50", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
