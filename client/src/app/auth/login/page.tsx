"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login, resetPassword } from "@/lib/authService";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await login(email, password);
      if (error) {
        setError(error.message || "Login failed");
      } else if (data.session) {
        // successful
        router.push("/");
      } else {
        setError("Login failed");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);
    try {
      const { data, error } = await resetPassword(resetEmail);
      if (error) {
        setResetMessage(error.message || "Failed to send reset email");
      } else {
        setResetMessage("Password reset email sent. Check your inbox.");
      }
    } catch (err: any) {
      setResetMessage(err?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-semibold mb-6">Inventory</h1>
        <h2 className="text-center text-xl text-gray-600 mb-6">Management</h2>

        {!showReset ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="text-sm text-blue-600 underline"
                onClick={() => setShowReset(true)}
              >
                Forgot password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            {resetMessage && <div className="text-sm text-green-600">{resetMessage}</div>}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded" type="submit">Send reset email</button>
              <button
                type="button"
                className="flex-1 border rounded py-2"
                onClick={() => setShowReset(false)}
              >
                Back
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-xs text-gray-400 mt-6">© 2020-2026 ER YAN YAO</div>
      </div>
    </div>
  );
};

export default LoginPage;
