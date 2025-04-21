"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("token", "true");
      router.push("/home");
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4 mt-5">
          <div>
            <Label htmlFor="username">Usuário</Label>
            <Input
              className="mt-3"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              className="mt-3"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
