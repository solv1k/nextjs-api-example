"use client";

import React, { useEffect, useRef } from "react";

import Api from "@/api/client";
import UserProfileApi from "@/api/endpoints/profile";
import { useGlobalStore } from "@/stores/global";
import LoginModal from "@/components/features/auth/login";
import LogoutModal from "@/components/features/auth/logout";

export default function AuthChecker(): React.ReactElement {
  const { token, setUser, logout } = useGlobalStore();
  const hasChecked = useRef(false);

  // Check auth token
  useEffect(() => {
    // Skip on first render
    if (!hasChecked.current) {
      hasChecked.current = true;

      return;
    }

    // Remove token and logout if no token
    if (!token) {
      Api.removeBearerToken();
      logout();

      return;
    }

    // Set authorization header in API client
    Api.setBearerToken(token);

    // Get user profile
    UserProfileApi.get()
      .then((profile) => setUser(profile.data))
      .catch(() => logout());
  }, [token]);

  return (
    <>
      <LoginModal />
      <LogoutModal />
    </>
  );
}
