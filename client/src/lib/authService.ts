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
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
