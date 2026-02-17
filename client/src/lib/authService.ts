"use client";

import { supabase } from "./supabase";

export async function login(email: string, password: string) {
  const resp = await supabase.auth.signInWithPassword({ email, password });
  return resp;
}

export async function signUpAccountant(email: string, password: string, name?: string, storeId?: string) {
  const resp = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: "accountant", name, storeId },
    },
  });
  return resp;
}

export async function logout() {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  // Sends reset password email
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/auth/login",
  });
}

export async function getSession() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    // If the refresh token is missing/invalid, supabase throws an AuthApiError
    // with code 'refresh_token_not_found'. In that case, clear any stored
    // session data and return null so the app can redirect to login.
    const e: any = err;
    if (e?.name === "AuthApiError" && e?.code === "refresh_token_not_found") {
      try {
        await supabase.auth.signOut();
      } catch (_) {
        // ignore signOut errors
      }
      return null;
    }
    throw err;
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
