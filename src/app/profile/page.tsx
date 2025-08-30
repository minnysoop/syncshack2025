"use client";

import ProtectedRoute from "@/providers/protection-provider";

import { useAuth } from "@/hooks/useAuth"


export default function Profile() {
    const { user, loading } = useAuth(); 

  return (
    <ProtectedRoute>
      {loading ? (
          <p>Loading your profile...</p>
        ) : user ? (
          <div className="text-sm">
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
    </ProtectedRoute>
  );
}