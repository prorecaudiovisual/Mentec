"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email ou senha inválidos.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen bg-inverse-surface grain flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="font-display font-bold text-4xl text-white uppercase tracking-[0.18em] mb-2">
            MENTEC
          </p>
          <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary-container">
            Painel Administrativo
          </span>
        </div>

        <div className="bg-surface-container-lowest border border-[#E3DAD0] p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#D5CCB9] focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container/30 px-4 py-3.5 text-sm bg-white text-on-surface transition-all"
                placeholder="admin@mentec.com.br"
              />
            </div>

            <div>
              <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-[#D5CCB9] focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container/30 px-4 py-3.5 text-sm bg-white text-on-surface transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-error text-sm font-heading uppercase tracking-wider text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-white font-heading text-[10px] uppercase tracking-[0.16em] py-4 hover:bg-[#A8501A] transition-all active:scale-95 disabled:opacity-60 mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
