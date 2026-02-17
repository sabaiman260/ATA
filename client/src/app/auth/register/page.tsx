"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpAccountant } from "@/lib/authService";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await signUpAccountant(email, password, name);
      if (error) {
        setMessage(error.message || "Registration failed");
      } else {
        setMessage("Registration successful. Please check your email to confirm.");
      }
    } catch (err: any) {
      setMessage(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-semibold mb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full border rounded px-3 py-2" required />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full border rounded px-3 py-2" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border rounded px-3 py-2" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        {message && <div className="mt-4 text-center text-sm">{message}</div>}
      </div>
    </div>
  );
};

export default RegisterPage;
