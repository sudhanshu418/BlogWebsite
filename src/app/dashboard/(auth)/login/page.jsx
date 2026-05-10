"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const errorMessages = {
  Configuration:
    "Sign-in is misconfigured on the server. Check that NEXTAUTH_SECRET, NEXTAUTH_URL, and provider credentials are set.",
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "Could not start Google sign-in. Please try again.",
  OAuthCallback: "Google sign-in failed on the return trip. Please try again.",
  OAuthAccountNotLinked:
    "This email is already used with a different sign-in method.",
  AccessDenied: "Access denied.",
  default: "Something went wrong signing you in.",
};

const friendlyError = (code) =>
  (code && (errorMessages[code] || errorMessages.default)) || "";

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    setError(friendlyError(params.get("error")));
    setSuccess(params.get("success") || "");
  }, [params]);

  useEffect(() => {
    getProviders().then(setProviders).catch(() => setProviders({}));
  }, []);

  if (session.status === "loading") {
    return <p>Loading…</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        router.push("/dashboard");
      } else {
        setError(friendlyError(res?.error) || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const googleEnabled = providers && providers.google;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <input
          type="email"
          placeholder="Email"
          required
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className={styles.button} type="submit" disabled={submitting}>
          {submitting ? "Signing in…" : "Login"}
        </button>
        {error && (
          <p className={styles.errorText} role="alert">
            {error}
          </p>
        )}
      </form>

      {googleEnabled && (
        <button
          type="button"
          onClick={() => signIn("google")}
          className={`${styles.button} ${styles.google}`}
        >
          Login with Google
        </button>
      )}

      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
